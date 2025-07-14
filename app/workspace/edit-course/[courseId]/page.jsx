'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ChapterTopicList from '../_components/ChapterTopicList'
import CourseInfo from '../_components/CourseInfo'

const EditCourse = () => {
	const { courseId } = useParams()
	const [loading, setLoading] = useState(false)
	const [course, setCourse] = useState()

	useEffect(() => {
		GetCourseInfo()
	}, [])

	const GetCourseInfo = async () => {
		setLoading(true)
		const result = await axios.get('/api/courses?courseId=' + courseId)
		setLoading(false)
		setCourse(result.data)
	}

	return (
		<div>
			<CourseInfo course={course} />
			<ChapterTopicList course={course} />
		</div>
	)
}

export default EditCourse
