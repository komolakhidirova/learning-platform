'use client'

import { UserDetailContext } from '@/context/userDetailContext'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Provider = ({ children }) => {
	const { user } = useUser()
	const [userDetail, setUserDetail] = useState()

	useEffect(() => {
		user && CreateNewUser()
	}, [user])

	const CreateNewUser = async () => {
		const result = await axios.post('/api/user', {
			name: user?.fullName,
			email: user?.primaryEmailAddress?.emailAddress,
		})
		setUserDetail(result.data)
	}
	return (
		<UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
			<div>{children}</div>
		</UserDetailContext.Provider>
	)
}

export default Provider
