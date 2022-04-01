// @ts-nocheck

import { sentHttp } from '../../helpers'

export const GET_ALL_SUBJECTS_STARTED = 'get_all_subjects_started'
export const GET_ALL_SUBJECTS_SUCCESS = 'get_all_subjects_success'
export const GET_ALL_SUBJECTS_FAILED = 'get_all_subjects_failed'
export const CHANGE_CHOSEN_SUBJECT = 'change_chosen_subject'
export const CLEAR_ERRORS = 'clear_errors'

export const getAllSubject = (userId, token) => async (dispatch, getState) => {
	dispatch({
		type: GET_ALL_SUBJECTS_STARTED,
	})

	const { request, errors } = sentHttp()

	try {
		if (userId) {
			const data = await request('/api/teacher/subjects', 'GET', null, {
				Authorization: `Bearer ${token}`,
			})
			dispatch({
				type: GET_ALL_SUBJECTS_SUCCESS,
				payload: data,
			})
		}
	} catch (e) {
		dispatch({
			type: GET_ALL_SUBJECTS_FAILED,
			payload: errors,
		})
	}
}

export const changeChosenSubject = (subject) => {
	return {
		type: CHANGE_CHOSEN_SUBJECT,
		payload: subject,
	}
}

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	}
}
