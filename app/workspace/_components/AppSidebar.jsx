'use client'

import { Button } from '@/components/ui/button'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
	Book,
	Compass,
	LayoutDashboard,
	UserCircle2Icon,
	WalletCards,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AddNewCourseDialog from './AddNewCourseDialog'

const SIdebarOptions = [
	{
		title: 'Dashboard',
		icon: LayoutDashboard,
		path: '/workspace/#',
	},
	{
		title: 'My Learning',
		icon: Book,
		path: '/workspace/my-learning',
	},
	{
		title: 'Explore Courses',
		icon: Compass,
		path: '/workspace/explore',
	},
	// {
	// 	title: 'AI Tools',
	// 	icon: PencilRulerIcon,
	// 	path: '/workspace/ai-tools',
	// },
	{
		title: 'Billing',
		icon: WalletCards,
		path: '/workspace/billing',
	},
	{
		title: 'Profile',
		icon: UserCircle2Icon,
		path: '/workspace/profile',
	},
]

const AppSidebar = () => {
	const path = usePathname()

	return (
		<Sidebar>
			<SidebarHeader className='p-4 flex-row'>
				<Image src='/logo.svg' alt='logo' width={30} height={30} />
				<h1 className='text-2xl font-bold absolute left-[60px]'> UpSkilla</h1>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<AddNewCourseDialog>
						<Button>Create New Course</Button>
					</AddNewCourseDialog>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{SIdebarOptions.map((option, i) => (
								<SidebarMenuItem key={i}>
									<SidebarMenuButton asChild className='p-5'>
										<Link
											href={option.path}
											className={`text-[17px] ${
												path.includes(option.path) &&
												'text-primary bg-purple-50'
											}`}
										>
											<option.icon className='h-7 w=7' />
											<span>{option.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	)
}

export default AppSidebar
