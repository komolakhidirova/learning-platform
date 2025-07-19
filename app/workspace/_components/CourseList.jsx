'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AddNewCourseDialog from './AddNewCourseDialog'
import CourseCard from './CourseCard'

const CourseList = () => {
	const [courseList, setCourseList] = useState([])
	const { user } = useUser()

	useEffect(() => {
		user && GetCourseList()
	}, [user])

	const GetCourseList = async () => {
		const result = await axios.get('/api/courses')
		// console.log(result.data)
		setCourseList(result.data)
	}

	return (
		<div className='mt-10'>
			<h2 className='font-bold text-xl'>Course List</h2>

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
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-3'>
					{courseList.map((course, i) => (
						<CourseCard course={course} key={i} />
					))}
				</div>
			)}
		</div>
	)
}

export default CourseList
