// @ts-nocheck

import { sentHttp } from '../../helpers'

export const CHANGE_HOMEWORK_DATE = 'change_homework_date'
export const GET_HOMEWORK_STARTED = 'get_homework_started'
export const GET_HOMEWORK_SUCCESS = 'get_homework_success'
export const GET_HOMEWORK_FAILED = 'get_homework_failed'

export const onChangeDate = (date: Date) => (dispatch) => {
	dispatch({
		type: CHANGE_HOMEWORK_DATE,
		payload: date,
	})
}

export const getHomework = (date: Date) => async (dispatch, getState) => {
	dispatch({
		type: GET_HOMEWORK_STARTED,
	})

	const { request, errors } = sentHttp()
	const { user } = getState()
	const payload: object = {
		date,
		class_study: user.user.class_study,
	}

	try {
		const data = await request('/api/get_homework', 'POST', { ...payload })
		dispatch({
			type: GET_HOMEWORK_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: GET_HOMEWORK_FAILED,
			payload: errors,
		})
	}
}
