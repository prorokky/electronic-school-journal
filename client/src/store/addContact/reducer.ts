import {
	ADDING_CONTACT_FAILED,
	ADDING_CONTACT_START,
	ADDING_CONTACT_SUCCESS,
	CLEAR_ERRORS,
	ON_CHANGE_LAST_NAME,
	ON_CHANGE_MAIL,
	ON_CHANGE_NAME,
	ON_CHANGE_PATRONYMIC,
	ON_CHANGE_PHONE,
} from './actions'
import { AddContactReducer } from './types'

const initialState: AddContactReducer = {
	name: '',
	last_name: '',
	patronymic: '',
	phone: '',
	mail: '',
	messages: [],
	isLoading: false,
}

export const addContact = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ADDING_CONTACT_START:
			return { ...state, messages: [], isLoading: true }
		case ADDING_CONTACT_SUCCESS:
			return {
				name: '',
				last_name: '',
				patronymic: '',
				phone: '',
				mail: '',
				messages: action.payload,
				isLoading: false,
			}
		case ADDING_CONTACT_FAILED:
			return { header: '', text: '', messages: action.payload, isLoading: false }
		case ON_CHANGE_NAME:
			return { ...state, name: action.payload }
		case ON_CHANGE_LAST_NAME:
			return { ...state, last_name: action.payload }
		case ON_CHANGE_PATRONYMIC:
			return { ...state, patronymic: action.payload }
		case ON_CHANGE_PHONE:
			return { ...state, phone: action.payload }
		case ON_CHANGE_MAIL:
			return { ...state, mail: action.payload }
		case CLEAR_ERRORS:
			return { ...state, messages: [] }
		default:
			return state
	}
}
