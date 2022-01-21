import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'

import { useRoutes } from '../routes'
import styles from './App.module.css'

function App() {
	const routes = useRoutes(false)
	return (
		<Router>
			<div className={styles.container}>{routes}</div>
		</Router>
	)
}

export default App
