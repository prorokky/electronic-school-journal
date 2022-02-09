import React from 'react'

import { RootState } from '@store/rootReducer'
import { useSelector } from 'react-redux'

type TableCellProps = {
	cell: object
}

export const TableCell: React.FC<TableCellProps> = ({ cell }) => {
	let cellValue = ''

	// @ts-ignore
	switch (cell.value) {
		case 'name':
			cellValue = 'Имя'
			break
		case 'last_name':
			cellValue = 'Фамилия'
			break
		case 'patronymic':
			cellValue = 'Отчество'
			break
		case 'login':
			cellValue = 'Логин'
			break
		case 'role':
			cellValue = 'Роль'
			break
		case 'subject':
			cellValue = 'Предмет обучения'
			break
		case 'cab':
			cellValue = 'Кабинет'
			break
		case 'class_study':
			cellValue = 'Класс обучения'
			break
		default:
			// @ts-ignore
			cellValue = cell.value
			break
	}

	return (
		<td>
			{/* @ts-ignore */}
			{cellValue}
		</td>
	)
}

export default TableCell
