import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { SelectedChapterIndexContext } from '@/context/selectedChapterIndexContext'
import { useContext } from 'react'

const ChapterListSidebar = ({ courseInfo }) => {
	const course = courseInfo?.course
	const enrollCourse = courseInfo?.enrollCourse
	const courseContent = courseInfo?.courses?.courseContent
	const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
		SelectedChapterIndexContext
	)
	let completedChapter = enrollCourse?.completedChapters ?? []

	return (
		<div className='w-80 bg-secondary h-screen p-5 fixed'>
			<h2 className='my-3 font-bold text-xl'>
				Chapters ({courseContent?.length})
			</h2>
			<Accordion type='single' collapsible>
				{courseContent?.map((chapter, i) => (
					<AccordionItem
						value={chapter?.courseData?.chapterName}
						key={i}
						onClick={() => setSelectedChapterIndex(i)}
					>
						<AccordionTrigger
							className={`text-lg font-medium px-5 ${
								completedChapter.includes(i) && 'bg-green-100 text-green-800'
							}`}
						>
							{i + 1}. {chapter?.courseData?.chapterName}
						</AccordionTrigger>
						<AccordionContent asChild>
							<div>
								{chapter?.courseData?.topics.map((topic, i_) => (
									<h2
										key={i_}
										className={`p-3  my-1 rounded-lg ${
											completedChapter.includes(i)
												? 'bg-green-50 text-green-800'
												: 'bg-white'
										}`}
									>
										{topic?.topic}
									</h2>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}

export default ChapterListSidebar
