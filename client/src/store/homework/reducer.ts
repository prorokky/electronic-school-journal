import {
	ADD_HOMEWORK_FAILED,
	ADD_HOMEWORK_STARTED,
	ADD_HOMEWORK_SUCCESS,
	CHANGE_CLASS_STUDY,
	CHANGE_DATE_FOR,
	CHANGE_DATE_FROM,
	CHANGE_HOMEWORK,
	FETCH_CLASSES_FAILED,
	FETCH_CLASSES_STARTED,
	FETCH_CLASSES_SUCCESS,
	CLEAR_ERRORS,
} from '@store/homework/actions'
import { HomeworkReducerState } from '@store/homework/types'

const initialState: HomeworkReducerState = {
	class_study: '',
	homework: '',
	date_for: new Date(),
	date_from: new Date(),
	messages: [],
	isLoading: false,
	classes: [],
}

export const homework = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CLEAR_ERRORS:
			return { ...state, messages: [] }
		case ADD_HOMEWORK_STARTED:
			return {
				...state,
				messages: [],
				isLoading: true,
			}
		case ADD_HOMEWORK_FAILED:
			return {
				...state,
				class_study: '',
				homework: '',
				date_from: new Date(),
				date_for: new Date(),
				messages: action.payload,
				isLoading: false,
			}
		case ADD_HOMEWORK_SUCCESS:
			return {
				...state,
				class_study: '',
				homework: '',
				date_from: new Date(),
				date_for: new Date(),
				messages: action.payload,
				isLoading: false,
			}
		case FETCH_CLASSES_STARTED:
			return {
				class_study: '',
				homework: '',
				date_for: new Date(),
				date_from: new Date(),
				messages: [],
				isLoading: true,
				classes: [],
			}
		case FETCH_CLASSES_SUCCESS:
			return {
				...state,
				classes: action.payload,
				isLoading: false,
			}
		case FETCH_CLASSES_FAILED:
			return {
				...state,
				messages: action.payload,
				isLoading: false,
			}
		case CHANGE_HOMEWORK:
			return {
				...state,
				homework: action.payload,
			}
		case CHANGE_DATE_FROM:
			return {
				...state,
				date_from: action.payload,
			}
		case CHANGE_DATE_FOR:
			return {
				...state,
				date_for: action.payload,
			}
		case CHANGE_CLASS_STUDY:
			return {
				...state,
				class_study: action.payload,
			}
		default:
			return state
	}
}
