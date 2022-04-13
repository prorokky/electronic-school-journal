import { ScheduleReducer } from '@store/schedule/types'

const initialState: ScheduleReducer = {
}

export const schedule = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		default:
			return state
	}
}
