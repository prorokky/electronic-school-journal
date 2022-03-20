import React from 'react'

import TableRow from '@components/Table/TableRow'

import styles from './Table.module.scss'

type TableProps = {
	tableRows: Array<[]>
	checkNull?: boolean
}

export const Table: React.FC<TableProps> = ({ tableRows, checkNull = true }) => {
	return (
		<table className={styles.table}>
			<tbody>
				{tableRows.map((row, index) => {
					return <TableRow row={row} key={index} checkNull={checkNull} />
				})}
			</tbody>
		</table>
	)
}

export default Table
