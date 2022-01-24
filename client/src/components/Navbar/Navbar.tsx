import React from 'react'

import styles from './Navbar.module.scss'

const Navbar: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.navElement}>
				<span className={styles.elementText}>Профиль</span>
			</div>
			{/*  будет меняться в зависимости от роли --> */}
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
				<span className={styles.elementText}>Выход</span>
			</div>
		</div>
	)
}

export default Navbar
