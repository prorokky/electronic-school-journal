import React from 'react'

import styles from './Alert.module.scss'

type AlertProps = {
	cleanError: (message: string, allError: boolean) => void
	text: string
}

const Alert: React.FC<AlertProps> = ({ cleanError, text }) => {
	return (
		<div className={styles.alertContainer}>
			<span className={styles.alertContent}>{text}</span>
			<span onClick={() => cleanError(text, false)} className={styles.closeButton}>
				&times;
			</span>
		</div>
	)
}

export default Alert
