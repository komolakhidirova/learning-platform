'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ChapterTopicList from '../_components/ChapterTopicList'
import CourseInfo from '../_components/CourseInfo'

const EditCourse = ({ viewCourse = false }) => {
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
			<CourseInfo course={course} viewCourse={viewCourse} />
			<ChapterTopicList courseId={courseId} />
		</div>
	)
}

export default EditCourse
