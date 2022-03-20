import React from 'react'

import TableCell from '@components/Table/TableCell'

type TableRowProps = {
	row: Array<object>
	checkNull: boolean
}

export const TableRow: React.FC<TableRowProps> = ({ row, checkNull = true }) => {
	let isNullRow: boolean = false

	row.map((cell) => {
		// @ts-ignore
		if (cell.value === '' && checkNull) {
			isNullRow = true
		}
	})

	return (
		<tr>
			{row.map((cell, index) => {
				return !isNullRow && <TableCell cell={cell} key={index} />
			})}
		</tr>
	)
}

export default TableRow
