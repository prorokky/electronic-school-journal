import React, { useContext } from 'react'

import { AuthContext } from '@context/AuthContext'
import { NavLink } from 'react-router-dom'

import styles from './Navbar.module.scss'

const Navbar: React.FC = () => {
	const auth = useContext(AuthContext)
	// eslint-disable-next-line no-console
	console.log(auth)

	return (
		<div className={styles.container}>
			<div className={styles.navElement}>
				<NavLink to={`/profile/${auth.userId}`} className={styles.elementText}>
					Профиль
				</NavLink>
			</div>
			{/*  будет меняться в зависимости от роли */}
			<div className={styles.navElement}>
				<span className={styles.elementText}>Дневник</span>
			</div>
			<div className={styles.navElement}>
				<span className={styles.elementText}>Новости</span>
			</div>
			<div className={styles.navElement}>
				<span className={styles.elementText}>Контакты</span>
			</div>
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
