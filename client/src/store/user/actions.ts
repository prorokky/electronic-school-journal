export const SET_USER = 'set_user'

export function setUser(user: object) {
	return {
		type: SET_USER,
		payload: user,
	}
}
