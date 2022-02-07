import { SET_USER } from '@store/user/actions'
import { UserReducerState } from '@store/user/types'

const initialState: UserReducerState = {
	user: {},
	userInfoTable: [],
}

export const user = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload.user,
				userInfoTable: action.payload.rows,
			}
		default:
			return state
	}
}
