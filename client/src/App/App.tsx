import React from 'react'

import Navbar from '@components/Navbar'
import { AuthContext } from '@context/AuthContext'
import { useAuth } from '@hooks/auth.hook'
import { BrowserRouter as Router } from 'react-router-dom'

import { useRoutes } from '../routes'

function App() {
	const { token, login, logout, userId } = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)
	return (
		<AuthContext.Provider
			value={{
				token,
				// @ts-ignore
				login,
				logout,
				userId,
				isAuthenticated,
			}}
		>
			<Router>
				{isAuthenticated && <Navbar />}
				<div>{routes}</div>
			</Router>
		</AuthContext.Provider>
	)
}

export default App
