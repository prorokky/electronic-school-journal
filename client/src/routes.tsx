import React from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import AddContact from './App/pages/AddContact'
import Auth from './App/pages/Auth'
import Profile from './App/pages/Profile'
import User from './App/pages/User'
import Roles from "./App/pages/Roles";

// TODO: редирект в зависимости от роли

export const useRoutes = (isAuthenticated: boolean): JSX.Element => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/user_work" exact>
					<User />
				</Route>
				<Route path="/profile/:id" exact>
					<Profile />
				</Route>
				<Route path="/add_contact" exact>
					<AddContact />
				</Route>
				<Route path="/roles" exact>
					<Roles />
				</Route>
				<Redirect to="/user_work">
					<User />
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
