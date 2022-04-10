import {
	CHANGE_CHOSEN_SUBJECT,
	CLEAR_ERRORS,
	GET_ALL_SUBJECTS_FAILED,
	GET_ALL_SUBJECTS_STARTED,
	GET_ALL_SUBJECTS_SUCCESS,
	GET_MARKS_FAILED,
	GET_MARKS_SUCCESS,
} from '@store/showMyMarks/actions'
import { ShowMyMarksReducer } from '@store/showMyMarks/types'

const initialState: ShowMyMarksReducer = {
	allSubject: [],
	chosenSubject: '',
	messages: [],
	allMarks: [],
	isLoading: false,
}

export const showMyMarks = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CHANGE_CHOSEN_SUBJECT:
			return {
				...state,
				chosenSubject: action.payload,
				allMarks: [],
				messages: [],
				isLoading: true,
			}
		case GET_MARKS_SUCCESS:
			return {
				...state,
				allMarks: action.payload,
				isLoading: false,
			}
		case GET_MARKS_FAILED:
			return {
				...state,
				messages: action.payload,
				isLoading: false,
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
