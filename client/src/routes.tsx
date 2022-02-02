import React from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import AddUser from './App/pages/AddUser'
import Auth from './App/pages/Auth'
import Profile from './App/pages/Profile'

// TODO: редирект в зависимости от роли

export const useRoutes = (isAuthenticated: boolean): JSX.Element => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/add_user" exact>
					<AddUser />
				</Route>
				<Route path="/profile/:id" exact>
					<Profile />
				</Route>
				<Redirect to="/add_user">
					<AddUser />
				</Redirect>
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/auth" exact>
				<Auth />
			</Route>
			<Redirect to="/auth">
				<Auth />
			</Redirect>
		</Switch>
	)
}
