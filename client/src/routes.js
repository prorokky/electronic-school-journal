import React from 'react'

import {Redirect, Route, Switch} from 'react-router-dom'

import AddUser from './App/pages/AddUser'
import Auth from './App/pages/Auth'

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/add_user" exact>
					<AddUser />
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
