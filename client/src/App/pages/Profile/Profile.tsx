import React, { useContext } from 'react'

import Loader from '@components/Loader'
import Table from '@components/Table'
import { AuthContext } from '@context/AuthContext'
import { RootState } from '@store/rootReducer'
import { useSelector } from 'react-redux'

import styles from './Profile.module.scss'

const Profile: React.FC = () => {
	const auth = useContext(AuthContext)
	const userInfoTable = useSelector((state: RootState) => state.user.userInfoTable)
	const isLoading = useSelector((state: RootState) => state.user.isLoading)

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.profileContainer}>
					<h1 className={styles.profileHeader}>Личные данные</h1>
					<div className={styles.profileInfo}>
						<Table tableRows={userInfoTable} />
					</div>
				</div>
			)}
		</>
	)
}

export default Profile
