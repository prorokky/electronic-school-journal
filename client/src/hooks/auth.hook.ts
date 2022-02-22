import { useCallback, useState, useEffect } from 'react'

import { clearData } from '@store/user/actions'
import { useDispatch } from 'react-redux'

const storageName = 'userData'

export const useAuth = () => {
	const [token, setToken] = useState(null)
	const [userId, setUserId] = useState(null)
	const dispatch = useDispatch()

	const login = useCallback((jwtToken, id) => {
		setToken(jwtToken)
		setUserId(id)

		localStorage.setItem(
			storageName,
			JSON.stringify({
				userId: id,
				token: jwtToken,
			})
		)
	}, [])

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
		dispatch(clearData())
		localStorage.removeItem(storageName)
	}, [])

	useEffect(() => {
		// @ts-ignore
		const data = JSON.parse(localStorage.getItem(storageName))

		if (data && data.token) {
			login(data.token, data.userId)
		}
	}, [login])

	return { login, logout, token, userId }
}
