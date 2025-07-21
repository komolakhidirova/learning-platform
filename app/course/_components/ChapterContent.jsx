import { SelectedChapterIndexContext } from '@/context/selectedChapterIndexContext'
import { useContext } from 'react'
import YouTube from 'react-youtube'

const ChapterContent = ({ courseInfo }) => {
	const course = courseInfo?.course
	const enrollCourse = courseInfo?.enrollCourse
	const courseContent = courseInfo?.courses?.courseContent
	const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
		SelectedChapterIndexContext
	)
	const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo
	const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics

	return (
		<div className='p-10'>
			<h2 className='font-bold text-2xl'>
				{selectedChapterIndex + 1}.{' '}
				{courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
			</h2>
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
							style={{ lineHeight: '2.5' }}
						></div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ChapterContent
