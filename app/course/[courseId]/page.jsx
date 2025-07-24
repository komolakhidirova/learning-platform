'use client'

import AppHeader from '@/app/workspace/_components/AppHeader'
import { SidebarProvider } from '@/components/ui/sidebar'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ChapterContent from '../_components/ChapterContent'
import ChapterListSidebar from '../_components/ChapterListSidebar'

const Course = () => {
	const { courseId } = useParams()
	const [courseInfo, setCourseInfo] = useState()

	useEffect(() => {
		GetEnrolledCourseById()
	}, [])

	const GetEnrolledCourseById = async () => {
		try {
			const result = await axios.get('/api/enroll-course?courseId=' + courseId)
			console.log('course' + result.data)
			setCourseInfo(result.data)
		} catch (e) {
			toast.error('Server side error')
		}
	}

	return (
		<SidebarProvider>
			<ChapterListSidebar courseInfo={courseInfo} />
			<div className='w-full'>
				<AppHeader />
				<div className='p-10 '>
					<ChapterContent
						courseInfo={courseInfo}
						refreshData={() => GetEnrolledCourseById()}
					/>
				</div>
			</div>
		</SidebarProvider>
	)
}

export default Course
