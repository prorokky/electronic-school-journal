import { sentHttp } from '../../helpers'

export const ON_CHANGE_LOGIN = 'on_change_login'
export const ON_CHANGE_PASSWORD = 'on_change_password'
export const AUTH_START = 'auth_start'
export const AUTH_SUCCESS = 'auth_success'
export const AUTH_FAILED = 'auth_failed'
export const CLEAR_ERRORS = 'clear_ERRORS'
export const AUTH = 'auth'

export function onChangeLogin(login: string) {
	return {
		type: ON_CHANGE_LOGIN,
		payload: login,
	}
}

export function onChangePassword(password: string) {
	return {
		type: ON_CHANGE_PASSWORD,
		payload: password,
	}
}

export const clearErrors = () => (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	})
}
