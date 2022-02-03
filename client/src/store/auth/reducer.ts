import { CLEAN_FORM, ON_CHANGE_LOGIN, ON_CHANGE_PASSWORD } from './actions'
import { AuthReducerState } from './types'

const initialState: AuthReducerState = {
	login: '',
	password: '',
}

export const authReducer = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ON_CHANGE_LOGIN:
			return { ...state, login: action.payload }
		case ON_CHANGE_PASSWORD:
			return { ...state, password: action.payload }
		case CLEAN_FORM:
			return { login: '', password: '' }
		default:
			return state
	}
}
