import React from 'react'

import clsx from 'classnames'

import styles from './Button.module.scss'

type ButtonProps = {
	children: React.ReactNode
	onClick?: (event: React.MouseEvent) => void
	isDisabled?: boolean
	color: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, isDisabled = false, color }) => {
	return (
		<button
			className={clsx(
				isDisabled
					? styles.disabled
					: color === 'green'
					? styles.buttonGreen
					: color === 'red'
					? styles.buttonRed
					: styles.buttonBlue
			)}
			onClick={onClick}
			disabled={isDisabled}
		>
			{children}
		</button>
	)
}

export default Button
