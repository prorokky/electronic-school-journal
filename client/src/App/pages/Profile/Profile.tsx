import React, { useCallback, useContext, useEffect } from 'react'

import { AuthContext } from '@context/AuthContext'
import { useHttp } from '@hooks/http.hook'

const Profile: React.FC = () => {
	const auth = useContext(AuthContext)
	// @ts-ignore
	const { request } = useHttp()

	const fetchData = useCallback(async () => {
		try {
			const data = await request(`/api/profile/${auth.userId}`, 'GET', null, {
				Authorization: `Bearer ${auth.token}`,
			})
			// eslint-disable-next-line no-console
			console.log(data)
		} catch (e) {}
	}, [auth])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return <h1>Profile PAge</h1>
}

export default Profile
