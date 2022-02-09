import React, { useCallback } from 'react'

import styles from './Textarea.module.scss'

type InputProps = {
	value: string
	placeholder?: string
	onChange: (value: string) => void
}

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {
	const onChangeText = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>) => {
			onChange(event.target.value)
		},
		[onChange]
	)

	return (
		<textarea
			className={styles.textarea}
			value={value}
			placeholder={placeholder}
			onChange={onChangeText}
		/>
	)
}

export default Input
