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
	CLEAR_ERRORS,
	USER_WORK_FAILED,
	USER_WORK_START,
	USER_WORK_SUCCESS,
} from './actions'
import { UserWorkReducerState } from './types'

const initialState: UserWorkReducerState = {
	userLogin: '',
	userPassword: '',
	role: '',
	classStudy: '',
	subject: '',
	name: '',
	lastName: '',
	patronymic: '',
	cab: '',
	isLoading: false,
	messages: [],
}

export const userWork = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case USER_WORK_START:
			return { ...state, isLoading: true, messages: [] }
		case USER_WORK_FAILED:
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
				isLoading: false,
				messages: action.payload,
			}
		case USER_WORK_SUCCESS:
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
				isLoading: false,
				messages: action.payload,
			}
		case CLEAR_ERRORS:
			return { ...state, messages: [] }
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
				...state,
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
