import { NextResponse } from 'next/server'
import { ai } from '../generate-course-layout/route'

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format. Schema:{ chapterName:<>,
{
topic:<>,
content:<>
}}
: UserInput:`

export async function POST(req) {
	const { courseJson, courseTitle, courseId } = await req.json()

	const promises = courseJson?.chapters?.map(async chapter => {
		const config = {
			responseMimeType: 'text/plain',
		}
		const model = 'gemini-2.0-flash'
		const contents = [
			{
				role: 'user',
				parts: [
					{
						text: PROMPT + JSON.stringify(chapter),
					},
				],
			},
		]

		const response = await ai.models.generateContent({
			model,
			config,
			contents,
		})
		console.log(response.candidates[0].content.parts[0].text)
		const RawResp = response?.candidates[0]?.content?.parts[0]?.text
		const RawJson = RawResp.replace('```json', '').replace('```', '')
		const JSONResp = JSON.parse(RawJson)

		//YT
		return JSONResp
	})

	const CourseContent = await Promise.all(promises)
	return NextResponse.json({
		courseName: courseTitle,
		CourseContent: CourseContent,
	})
}
