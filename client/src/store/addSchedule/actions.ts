// @ts-nocheck

import { sentHttp } from '../../helpers'

export const ON_CHANGE_MONDAY_LESSONS = 'on_change_monday_lessons'
export const ON_CHANGE_TUESDAY_LESSONS = 'on_change_tuesday_lessons'
export const ON_CHANGE_WEDNESDAY_LESSONS = 'on_change_wednesday_lessons'
export const ON_CHANGE_THURSDAY_LESSONS = 'on_change_thursday_lessons'
export const ON_CHANGE_FRIDAY_LESSONS = 'on_change_friday_lessons'
export const ON_CHANGE_SATURDAY_LESSONS = 'on_change_saturday_lessons'
export const ON_CHANGE_CLASS = 'on_change_class'
export const ADD_SCHEDULE_STARTED = 'add_schedule_started'
export const ADD_SCHEDULE_SUCCESS = 'add_schedule_success'
export const ADD_SCHEDULE_FAILED = 'add_schedule_failed'
export const CLEAR_ERRORS = 'clear_errors'

export function onChangeMondayLessons(text: string) {
	return {
		type: ON_CHANGE_MONDAY_LESSONS,
		payload: text,
	}
}

export function onChangeTuesdayLessons(text: string) {
	return {
		type: ON_CHANGE_TUESDAY_LESSONS,
		payload: text,
	}
}

export function onChangeWednesdayLessons(text: string) {
	return {
		type: ON_CHANGE_WEDNESDAY_LESSONS,
		payload: text,
	}
}

export function onChangeThursdayLessons(text: string) {
	return {
		type: ON_CHANGE_THURSDAY_LESSONS,
		payload: text,
	}
}

export function onChangeFridayLessons(text: string) {
	return {
		type: ON_CHANGE_FRIDAY_LESSONS,
		payload: text,
	}
}

export function onChangeSaturdayLessons(text: string) {
	return {
		type: ON_CHANGE_SATURDAY_LESSONS,
		payload: text,
	}
}

export const onChangeClass = (chosenClass: string) => {
	return {
		type: ON_CHANGE_CLASS,
		payload: chosenClass,
	}
}

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	}
}

export const addSchedule = (lessons: Array<string>, chosenClass: string) => async (dispatch) => {
	dispatch({
		type: ADD_SCHEDULE_STARTED,
	})
	const allLessons: Array<Array<string>> = []

	lessons.forEach((lesson) => {
		const normalizeLessons: Array<string> = []
		const allDayLessons: Array<string> = lesson.split(',')
		allDayLessons.map((item) => {
			normalizeLessons.push(item.trim())
		})
		allLessons.push(normalizeLessons)
	})

	const { request, errors } = sentHttp()

	try {
		const data = await request('/api/addSchedule/add_schedule', 'POST', { allLessons, chosenClass })
		dispatch({
			type: ADD_SCHEDULE_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: ADD_SCHEDULE_FAILED,
			payload: errors,
		})
	}
}
