import axios from 'axios'
import { Gift } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const ChapterTopicList = ({ courseId }) => {
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

	const courseLayout = courseInfo?.courses?.courseJson?.course
	let completedChapter = courseInfo?.enrollCourse?.completedChapters ?? []

	console.log(courseInfo)

	return (
		<div>
			<h2 className='font-bold text-3xl mt-10'>Chapters & Topics </h2>
			<div className='flex flex-col items-center justify-center mt-10'>
				{courseLayout?.chapters.map((chapter, i) => (
					<div key={i} className='flex flex-col items-center'>
						<div className='p-4 border shadow rounded-xl bg-primary text-white'>
							<h2 className='text-center'>Chapter {i + 1}</h2>
							<h2 className='font-bold text-lg text-center'>
								{chapter.chapterName}
							</h2>
							<h2 className='text-xs flex justify-between gap-16'>
								<span>Duration: {chapter?.duration}</span>
								<span>No. Of Chapters: {chapter?.topics?.length}</span>
							</h2>
						</div>
						{chapter?.topics.map((topic, i_) => (
							<div className='flex flex-col items-center' key={i_}>
								<div className={`h-10 bg-gray-300 w-1 `}></div>
								<div className='flex items-center gap-5'>
									<span className={`${i_ % 2 == 0 && 'text-transparent'}  `}>
										{topic}
									</span>
									<h2
										className={`text-center rounded-full bg-gray-300 px-6 py-4 ${
											completedChapter.includes(i) &&
											'bg-green-100 text-green-800'
										}`}
									>
										{i_ + 1}
									</h2>
									<span className={`${i_ % 2 != 0 && 'text-transparent'} `}>
										{topic}
									</span>
								</div>
								{i_ == chapter?.topics?.length - 1 && (
									<div className='h-10 bg-gray-300 w-1'></div>
								)}
								{i_ == chapter?.topics?.length - 1 && (
									<div
										className={`text-center rounded-full bg-gray-300 p-4.5 ${
											completedChapter.includes(i) &&
											'bg-green-100 text-green-800'
										}`}
									>
										<Gift />
									</div>
								)}
								{i_ == chapter?.topics?.length - 1 && (
									<div className='h-10 bg-gray-300 w-1'></div>
								)}
							</div>
						))}
					</div>
				))}
				<div className='p-4 border shadow rounded-xl bg-green-600 text-white'>
					<h2>Finish</h2>
				</div>
			</div>
		</div>
	)
}

export default ChapterTopicList
