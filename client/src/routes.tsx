import React, { useContext } from 'react'

import { AuthContext } from '@context/AuthContext'
import { Redirect, Route, Switch } from 'react-router-dom'

import AddContact from './App/pages/AddContact'
import AddHomework from './App/pages/AddHomework'
import AddNews from './App/pages/AddNews'
import Auth from './App/pages/Auth'
import Marks from './App/pages/Marks'
import News from './App/pages/News'
import Profile from './App/pages/Profile'
import Roles from './App/pages/Roles'
import Schedule from './App/pages/Schedule'
import ShowClassMarks from './App/pages/ShowClassMarks'
import User from './App/pages/User'

export const useRoutes = (isAuthenticated: boolean): JSX.Element => {
	const auth = useContext(AuthContext)

	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/user_work" exact>
					<User />
				</Route>
				<Route path="/profile" exact>
					<Profile />
				</Route>
				<Route path="/add_contact" exact>
					<AddContact />
				</Route>
				<Route path="/add_news" exact>
					<AddNews />
				</Route>
				<Route path="/roles" exact>
					<Roles />
				</Route>
				<Route path="/news" exact>
					<News />
				</Route>
				<Route path="/add_homework" exact>
					<AddHomework />
				</Route>
				<Route path="/marks" exact>
					<Marks />
				</Route>
				<Route path="/class_marks" exact>
					<ShowClassMarks />
				</Route>
				<Route path="/add_schedule" exact>
					<Schedule />
				</Route>
				<Redirect to="/profile">
					<AddNews />
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
