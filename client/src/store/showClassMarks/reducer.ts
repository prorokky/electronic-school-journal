import {
	CHANGE_CHOSEN_SUBJECT, CLEAR_ERRORS,
	GET_ALL_SUBJECTS_FAILED,
	GET_ALL_SUBJECTS_STARTED,
	GET_ALL_SUBJECTS_SUCCESS,
} from '@store/showClassMarks/actions'
import { ShowClassMarksReducer } from '@store/showClassMarks/types'

const initialState: ShowClassMarksReducer = {
	allSubject: [],
	chosenSubject: '',
	messages: [],
	isLoading: false,
}

export const showClassMarks = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CHANGE_CHOSEN_SUBJECT:
			return {
				...state,
				chosenSubject: action.payload,
			}
		case GET_ALL_SUBJECTS_STARTED:
			return {
				...state,
				allSubject: [],
				messages: [],
				isLoading: true,
			}
		case GET_ALL_SUBJECTS_SUCCESS:
			return {
				...state,
				allSubject: action.payload,
				chosenSubject: action.payload[0],
				isLoading: false,
			}
		case GET_ALL_SUBJECTS_FAILED:
			return {
				...state,
				messages: action.payload,
				isLoading: false,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				messages: [],
			}
		default:
			return state
	}
}
