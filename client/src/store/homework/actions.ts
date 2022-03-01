// @ts-nocheck

import { sentHttp } from '../../helpers'

export const CHANGE_HOMEWORK = 'change_homework'
export const CHANGE_CLASS_STUDY = 'change_class_study'
export const CHANGE_DATE_FOR = 'change_date_for'
export const CHANGE_DATE_FROM = 'change_date_from'
export const FETCH_CLASSES_STARTED = 'fetch_classes_started'
export const FETCH_CLASSES_SUCCESS = 'fetch_classes_success'
export const FETCH_CLASSES_FAILED = 'fetch_classes_failed'

export const changeHomework = (homework) => (dispatch) => {
	dispatch({
		type: CHANGE_HOMEWORK,
		payload: homework,
	})
}

export const changeClassStudy = (classStudy) => (dispatch) => {
	dispatch({
		type: CHANGE_CLASS_STUDY,
		payload: classStudy,
	})
}

export const changeDateFor = (dateFor) => (dispatch) => {
	dispatch({
		type: CHANGE_DATE_FOR,
		payload: dateFor,
	})
}

export const changeDateFrom = (dateFrom) => (dispatch) => {
	dispatch({
		type: CHANGE_DATE_FROM,
		payload: dateFrom,
	})
}

export const fetchClasses = (userId, token) => async (dispatch) => {
	dispatch({
		type: FETCH_CLASSES_STARTED,
	})

	const { request, errors } = sentHttp()

	try {
		if (userId) {
			const data = await request('/api/teacher/classes', 'GET', null, {
				Authorization: `Bearer ${token}`,
			})
			dispatch({
				type: FETCH_CLASSES_SUCCESS,
				payload: data,
			})
		}
	} catch (e) {
		dispatch({
			type: FETCH_CLASSES_FAILED,
			payload: errors,
		})
	}
}
