import { db } from '@/config/bd'
import { coursesTable } from '@/config/schema'
import { currentUser } from '@clerk/nextjs/server'
import { desc, eq, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(req) {
	const { searchParams } = new URL(req.url)
	const courseId = searchParams?.get('courseId')
	const user = await currentUser()

	if (courseId == 0) {
		const result = await db
			.select()
			.from(coursesTable)
			.where(sql`${coursesTable.courseContent}::jsonb != '{}'::jsonb`)
			.orderBy(desc(coursesTable.id))

		return NextResponse.json(result)
	}
	if (courseId) {
		const result = await db
			.select()
			.from(coursesTable)
			.where(eq(coursesTable.cid, courseId))

		return NextResponse.json(result[0])
	} else {
		const result = await db
			.select()
			.from(coursesTable)
			.where(eq(coursesTable.userEmail, user.primaryEmailAddress?.emailAddress))
			.orderBy(desc(coursesTable.id))

		return NextResponse.json(result)
	}
}
