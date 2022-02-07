import React, { useCallback, useContext, useEffect } from 'react'

import Table from '@components/Table'
import { AuthContext } from '@context/AuthContext'
import { useHttp } from '@hooks/http.hook'
import { setRolesTable } from '@store/roles/actions'
import { RootState } from '@store/rootReducer'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Roles.module.scss'

const Roles: React.FC = () => {
	const auth = useContext(AuthContext)
	// @ts-ignore
	const { request } = useHttp()
	const dispatch = useDispatch()
	const roles = useSelector((state: RootState) => state.roles.rolesInfoTable)

	const fetchRoles = useCallback(async () => {
		try {
			if (auth.userId) {
				const data = await request('/api/get_roles', 'GET', null, {
					Authorization: `Bearer ${auth.token}`,
				})
				dispatch(setRolesTable(data))
			}
		} catch (e) {}
	}, [auth])

	useEffect(() => {
		fetchRoles()
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
