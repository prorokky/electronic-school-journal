import { createContext } from 'react'

// @ts-ignore
function noop() {}

export const AuthContext = createContext({
	token: null,
	userId: null,
	login: noop,
	logout: noop,
	isAuthenticated: false,
})
