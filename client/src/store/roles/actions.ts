export const SET_ROLES_INFO_TABLE = 'set_roles_info_table'

export function setRolesTable(roles: Array<object>) {
	const rows: object[] = []

	roles.forEach((role) => {
		let row: object[] = []
		for (let key in role) {
			let rowEl = {
				value: role[key],
			}
			row.push(rowEl)
		}
		rows.push(row)
	})

	return {
		type: SET_ROLES_INFO_TABLE,
		payload: rows,
	}
}
