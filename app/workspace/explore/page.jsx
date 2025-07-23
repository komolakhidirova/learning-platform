'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'

const Explore = () => {
	const [courseList, setCourseList] = useState([])
	const { user } = useUser()

	useEffect(() => {
		user && GetCourseList()
	}, [user])

	const GetCourseList = async () => {
		const result = await axios.get('/api/courses?courseId=0')
		// console.log(result.data)
		setCourseList(result.data)
	}

	return (
		<div>
			<h2 className='font-bold text-3xl mb-5'>Explore More Courses</h2>
			<div className='flex gap-5 max-w-md'>
				<Input placeholder='Search' />
				<Button>
					<SearchIcon />
					Search
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-3'>
				{courseList.length > 0
					? courseList.map((course, i) => (
							<CourseCard course={course} key={i} />
					  ))
					: [0, 1, 2, 3].map((item, i) => (
							<Skeleton key={i} className='w-full h-[240px]' />
					  ))}
			</div>
		</div>
	)
}

export default Explore
