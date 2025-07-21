'use client'

import { Button } from '@/components/ui/button'
import { SelectedChapterIndexContext } from '@/context/selectedChapterIndexContext'
import axios from 'axios'
import { CheckCircle, Loader2Icon, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'
import YouTube from 'react-youtube'
import { toast } from 'sonner'

const ChapterContent = ({ courseInfo, refreshData }) => {
	const { courseId } = useParams()
	const course = courseInfo?.course
	const enrollCourse = courseInfo?.enrollCourse
	const courseContent = courseInfo?.courses?.courseContent
	const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
		SelectedChapterIndexContext
	)
	const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo
	const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics
	let completedChapter = enrollCourse?.completedChapters ?? []
	const [loading, setLoading] = useState(false)

	const markChapterCompleted = async () => {
		try {
			setLoading(true)
			completedChapter.push(selectedChapterIndex)

			const result = await axios.put('/api/enroll-course', {
				courseId: courseId,
				completedChapter: completedChapter,
			})

			console.log(result.data)
			refreshData()
			toast.success('Chapter Marked Completed!')
			setLoading(false)
		} catch (e) {
			toast.error('Server Side Error')
			setLoading(false)
		}
	}

	const markIncompleteChapter = async () => {
		try {
			setLoading(true)
			const completedChap = completedChapter.filter(
				i => i != selectedChapterIndex
			)

			const result = await axios.put('/api/enroll-course', {
				courseId: courseId,
				completedChapter: completedChap,
			})

			console.log(result.data)
			refreshData()
			toast.success('Chapter Marked InCompleted!')
			setLoading(false)
		} catch (e) {
			toast.error('Server Side Error')
			setLoading(false)
		}
	}

	return (
		<div className='p-10'>
			<div className='flex justify-between items-center'>
				<h2 className='font-bold text-2xl'>
					{selectedChapterIndex + 1}.{' '}
					{courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
				</h2>
				{!completedChapter?.includes(selectedChapterIndex) ? (
					<Button onClick={() => markChapterCompleted()} disabled={loading}>
						{loading ? (
							<Loader2Icon className='animate-spin' />
						) : (
							<CheckCircle />
						)}
						Mark as Completed
					</Button>
				) : (
					<Button
						onClick={() => markIncompleteChapter()}
						variant='outline'
						disabled={loading}
					>
						{loading ? <Loader2Icon className='animate-spin' /> : <X />} Mark
						Incomplete
					</Button>
				)}
			</div>
			<h2 className='my-2 font-bold text-lg'>Related Videos</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
				{videoData?.map(
					(video, i) =>
						i < 2 && (
							<div key={i}>
								<YouTube
									videoId={video?.videoId}
									opts={{ height: '250x', width: '400' }}
								/>
							</div>
						)
				)}
			</div>
			<div className='mt-7'>
				{topics?.map((topic, i) => (
					<div key={i} className='mt-10 p-5 bg-secondary rounded-2xl'>
						<h2 className='font-bold text-2xl text-primary'>
							{i + 1}. {topic?.topic}
						</h2>
						<div
							dangerouslySetInnerHTML={{ __html: topic?.content }}
							style={{
								lineHeight: 2.5,
							}}
						></div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ChapterContent
