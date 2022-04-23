import { FETCH_SCHEDULE_FAILED, FETCH_SCHEDULE_STARTED, FETCH_SCHEDULE_SUCCESS } from '@store/schedule/actions'
import { ScheduleReducer } from '@store/schedule/types'

const initialState: ScheduleReducer = {
	isLoading: false,
	messages: [],
	schedule: [],
}

export const schedule = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case FETCH_SCHEDULE_STARTED:
			return {
				...state,
				isLoading: true,
				messages: [],
				schedule: [],
			}
		case FETCH_SCHEDULE_SUCCESS:
			return {
				...state,
				isLoading: false,
				messages: [],
				schedule: action.payload,
			}
		case FETCH_SCHEDULE_FAILED:
			return {
				...state,
				isLoading: false,
				messages: action.payload,
				schedule: [],
			}
		default:
			return state
	}
}
