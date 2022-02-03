import { SET_USER } from '@store/user/actions'
import { UserReducerState } from '@store/user/types'

const initialState: UserReducerState = {
	user: {},
}

export const user = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload }
		default:
			return state
	}
}
