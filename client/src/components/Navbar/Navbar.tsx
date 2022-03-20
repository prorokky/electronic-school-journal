import React, { useCallback, useContext, useEffect } from 'react'

import { AuthContext } from '@context/AuthContext'
import { RootState } from '@store/rootReducer'
import { fetchUserData } from '@store/user/actions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import styles from './Navbar.module.scss'

const Navbar: React.FC = () => {
	const auth = useContext(AuthContext)
	// @ts-ignore
	const dispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user.user)
	let navbarElements: JSX.Element = <></>

	const fetchData = useCallback(async () => {
		dispatch(fetchUserData(auth.userId, auth.token))
	}, [auth])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	switch (user.role) {
		// @ts-ignore
		case 'Администратор':
			navbarElements = (
				<>
					<div className={styles.navElement}>
						<NavLink to={`/user_work`} className={styles.elementText}>
							Работа с пользователем
						</NavLink>
					</div>
					<div className={styles.navElement}>
						<NavLink to={`/add_contact`} className={styles.elementText}>
							Добавить контакты
						</NavLink>
					</div>
					<div className={styles.navElement}>
						<NavLink to={`/add_news`} className={styles.elementText}>
							Добавить новости
						</NavLink>
					</div>
					<div className={styles.navElement}>
						<NavLink to={`/roles`} className={styles.elementText}>
							Роли
						</NavLink>
					</div>
				</>
			)
			break
		case 'Учитель':
			navbarElements = (
				<>
					<div className={styles.navElement}>
						<NavLink to={`/add_homework`} className={styles.elementText}>
							Выдать домашнее задание
						</NavLink>
					</div>
					<div className={styles.navElement}>
						<NavLink to={`/marks`} className={styles.elementText}>
							Оценки
						</NavLink>
					</div>
					<div className={styles.navElement}>
						<NavLink to={`/news`} className={styles.elementText}>
							Новости
						</NavLink>
					</div>
					<div className={styles.navElement}>
						<NavLink to={`/add_news`} className={styles.elementText}>
							Добавить новости
						</NavLink>
					</div>
				</>
			)
			break
	}

	return (
		<div className={styles.container}>
			<div className={styles.navElement}>
				<NavLink to="/profile" className={styles.elementText}>
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
