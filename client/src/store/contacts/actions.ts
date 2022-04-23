// @ts-nocheck

import { sentHttp } from '../../helpers'

export const FETCH_CONTACTS_STARTED = 'fetch_contacts_started'
export const FETCH_CONTACTS_SUCCESS = 'fetch_contacts_success'
export const FETCH_CONTACTS_FAILED = 'fetch_contacts_failed'

export const fetchContacts = (userId, token) => async (dispatch) => {
	dispatch({
		type: FETCH_CONTACTS_STARTED,
	})

	const { request, errors } = sentHttp()

	try {
		if (userId) {
			const data = await request('/api/get_contacts', 'GET', null, {
				Authorization: `Bearer ${token}`,
			})
			dispatch({
				type: FETCH_CONTACTS_SUCCESS,
				payload: data,
			})
		}
	} catch (e) {
		dispatch({
			type: FETCH_CONTACTS_FAILED,
		})
	}
}
