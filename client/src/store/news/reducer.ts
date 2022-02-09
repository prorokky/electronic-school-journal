import { CLEAR_FORM, ON_CHANGE_HEADER, ON_CHANGE_TEXT } from '@store/news/actions'

import { AddContactReducer } from './types'

const initialState: AddContactReducer = {
	header: '',
	text: '',
}

export const news = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ON_CHANGE_HEADER:
			return { ...state, header: action.payload }
		case ON_CHANGE_TEXT:
			return { ...state, text: action.payload }
		case CLEAR_FORM:
			return {
				header: '',
				text: '',
			}
		default:
			return state
	}
}
