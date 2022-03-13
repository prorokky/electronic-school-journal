// @ts-nocheck

import { sentHttp } from '../../helpers'

export const CHANGE_CLASS = 'change_class'
export const CHANGE_STUDENT = 'change_student'
export const CHANGE_DATE = 'change_date'
export const CHANGE_MARK = 'change_mark'
export const CHANGE_MARK_TYPE = 'change_mark_type'
export const CLEAR_ERRORS = 'clear_errors'
export const FETCH_STUDENTS_START = 'fetch_student_start'
export const FETCH_STUDENTS_SUCCESS = 'fetch_student_success'
export const FETCH_STUDENTS_FAILED = 'fetch_student_failed'
export const ADD_MARK_STARTED = 'add_mark_started'
export const ADD_MARK_SUCCESS = 'add_mark_success'
export const ADD_MARK_FAILED = 'add_mark_failed'

export const onChangeClass = (chosenClass: string) => (dispatch) => {
	dispatch({
		type: CHANGE_CLASS,
		payload: chosenClass,
	})

	dispatch(fetchStudents(chosenClass))
}

export const onChangeStudent = (student: string) => {
	return {
		type: CHANGE_STUDENT,
		payload: student,
	}
}

export const onChangeMark = (mark: string) => {
	return {
		type: CHANGE_MARK,
		payload: mark,
	}
}

export const onChangeMarkType = (markType: string) => {
	return {
		type: CHANGE_MARK_TYPE,
		payload: markType,
	}
}

export const changeDate = (date: Date) => (dispatch) => {
	dispatch({
		type: CHANGE_DATE,
		payload: date,
	})
}

export const fetchStudents = (class_study: string) => async (dispatch) => {
	dispatch({
		type: FETCH_STUDENTS_START,
	})

	const { request, errors } = sentHttp()
	const payload = { class_study }

	try {
		const data = await request('/api/teacher/get_students', 'POST', { ...payload })
		dispatch(onChangeStudent(data[0]))
		dispatch({
			type: FETCH_STUDENTS_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: FETCH_STUDENTS_FAILED,
			payload: errors,
		})
	}
}

export const addMark = () => async (dispatch, getState) => {
	dispatch({
		type: ADD_MARK_STARTED,
	})

	// @ts-ignore
	const { request, errors } = sentHttp()
	const { marks, user } = getState()
	const payload = {
		fio: marks.selectedStudent,
		mark: marks.mark,
		markDate: marks.markDate,
		markType: marks.markType,
		classStudy: marks.chosenClass,
		subject: user.user.subject,
	}

	try {
		const data = await request('/api/teacher/add_mark', 'POST', { ...payload })
		dispatch({
			type: ADD_MARK_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: ADD_MARK_FAILED,
			payload: errors,
		})
	}
}

export const clearErrors = () => (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	})
}

