'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import EnrollCourseCard from './EnrollCourseCard'

const EnrollCourseList = () => {
	const [enrollCourseList, setEnrollCourseList] = useState()

	useEffect(() => {
		GetEnrolledCourse()
	}, [])

	const GetEnrolledCourse = async () => {
		try {
			const result = await axios.get('/api/enroll-course')
			// console.log('enroll list' + result.data)
			setEnrollCourseList(result.data)
		} catch (e) {
			toast.error('Server side error')
		}
	}

	return (
		enrollCourseList?.length > 0 && (
			<div className='mt-3'>
				<h2 className='font-bold text-xl'>Continue Learning your Courses</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-3'>
					{enrollCourseList?.map((course, i) => (
						<EnrollCourseCard
							key={i}
							course={course?.courses}
							enrollCourse={course?.enrollCourse}
						/>
					))}
				</div>
			</div>
		)
	)
}

export default EnrollCourseList
