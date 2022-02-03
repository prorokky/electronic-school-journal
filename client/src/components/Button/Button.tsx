import React from 'react'

import styles from './Button.module.scss'

type ButtonProps = {
	children: React.ReactNode
	onClick?: (event: React.MouseEvent) => void
	isDisabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, onClick, isDisabled = false }) => {
	return (
		<button className={styles.button} onClick={onClick} disabled={isDisabled}>
			{children}
		</button>
	)
}

export default Button
