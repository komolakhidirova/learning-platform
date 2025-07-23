import { UserProfile } from '@clerk/nextjs'

const Profile = () => {
	return (
		<div>
			<h2 className='font-bold text-3xl mb-5'>Manage your Profile</h2>
			<UserProfile />
		</div>
	)
}

export default Profile
