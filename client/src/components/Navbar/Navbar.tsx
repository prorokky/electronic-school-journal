import React, { useCallback, useContext, useEffect } from 'react'

import { AuthContext } from '@context/AuthContext'
import { useHttp } from '@hooks/http.hook'
import { RootState } from '@store/rootReducer'
import { setUser } from '@store/user/actions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import styles from './Navbar.module.scss'

const Navbar: React.FC = () => {
	const auth = useContext(AuthContext)
	// @ts-ignore
	const { request } = useHttp()
	const dispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user.user)
	let navbarElements

	const fetchData = useCallback(async () => {
		try {
			const data = await request(`/api/profile/${auth.userId}`, 'GET', null, {
				Authorization: `Bearer ${auth.token}`,
			})
			dispatch(setUser(data))
		} catch (e) {}
	}, [auth])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	switch (user.role?.role) {
		// @ts-ignore
		case 'Администратор':
			navbarElements = (
				<>
					<div className={styles.navElement}>
						<NavLink to={`/user_work`} className={styles.elementText}>
							Работа с пользователем пользователя
						</NavLink>
					</div>
					<div className={styles.navElement}>
						<NavLink to={`/add_contact`} className={styles.elementText}>
							Добавить контакты
						</NavLink>
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
