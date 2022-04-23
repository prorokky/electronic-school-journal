import { ContactsReducerState } from '@store/contacts/types'
import {FETCH_CONTACTS_FAILED, FETCH_CONTACTS_STARTED, FETCH_CONTACTS_SUCCESS} from "@store/contacts/actions";

const initialState: ContactsReducerState = {
	isLoading: false,
	messages: [],
	contacts: []
}

export const contacts = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case FETCH_CONTACTS_STARTED:
			return {
				...state,
				contacts: [],
				messages: [],
				isLoading: true,
			}
		case FETCH_CONTACTS_SUCCESS:
			return {
				...state,
				contacts: action.payload,
				messages: [],
				isLoading: false,
			}
		case FETCH_CONTACTS_FAILED:
			return {
				...state,
				contacts: [],
				messages: action.payload,
				isLoading: false,
			}
		default:
			return state
	}
}
