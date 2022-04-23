// @ts-nocheck

import { sentHttp } from '../../helpers'

export const GET_ALL_SUBJECTS_STARTED = 'get_all_subjects_started'
export const GET_ALL_SUBJECTS_SUCCESS = 'get_all_subjects_success'
export const GET_ALL_SUBJECTS_FAILED = 'get_all_subjects_failed'
export const CLEAR_ERRORS = 'clear_errors'
export const CHANGE_CHOSEN_SUBJECT = 'change_chosen_subject'
export const GET_MARKS_SUCCESS = 'get_marks_success'
export const GET_MARKS_FAILED = 'get_marks_failed'

export const getAllSubject = (userId: any, token: any) => async (dispatch, getState) => {
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

export const changeChosenSubject = (subject: string) => async (dispatch, getState) => {
	dispatch({
		type: CHANGE_CHOSEN_SUBJECT,
		payload: subject,
	})

	const { request, errors } = sentHttp()
	const { user } = getState()
	const payload: object = {
		class_study: user.user.class_study,
		subject,
		login: user.user.login,
	}

	try {
		const data = await request('/api/get_student_marks', 'POST', { ...payload })
		dispatch({
			type: GET_MARKS_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: GET_MARKS_FAILED,
			payload: errors,
		})
	}
}

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	}
}
