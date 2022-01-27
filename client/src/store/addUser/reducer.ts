import {
	ON_CHANGE_CAB,
	ON_CHANGE_CLASS_STUDY, ON_CHANGE_LAST_NAME,
	ON_CHANGE_LOGIN,
	ON_CHANGE_NAME,
	ON_CHANGE_PASSWORD, ON_CHANGE_PATRONYMIC,
	ON_CHANGE_ROLE,
	ON_CHANGE_SUBJECT
} from './actions'
import { AddUserReducerState } from './types'

const initialState: AddUserReducerState = {
	login: '',
	password: '',
	role: '',
	class_study: '',
	subject: '',
	name: '',
	last_name: '',
	patronymic: '',
	cab: '',
}

export const addUser = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ON_CHANGE_LOGIN:
			return { ...state, login: action.payload }
		case ON_CHANGE_PASSWORD:
			return { ...state, password: action.payload }
		case ON_CHANGE_ROLE:
			return { ...state, role: action.payload }
		case ON_CHANGE_CLASS_STUDY:
			return { ...state, class_study: action.payload }
		case ON_CHANGE_SUBJECT:
			return { ...state, subject: action.payload }
		case ON_CHANGE_NAME:
			return { ...state, name: action.payload }
		case ON_CHANGE_LAST_NAME:
			return { ...state, last_name: action.payload }
		case ON_CHANGE_PATRONYMIC:
			return { ...state, patronymic: action.payload }
		case ON_CHANGE_CAB:
			return { ...state, cab: action.payload }
		default:
			return state
	}
}
