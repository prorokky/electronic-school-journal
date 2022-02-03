import {
	CLEAR_FORM,
	ON_CHANGE_LAST_NAME,
	ON_CHANGE_MAIL,
	ON_CHANGE_NAME,
	ON_CHANGE_PATRONYMIC, ON_CHANGE_PHONE,
} from '@store/addContact/actions'

import { AddContactReducer } from './types'

const initialState: AddContactReducer = {
	name: '',
	last_name: '',
	patronymic: '',
	phone: '',
	mail: '',
}

export const addContact = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
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
		case CLEAR_FORM:
			return {
				name: '',
				last_name: '',
				patronymic: '',
				phone: '',
				mail: ''
			}
		default:
			return state
	}
}
