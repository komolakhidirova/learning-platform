'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import AppHeader from './_components/AppHeader'
import AppSidebar from './_components/AppSidebar'

const WorkspaceProvider = ({ children }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className='w-full'>
				<AppHeader />
				<div className='p-10'>{children}</div>
			</div>
		</SidebarProvider>
	)
}

export default WorkspaceProvider
