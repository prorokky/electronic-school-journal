import React, { useCallback } from 'react'

import styles from './Input.module.css'

type InputProps = {
	value: string
	placeholder?: string
	onChange: (value: string) => void
}

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {
	const onChangeInput = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			onChange(event.target.value)
		},
		[onChange]
	)

	return <input value={value} placeholder={placeholder} onChange={onChangeInput} />
}

export default Input
