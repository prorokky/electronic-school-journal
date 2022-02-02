import React, { useCallback, useContext, useEffect, useState } from 'react'

import { AuthContext } from '@context/AuthContext'
import { useHttp } from '@hooks/http.hook'
import { NavLink } from 'react-router-dom'

import styles from './Navbar.module.scss'

const Navbar: React.FC = () => {
	const auth = useContext(AuthContext)
	// @ts-ignore
	const { request } = useHttp()
	const [role, setRole] = useState<string>('')
	let navbarElements

	const fetchData = useCallback(async () => {
		try {
			const data = await request(`/api/profile/${auth.userId}`, 'GET', null, {
				Authorization: `Bearer ${auth.token}`,
			})
			setRole(data.role.role)
		} catch (e) {}
	}, [auth])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	switch (role) {
		// @ts-ignore
		case 'Администратор':
			navbarElements = (
				<>
					<div className={styles.navElement}>
						<NavLink to={`/add_user`} className={styles.elementText}>
							Добавить пользователя
						</NavLink>
					</div>
					<div className={styles.navElement}>
						<span className={styles.elementText}>Удалить пользователя</span>
					</div>
					<div className={styles.navElement}>
						<span className={styles.elementText}>Добавить контакты</span>
					</div>
					<div className={styles.navElement}>
						<span className={styles.elementText}>Добавить новости</span>
					</div>
					<div className={styles.navElement}>
						<span className={styles.elementText}>Роли</span>
					</div>
				</>
			)
	}

	return (
		<div className={styles.container}>
			<div className={styles.navElement}>
				<NavLink to={`/profile/${auth.userId}`} className={styles.elementText}>
					Профиль
				</NavLink>
			</div>
			{/*  будет меняться в зависимости от роли */}
			{navbarElements}
			<div className={styles.navElement}>
				{/* @ts-ignore */}
				<span className={styles.elementText} onClick={auth.logout}>
					Выход
				</span>
			</div>
		</div>
	)
}

export default Navbar
