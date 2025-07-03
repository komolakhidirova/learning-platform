'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'
import AddNewCourseDialog from './AddNewCourseDialog'

const CourseList = () => {
	const [courseList, setCourseList] = useState([])

	return (
		<div className='mt-10'>
			<h2 className='font-bold text-3xl'>Course List</h2>

			{courseList.length == 0 ? (
				<div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary'>
					<Image
						src='/online-education.png'
						alt='education'
						width={80}
						height={80}
					/>
					<h2 className='my-3 text-xl font-bold'>
						Look like you haven't created any courses yet
					</h2>
					<AddNewCourseDialog>
						<Button>+ Create your first course</Button>
					</AddNewCourseDialog>
				</div>
			) : (
				<div>List of Courses</div>
			)}
		</div>
	)
}

export default CourseList
