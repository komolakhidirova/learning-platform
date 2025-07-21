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

	return (
		<div className='w-80 bg-secondary h-screen p-5'>
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
						<AccordionTrigger className='text-lg font-medium'>
							{i + 1}. {chapter?.courseData?.chapterName}
						</AccordionTrigger>
						<AccordionContent asChild>
							<div>
								{chapter?.courseData?.topics.map((topic, i) => (
									<h2 key={i} className='p-3 bg-white my-1 rounded-lg'>
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
