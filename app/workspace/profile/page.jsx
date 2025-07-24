import { UserProfile } from '@clerk/nextjs'

const Profile = () => {
	return (
		<div>
			<h2 className='font-bold text-3xl mb-5'>Manage your Profile</h2>
			<div className='flex justify-center'>
				<UserProfile />
			</div>
		</div>
	)
}

export default Profile
