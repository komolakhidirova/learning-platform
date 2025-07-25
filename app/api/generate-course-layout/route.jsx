import { db } from '@/config/bd'
import { coursesTable } from '@/config/schema'
import { auth, currentUser } from '@clerk/nextjs/server'
import { GoogleGenAI } from '@google/genai'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

const PROMPT = `Generate Learning Course depends on following details. In whink Make sure to add Course Name, Description, Chapter Name, Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format, Topic under each chapters, Duration for each chapters etc, in JSON format only Schema:
{
"course": {
"name": "string", 
"description": "string",
"category": "string",
"level": "string",
"includeVideo": "boolean", 
"noOfChapters": "number",
"bannerImagePrompt": "string",
"chapters": [
{
"chapterName": "string",
"duration": "string",
"topics": [
"string"
],
"imagePrompt": "string"
}]}},
User Input:`

export const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
})

export async function POST(req) {
	const { courseId, ...formData } = await req.json()
	const user = await currentUser()
	const { has } = await auth()
	const hasPremiumAccess = has({ plan: 'free_user' })

	const config = {
		responseMimeType: 'text/plain',
	}
	const model = 'gemini-2.0-flash'
	const contents = [
		{
			role: 'user',
			parts: [
				{
					text: PROMPT + JSON.stringify(formData),
				},
			],
		},
	]

	if (!hasPremiumAccess) {
		const result = await db
			.select()
			.from(coursesTable)
			.where(
				eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress)
			)

		if (result?.length >= 1) {
			return NextResponse.json({ resp: 'limit exceed' })
		}
	}

	const response = await ai.models.generateContent({
		model,
		config,
		contents,
	})
	console.log(response.candidates[0].content.parts[0].text)

	const RawResp = response?.candidates[0]?.content?.parts[0]?.text
	const RawJson = RawResp.replace('```json', '').replace('```', '')
	const JSONResp = JSON.parse(RawJson)

	const imagePrompt = JSONResp.course?.bannerImagePrompt
	// const bannerImageUrl = await GenerateImage(imagePrompt)

	const result = await db.insert(coursesTable).values({
		...formData,
		courseJson: JSONResp,
		userEmail: user?.primaryEmailAddress?.emailAddress,
		cid: courseId,
		bannerImageUrl: 'img',
	})

	return NextResponse.json({ courseId: courseId })
}

const GenerateImage = async imagePrompt => {
	const BASE_URL = 'https://aigurulab.tech'
	const result = await axios.post(
		BASE_URL + '/api/generate-image',
		{
			width: 1024,
			height: 1024,
			input: imagePrompt,
			model: 'flux',
			aspectRatio: '16:9', //Applicable to Flux model only
		},
		{
			headers: {
				'x-api-key': process.env?.AI_GURU_LAB_API, // Your API Key
				'Content-Type': 'application/json', // Content Type
			},
		}
	)
	console.log(result.data.image) //Output Result: Base 64 Image
	return result.data.image
}
