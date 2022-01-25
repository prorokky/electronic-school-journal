export const ON_CHANGE_LOGIN = 'on_change_login'
export const ON_CHANGE_PASSWORD = 'on_change_password'

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
