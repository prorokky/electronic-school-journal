import React, { useContext, useEffect } from 'react'

import Table from '@components/Table'
import { AuthContext } from '@context/AuthContext'
import { fetchRoles } from '@store/roles/actions'
import { RootState } from '@store/rootReducer'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Roles.module.scss'

const Roles: React.FC = () => {
	const auth = useContext(AuthContext)
	const dispatch = useDispatch()
	const roles = useSelector((state: RootState) => state.roles.rolesInfoTable)

	useEffect(() => {
		dispatch(fetchRoles(auth.userId, auth.token))
	}, [fetchRoles])

	return (
		<div className={styles.rolesContainer}>
			<h1 className={styles.rolesHeader}>Ролевая модель</h1>
			<div className={styles.rolesInfo}>
				<Table tableRows={roles} />
			</div>
		</div>
	)
}

export default Roles
