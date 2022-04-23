// @ts-nocheck

import { sentHttp } from '../../helpers'

export const CHANGE_HOMEWORK_DATE = 'change_homework_date'
export const GET_HOMEWORK_STARTED = 'get_homework_started'
export const GET_HOMEWORK_SUCCESS = 'get_homework_success'
export const GET_HOMEWORK_FAILED = 'get_homework_failed'

export const onChangeDate = (date: Date) => (dispatch) => {
	dispatch({
		type: CHANGE_HOMEWORK_DATE,
		payload: date,
	})
}

export const getHomework = (date: Date) => async (dispatch, getState) => {
	dispatch({
		type: GET_HOMEWORK_STARTED,
	})

	const { request, errors } = sentHttp()
	const { user } = getState()
	const payload: object = {
		date,
		class_study: user.user.class_study,
		login: user.user.login,
	}

	try {
		const data: { [key: string]: unknown } = await request('/api/get_homework', 'POST', { ...payload })

		const studentMarksTable = dataConverter(data)

		dispatch({
			type: GET_HOMEWORK_SUCCESS,
			payload: studentMarksTable,
		})
	} catch (e) {
		dispatch({
			type: GET_HOMEWORK_FAILED,
			payload: errors,
		})
	}
}

const dataConverter = (data: { [key: string]: unknown }): Array<Array<{ [key: string]: string }>> => {
	const studentMarksTable: Array<Array<string>> = [
		[{ value: '№' }, { value: 'Предмет' }, { value: 'Домашнее задание' }, { value: 'Оценка' }],
	]

	data.dayLessons.forEach((lesson: string, index: number) => {
		const tableRow: Array<{ [key: string]: string }> = []
		tableRow.push(
			{ value: index + 1 },
			{ value: lesson },
			{ value: data.homework[index] },
			{ value: data.studentMarks[index] }
		)
		studentMarksTable.push(tableRow)
	})

	return studentMarksTable
}
