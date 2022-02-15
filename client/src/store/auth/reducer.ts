import { CLEAN_FORM } from '@store/userWork/actions'

import {
	AUTH,
	AUTH_FAILED,
	AUTH_START,
	AUTH_SUCCESS,
	CLEAR_ERRORS,
	ON_CHANGE_LOGIN,
	ON_CHANGE_PASSWORD,
} from './actions'
import { AuthReducerState } from './types'

const initialState: AuthReducerState = {
	login: '',
	password: '',
	messages: [],
	isLoading: false,
}

export const authReducer = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case AUTH_START: {
			return { ...state, messages: [], isLoading: true }
		}
		case AUTH_SUCCESS: {
			return { login: '', password: '', isLoading: false }
		}
		case AUTH: {
			return { ...state, isAuth: true }
		}
		case AUTH_FAILED: {
			return { login: '', password: '', messages: action.payload, isLoading: false }
		}
		case CLEAR_ERRORS: {
			return { ...state, messages: [] }
		}
		case CLEAN_FORM:
			return {
				...state,
				login: '',
				password: '',
			}
		case ON_CHANGE_LOGIN:
			return { ...state, login: action.payload }
		case ON_CHANGE_PASSWORD:
			return { ...state, password: action.payload }
		default:
			return state
	}
}
