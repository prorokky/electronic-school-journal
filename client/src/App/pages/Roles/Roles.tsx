import React, { useContext, useEffect } from 'react'

import Loader from '@components/Loader'
import Table from '@components/Table'
import { AuthContext } from '@context/AuthContext'
import { fetchRoles } from '@store/roles/actions'
import { RootState } from '@store/rootReducer'
import globalStyles from '@styles/globalStyles.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Roles.module.scss'

const Roles: React.FC = () => {
	const auth = useContext(AuthContext)
	const dispatch = useDispatch()
	const roles = useSelector((state: RootState) => state.roles.rolesInfoTable)
	const isLoading = useSelector((state: RootState) => state.roles.isLoading)

	useEffect(() => {
		dispatch(fetchRoles(auth.userId, auth.token))
	}, [fetchRoles])

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={globalStyles.container}>
					<h1 className={styles.rolesHeader}>Ролевая модель</h1>
					<div className={styles.rolesInfo}>
						<Table tableRows={roles} />
					</div>
				</div>
			)}
		</>
	)
}

export default Roles
