import React, { useCallback } from 'react'

import styles from './Input.module.scss'

type InputProps = {
	value?: string
	placeholder?: string
	onChange: (value: string) => void
	inputType?: string
	accept?: string
	name?: string
}

const Input: React.FC<InputProps> = ({ value, placeholder, onChange, inputType = 'text', accept, name }) => {
	const onChangeInput = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			onChange(event.target.value)
		},
		[onChange]
	)

	return (
		<input
			className={styles.input}
			value={value}
			placeholder={placeholder}
			type={inputType}
			accept={accept}
			name={name}
			onChange={onChangeInput}
		/>
	)
}

export default Input
