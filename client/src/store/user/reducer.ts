import { FETCH_DATA_FAILED, FETCH_DATA_START, FETCH_DATA_SUCCESS } from '@store/user/actions'
import { UserReducerState } from '@store/user/types'

const initialState: UserReducerState = {
	user: {},
	userInfoTable: [],
	messages: [],
	isLoading: false,
}

export const user = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case FETCH_DATA_START:
			return {
				user: {},
				userInfoTable: [],
				isLoading: true
			}
		case FETCH_DATA_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				userInfoTable: action.payload.rows,
				isLoading: false,
			}
		case FETCH_DATA_FAILED:
			return {
				...state,
				messages: action.payload,
				isLoading: false,
			}
		default:
			return state
	}
}
