import React, { useContext } from 'react'

import { AuthContext } from '@context/AuthContext'
import { RootState } from '@store/rootReducer'
import { useSelector } from 'react-redux'

const Profile: React.FC = () => {
	const auth = useContext(AuthContext)
	const user = useSelector((state: RootState) => state.user.user)

	return <h1>{user.user?.login}</h1>
}

export default Profile
