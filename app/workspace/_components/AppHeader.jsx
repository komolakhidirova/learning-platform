import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'

const AppHeader = ({ hideSidebar = false }) => {
	return (
		<div
			className={`p-4 flex items-center shadow-sm ${
				!hideSidebar ? 'justify-between' : 'justify-end'
			}`}
		>
			{!hideSidebar && <SidebarTrigger />}
			<UserButton />
		</div>
	)
}

export default AppHeader
