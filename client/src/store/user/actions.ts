export const SET_USER = 'set_user'

export function setUser(user: object) {
	const rows: object[] = []

	for (let key in user) {
		let row = [
			{
				value: key,
			},
			{
				value: user[key],
			},
		]

		rows.push(row)
	}
	const payload = {
		rows,
		user,
	}

	return {
		type: SET_USER,
		payload,
	}
}
