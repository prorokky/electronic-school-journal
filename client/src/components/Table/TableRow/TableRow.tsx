import React from 'react'

import TableCell from '@components/Table/TableCell'

type TableRowProps = {
	row: Array<object>
}

export const TableRow: React.FC<TableRowProps> = ({ row }) => {
	let isNullRow: boolean = false

	row.map((cell) => {
		// @ts-ignore
		if (cell.value === '') {
			isNullRow = true
		}
	})

	return (
		<tr>
			{row.map((cell, index) => {
				if (!isNullRow) return <TableCell cell={cell} key={index} />
			})}
		</tr>
	)
}

export default TableRow
