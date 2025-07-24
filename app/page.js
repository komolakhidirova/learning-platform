import { Button } from '@/components/ui/button'
import { PlayCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
	return (
		<div className='flex flex-col gap-5 justify-center items-center bg-gradient-to-br from-blue-600 via-primary to-pink-500 h-screen'>
			<h2 className='font-bold text-5xl text-white'>Welcome to UpSkilla!</h2>
			<p className='text-white text-xl'>
				Learn, Create and Explore your favorite courses.
			</p>
			<Link href='/workspace'>
				<Button style={{ backgroundColor: 'white', color: '#905ec3' }}>
					<PlayCircle />
					Dashboard
				</Button>
			</Link>
		</div>
	)
}
