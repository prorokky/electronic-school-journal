import {
	ADD_MARK_FAILED,
	ADD_MARK_STARTED,
	ADD_MARK_SUCCESS,
	CHANGE_CLASS,
	CHANGE_DATE,
	CHANGE_MARK,
	CHANGE_MARK_TYPE,
	CHANGE_STUDENT,
	CLEAR_ERRORS,
	FETCH_MARKS_FAILED,
	FETCH_MARKS_STARTED,
	FETCH_MARKS_SUCCESS,
	FETCH_STUDENTS_FAILED,
	FETCH_STUDENTS_START,
	FETCH_STUDENTS_SUCCESS,
} from '@store/marks/actions'
import { MarksReducerState } from '@store/marks/types'

const initialState: MarksReducerState = {
	chosenClass: '',
	messages: [],
	isLoading: false,
	students: [],
	selectedStudent: '',
	markDate: new Date(),
	mark: '',
	markType: '',
	marksTable: [],
}

export const marks = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CHANGE_CLASS:
			return {
				...state,
				chosenClass: action.payload,
			}
		case CHANGE_STUDENT:
			return {
				...state,
				selectedStudent: action.payload,
			}
		case CHANGE_DATE:
			return {
				...state,
				markDate: action.payload,
			}
		case CHANGE_MARK:
			return {
				...state,
				mark: action.payload,
			}
		case CHANGE_MARK_TYPE:
			return {
				...state,
				markType: action.payload,
			}
		case FETCH_STUDENTS_START:
			return {
				...state,
				isLoading: true,
				messages: [],
				students: [],
			}
		case FETCH_STUDENTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				students: action.payload,
			}
		case FETCH_STUDENTS_FAILED:
			return {
				...state,
				isLoading: false,
				messages: action.payload,
			}
		case FETCH_MARKS_STARTED:
			return {
				...state,
				isLoading: true,
				messages: [],
				marksTable: [],
			}
		case FETCH_MARKS_SUCCESS:
			return {
				...state,
				isLoading: false,
				marksTable: action.payload,
			}
		case FETCH_MARKS_FAILED:
			return {
				...state,
				isLoading: false,
				messages: action.payload,
			}
		case ADD_MARK_STARTED:
			return {
				...state,
				isLoading: true,
				messages: [],
			}
		case ADD_MARK_SUCCESS:
			return {
				...state,
				isLoading: false,
				messages: action.payload,
				mark: '',
				markType: '',
			}
		case ADD_MARK_FAILED:
			return {
				...state,
				isLoading: false,
				messages: action.payload,
				mark: '',
				markType: '',
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
