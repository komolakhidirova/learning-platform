import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
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
		<Sidebar>
			<SidebarHeader className='p-4 flex-row'>
				<h2 className=' font-bold text-xl '>
					Chapters ({courseContent?.length})
				</h2>
			</SidebarHeader>
			<SidebarContent>
				<Accordion type='single' collapsible className='p-3'>
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
			</SidebarContent>
		</Sidebar>
	)
}

export default ChapterListSidebar
