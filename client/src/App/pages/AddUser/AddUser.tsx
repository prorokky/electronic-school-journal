import React from 'react'

import Navbar from '@components/Navbar'

import styles from './AddUser.module.scss'

const AddUser: React.FC = () => {
	return (
		<div className={styles.addUserContainer}>
			<Navbar />
			<h1>Add User Page</h1>
		</div>
	)
}

export default AddUser
