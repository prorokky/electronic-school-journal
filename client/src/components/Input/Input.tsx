import React, { useCallback } from 'react'

import styles from './Input.module.scss'

type InputProps = {
	value: string
	placeholder?: string
	onChange: (value: string) => void
	isPassword?: boolean
}

const Input: React.FC<InputProps> = ({ value, placeholder, onChange, isPassword }) => {
	const onChangeInput = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			onChange(event.target.value)
		},
		[onChange]
	)

	const inputType: string = isPassword ? 'password' : 'text'

	return (
		<input
			className={styles.input}
			value={value}
			placeholder={placeholder}
			type={inputType}
			onChange={onChangeInput}
		/>
	)
}

export default Input
