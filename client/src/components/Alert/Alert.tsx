import React from 'react'

import clsx from 'classnames'

import styles from './Alert.module.scss'

type AlertProps = {
	cleanError: (message: string, allError: boolean) => void
	text: string
	isWarning: boolean
}

const Alert: React.FC<AlertProps> = ({ cleanError, text, isWarning = true }) => {
	return (
		<div className={clsx(isWarning ? styles.alertContainerWarning : styles.alertContainerSuccess)}>
			<span className={clsx(isWarning ? styles.alertContentWarning : styles.alertContentSuccess)}>{text}</span>
			<span
				onClick={() => cleanError(text, false)}
				className={clsx(isWarning ? styles.closeButtonWarning : styles.closeButtonSuccess)}
			>
				&times;
			</span>
		</div>
	)
}

export default Alert
