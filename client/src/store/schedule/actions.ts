// @ts-nocheck

import { sentHttp } from '../../helpers'

export const FETCH_SCHEDULE_STARTED = 'fetch_schedule_started'
export const FETCH_SCHEDULE_SUCCESS = 'fetch_schedule_success'
export const FETCH_SCHEDULE_FAILED = 'fetch_schedule_failed'

export const fetchSchedule = () => async (dispatch, getState) => {
	dispatch({
		type: FETCH_SCHEDULE_STARTED,
	})

	const { request, errors } = sentHttp()
	const { user } = getState()

	const payload: object = {
		class_study: user.user.class_study,
	}

	try {
		const data = await request('/api/schedule/get_schedule', 'POST', { ...payload })
		dispatch({
			type: FETCH_SCHEDULE_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: FETCH_SCHEDULE_FAILED,
			payload: errors,
		})
	}
}
