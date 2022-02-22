// @ts-nocheck

import { sentHttp } from '../../helpers'

export const FETCH_ROLES_SUCCESS = 'fetch_roles_success'
export const FETCH_ROLES_STARTED = 'fetch_roles_started'
export const FETCH_ROLES_FAILED = 'fetch_roles_failed'

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
		type: FETCH_ROLES_SUCCESS,
		payload: rows,
	}
}

export const fetchRoles = (userId, token) => async (dispatch) => {
	dispatch({
		type: FETCH_ROLES_STARTED,
	})

	const { request, errors } = sentHttp()

	try {
		if (userId) {
			const data = await request('/api/get_roles', 'GET', null, {
				Authorization: `Bearer ${token}`,
			})
			dispatch(setRolesTable(data))
		}
	} catch (e) {
		dispatch({
			type: FETCH_ROLES_FAILED,
			payload: errors,
		})
	}
}
