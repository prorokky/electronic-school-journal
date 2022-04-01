import {
	ADD_SCHEDULE_FAILED,
	ADD_SCHEDULE_STARTED,
	ADD_SCHEDULE_SUCCESS,
	CLEAR_ERRORS,
	ON_CHANGE_CLASS,
	ON_CHANGE_FRIDAY_LESSONS,
	ON_CHANGE_MONDAY_LESSONS,
	ON_CHANGE_SATURDAY_LESSONS,
	ON_CHANGE_THURSDAY_LESSONS,
	ON_CHANGE_TUESDAY_LESSONS,
	ON_CHANGE_WEDNESDAY_LESSONS,
} from '@store/schedule/actions'
import { ScheduleReducer } from '@store/schedule/types'

const initialState: ScheduleReducer = {
	mondayLessons: '',
	tuesdayLessons: '',
	wednesdayLessons: '',
	thursdayLessons: '',
	fridayLessons: '',
	saturdayLessons: '',
	chosenClass: '',
	isLoading: false,
	messages: [],
}

export const schedule = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ON_CHANGE_MONDAY_LESSONS:
			return {
				...state,
				mondayLessons: action.payload,
			}
		case ON_CHANGE_TUESDAY_LESSONS:
			return {
				...state,
				tuesdayLessons: action.payload,
			}
		case ON_CHANGE_WEDNESDAY_LESSONS:
			return {
				...state,
				wednesdayLessons: action.payload,
			}
		case ON_CHANGE_THURSDAY_LESSONS:
			return {
				...state,
				thursdayLessons: action.payload,
			}
		case ON_CHANGE_FRIDAY_LESSONS:
			return {
				...state,
				fridayLessons: action.payload,
			}
		case ON_CHANGE_SATURDAY_LESSONS:
			return {
				...state,
				saturdayLessons: action.payload,
			}
		case ON_CHANGE_CLASS:
			return {
				...state,
				chosenClass: action.payload,
			}
		case ADD_SCHEDULE_STARTED:
			return {
				...state,
				isLoading: true,
				messages: [],
			}
		case ADD_SCHEDULE_SUCCESS:
			return {
				...state,
				mondayLessons: '',
				wednesdayLessons: '',
				tuesdayLessons: '',
				thursdayLessons: '',
				fridayLessons: '',
				saturdayLessons: '',
				isLoading: false,
				messages: action.payload,
			}
		case ADD_SCHEDULE_FAILED:
			return {
				...state,
				mondayLessons: '',
				wednesdayLessons: '',
				tuesdayLessons: '',
				thursdayLessons: '',
				fridayLessons: '',
				saturdayLessons: '',
				isLoading: false,
				messages: action.payload,
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
