import { Gift } from 'lucide-react'

const ChapterTopicList = ({ course }) => {
	const courseLayout = course?.courseJson?.course

	return (
		<div className='font-bold text-3xl mt-10'>
			<h2>Chapters & Topics </h2>
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
						{chapter?.topics.map((topic, i) => (
							<div className='flex flex-col items-center' key={i}>
								<div className='h-10 bg-gray-300 w-1'></div>
								<div className='flex items-center gap-5'>
									<span className={`${i % 2 == 0 && 'text-transparent'} `}>
										{topic}
									</span>
									<h2 className='text-center rounded-full bg-gray-300 px-6 py-4 '>
										{i + 1}
									</h2>
									<span className={`${i % 2 != 0 && 'text-transparent'} `}>
										{topic}
									</span>
								</div>
								{i == chapter?.topics?.length - 1 && (
									<div className='h-10 bg-gray-300 w-1'></div>
								)}
								{i == chapter?.topics?.length - 1 && (
									<div className='text-center rounded-full bg-gray-300 p-6'>
										<Gift />
									</div>
								)}
								{i == chapter?.topics?.length - 1 && (
									<div className='h-10 bg-gray-300 w-1'></div>
								)}
							</div>
						))}
					</div>
				))}
				<div className='p-4 border shadow rounded-xl bg-green-500 text-white'>
					<h2>Finish</h2>
				</div>
			</div>
		</div>
	)
}

export default ChapterTopicList
