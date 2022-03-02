import React, { useCallback } from 'react'

import styles from './Select.module.scss'

type SelectProps = {
	optionsArray: Array<any>
	value: string
	onChange: (value: string) => void
}

const Select: React.FC<SelectProps> = ({ optionsArray, value, onChange }) => {
	const onChangeSelect = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			onChange(event.target.value)
		},
		[onChange]
	)

	return (
		<select value={value} className={styles.select} onChange={onChangeSelect}>
			{optionsArray.map((option, index) => {
				return (
					<option key={index} value={option}>
						{option}
					</option>
				)
			})}
		</select>
	)
}

export default Select
