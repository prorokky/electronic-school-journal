import {
	ON_CHANGE_CAB,
	ON_CHANGE_CLASS_STUDY,
	ON_CHANGE_LAST_NAME,
	ON_CHANGE_USER_LOGIN,
	ON_CHANGE_NAME,
	ON_CHANGE_USER_PASSWORD,
	ON_CHANGE_PATRONYMIC,
	ON_CHANGE_ROLE,
	ON_CHANGE_SUBJECT,
	CLEAN_FORM,
} from './actions'
import { AddUserReducerState } from './types'

const initialState: AddUserReducerState = {
	userLogin: '',
	userPassword: '',
	role: '',
	classStudy: '',
	subject: '',
	name: '',
	lastName: '',
	patronymic: '',
	cab: '',
}

export const addUser = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ON_CHANGE_USER_LOGIN:
			return { ...state, userLogin: action.payload }
		case ON_CHANGE_USER_PASSWORD:
			return { ...state, userPassword: action.payload }
		case ON_CHANGE_ROLE:
			return { ...state, role: action.payload }
		case ON_CHANGE_CLASS_STUDY:
			return { ...state, classStudy: action.payload }
		case ON_CHANGE_SUBJECT:
			return { ...state, subject: action.payload }
		case ON_CHANGE_NAME:
			return { ...state, name: action.payload }
		case ON_CHANGE_LAST_NAME:
			return { ...state, lastName: action.payload }
		case ON_CHANGE_PATRONYMIC:
			return { ...state, patronymic: action.payload }
		case ON_CHANGE_CAB:
			return { ...state, cab: action.payload }
		case CLEAN_FORM:
			return {
				userLogin: '',
				userPassword: '',
				role: '',
				classStudy: '',
				subject: '',
				name: '',
				lastName: '',
				patronymic: '',
				cab: '',
			}
		default:
			return state
	}
}
