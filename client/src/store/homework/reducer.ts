import {
	CHANGE_HOMEWORK_DATE,
	GET_HOMEWORK_FAILED,
	GET_HOMEWORK_STARTED,
	GET_HOMEWORK_SUCCESS
} from '@store/homework/actions'
import { HomeworkReducerState } from '@store/homework/types'

const initialState: HomeworkReducerState = {
	isLoading: false,
	messages: [],
	date: new Date(),
	homeworkData: [],
}

export const homework = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CHANGE_HOMEWORK_DATE:
			return {
				...state,
				date: action.payload,
			}
		case GET_HOMEWORK_STARTED:
			return {
				...state,
				isLoading: true,
				messages: [],
				homeworkData: [],
			}
		case GET_HOMEWORK_SUCCESS:
			return {
				...state,
				isLoading: false,
				messages: [],
				homeworkData: action.payload,
			}
		case GET_HOMEWORK_FAILED:
			return {
				...state,
				isLoading: false,
				messages: action.payload,
				homeworkData: [],
			}
		default:
			return state
	}
}
