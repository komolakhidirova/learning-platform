'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader2Icon, Sparkle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

const AddNewCourseDialog = ({ children }) => {
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		includeVideo: false,
		noOfChapters: 1,
		level: '',
		category: '',
	})
	const router = useRouter()

	const onHandleInputChange = (field, value) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}))
	}

	const onGenerate = async () => {
		const courseId = uuidv4()
		try {
			setLoading(true)
			const result = await axios.post('/api/generate-course-layout', {
				...formData,
				courseId: courseId,
			})
			console.log(result.data)
			if (result.data.resp == 'limit exceed') {
				toast.warning('Please Subscribe to Plan!')
				router.push('/workspace/billing')
			}
			setLoading(false)
			router.push('/workspace/edit-course/' + result.data?.courseId)
		} catch (e) {
			setLoading(false)
			console.log(e)
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Course Using AI</DialogTitle>
					<DialogDescription asChild>
						<div className='flex flex-col gap-3 mt-3'>
							<div>
								<label>Course Name</label>
								<Input
									placeholder='Course Name'
									onChange={event =>
										onHandleInputChange('name', event?.target.value)
									}
								/>
							</div>
							<div>
								<label>Course Description (Optional)</label>
								<Textarea
									placeholder='Course Description'
									onChange={event =>
										onHandleInputChange('description', event?.target.value)
									}
								/>
							</div>
							<div>
								<label>Number of Chapters</label>
								<Input
									placeholder='Number of Chapters'
									type='number'
									onChange={event =>
										onHandleInputChange('noOfChapters', event?.target.value)
									}
								/>
							</div>
							<div className='flex gap-3 items-center'>
								<label>Include Videos</label>
								<Switch
									onCheckedChange={() =>
										onHandleInputChange('includeVideo', !formData?.includeVideo)
									}
								/>
							</div>
							<div>
								<label>Difficulty Level</label>
								<Select
									onValueChange={value => onHandleInputChange('level', value)}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Difficulty Level' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='beginner'>Beginner</SelectItem>
										<SelectItem value='moderate'>Moderate</SelectItem>
										<SelectItem value='advanced'>Advanced</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<label>Category</label>
								<Input
									placeholder='Category (Separated by Comma)'
									onChange={event =>
										onHandleInputChange('category', event?.target.value)
									}
								/>
							</div>
							<div className='mt-5'>
								<Button
									className='w-full'
									onClick={onGenerate}
									disabled={loading}
								>
									{loading ? (
										<Loader2Icon className='animate-spin' />
									) : (
										<Sparkle />
									)}
									Generate Course
								</Button>
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default AddNewCourseDialog
