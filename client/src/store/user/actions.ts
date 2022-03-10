// @ts-nocheck

import { sentHttp } from '../../helpers'

export const FETCH_DATA_START = 'fetch_data_start'
export const FETCH_DATA_SUCCESS = 'fetch_data_success'
export const FETCH_DATA_FAILED = 'fetch_data_failed'
export const CLEAR_DATA = 'clear_data'

export function setUser(user: object) {
	const rows: object[] = []

	for (let key in user) {
		if (key !== 'classes') {

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
	}
	const payload = {
		rows,
		user,
	}

	return {
		type: FETCH_DATA_SUCCESS,
		payload,
	}
}

export const fetchUserData = (userId, token) => async (dispatch) => {
	dispatch({
		type: FETCH_DATA_START,
	})

	const { request, errors } = sentHttp()

	try {
		if (userId) {
			const data = await request(`/api/profile/${userId}`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			})
			dispatch(setUser(data))
		}
	} catch (e) {
		dispatch({
			type: FETCH_DATA_FAILED,
			payload: errors,
		})
	}
}

export const clearData = () => {
	return {
		type: CLEAR_DATA,
	}
}
