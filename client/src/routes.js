import React from 'react'

import { Routes, Route } from 'react-router-dom'

import AddUser from './App/pages/AddUser'
import Auth from './App/pages/Auth'

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path="/add_user" exact element={<AddUser />} />
				<Route path="*" element={<Auth to="/" />} />
			</Routes>
		)
	}

	return (
		<Routes>
			<Route path="/" exact element={<Auth />} />
			<Route path="*" element={<Auth to="/" />} />
		</Routes>
	)
}
