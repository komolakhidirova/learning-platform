'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Book, Clock, Loader2Icon, Settings, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const CourseInfo = ({ course }) => {
	const courseLayout = course?.courseJson?.course
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const GenerateCourseContent = async () => {
		try {
			setLoading(true)
			const result = await axios.post('/api/generate-course-content', {
				courseJson: courseLayout,
				courseTitle: course?.name,
				courseId: course?.cid,
			})
			console.log(result.data)
			setLoading(false)
			router.replace('/workspace')
		} catch (e) {
			console.log(e)
			setLoading(false)
			toast.error('Server Side Error, Try Again!')
			toast.success('Course Generated Successfully!')
		}
		return
	}

	return (
		<div className='lg:flex gap-5 justify-between p-5 rounded-2xl shadow'>
			<div className='flex flex-col gap-3'>
				<h2 className='font-bold text-3xl'>{courseLayout?.name}</h2>
				<p className='line-clamp-2 text-gray-500'>
					{courseLayout?.description}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
					<div className='flex gap-5 items-center p-3 rounded-lg shadow'>
						<Clock className='text-blue-500' />
						<section>
							<h2 className='font-bold'>Duration</h2>
							<h2>2 hours</h2>
						</section>
					</div>
					<div className='flex gap-5 items-center p-3 rounded-lg shadow'>
						<Book className='text-green-500' />
						<section>
							<h2 className='font-bold'>Chapters</h2>
							<h2>{courseLayout?.noOfChapters}</h2>
						</section>
					</div>
					<div className='flex gap-5 items-center p-3 rounded-lg shadow'>
						<TrendingUp className='text-red-500' />
						<section>
							<h2 className='font-bold'>Difficulty Level</h2>
							<h2>{courseLayout?.level}</h2>
						</section>
					</div>
				</div>
				<Button className='max-w-sm' onClick={GenerateCourseContent}>
					{loading ? <Loader2Icon className='animate-spin' /> : <Settings />}
					Generate Content
				</Button>
			</div>
			{/* <Image
				src={course?.bannerImageUrl}
				alt='banner Image'
				width={400}
				height={400}
				className='w-full mt-5 lg:mt-0 h-[240px] rounded-2xl object-cover aspect-auto'
			/> */}
		</div>
	)
}

export default CourseInfo
