// @ts-nocheck

import { sentHttp } from '../../helpers'
import {add} from "husky";

export const ON_CHANGE_USER_LOGIN = 'on_change_login'
export const ON_CHANGE_USER_PASSWORD = 'on_change_password'
export const ON_CHANGE_ROLE = 'on_change_role'
export const ON_CHANGE_CLASS_STUDY = 'on_change_class_study'
export const ON_CHANGE_SUBJECT = 'on_change_subject'
export const ON_CHANGE_NAME = 'on_change_name'
export const ON_CHANGE_LAST_NAME = 'on_change_last_name'
export const ON_CHANGE_PATRONYMIC = 'on_change_patronymic'
export const ON_CHANGE_CAB = 'on_change_cab'
export const CLEAN_FORM = 'clean_form'
export const USER_WORK_START = 'user_work_start'
export const USER_WORK_SUCCESS = 'user_work_success'
export const USER_WORK_FAILED = 'user_work_failed'
export const CLEAR_ERRORS = 'clear_ERRORS'

export function onChangeUserLogin(login: string) {
	return {
		type: ON_CHANGE_USER_LOGIN,
		payload: login,
	}
}

export function cleanForm() {
	return {
		type: CLEAN_FORM,
	}
}

export function onChangeUserPassword(password: string) {
	return {
		type: ON_CHANGE_USER_PASSWORD,
		payload: password,
	}
}

export function onChangeRole(role: string) {
	return {
		type: ON_CHANGE_ROLE,
		payload: role,
	}
}

export function onChangeClassStudy(class_study: string) {
	return {
		type: ON_CHANGE_CLASS_STUDY,
		payload: class_study,
	}
}

export function onChangeSubject(subject: string) {
	return {
		type: ON_CHANGE_SUBJECT,
		payload: subject,
	}
}

export function onChangeName(name: string) {
	return {
		type: ON_CHANGE_NAME,
		payload: name,
	}
}

export function onChangeLastName(last_name: string) {
	return {
		type: ON_CHANGE_LAST_NAME,
		payload: last_name,
	}
}

export function onChangePatronymic(patronymic: string) {
	return {
		type: ON_CHANGE_PATRONYMIC,
		payload: patronymic,
	}
}

export function onChangeCab(cab: string) {
	return {
		type: ON_CHANGE_CAB,
		payload: cab,
	}
}

export const clearErrors = () => (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	})
}

export const deleteUser = () => async (dispatch, getState) => {
	dispatch({
		type: USER_WORK_START,
	})

	const { request, errors } = sentHttp()
	const { userWork } = getState()

	const payload = {
		login: userWork.userLogin,
	}
	try {
		const data = await request('/api/delete_user', 'POST', { ...payload })
		dispatch({
			type: USER_WORK_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: USER_WORK_FAILED,
			payload: errors,
		})
	}
}

export const addUser = () => async (dispatch, getState) => {
	dispatch({
		type: USER_WORK_START,
	})

	const { request, errors } = sentHttp()
	const { userWork } = getState()

	const payload = {
		login: userWork.userLogin,
		password: userWork.userPassword,
		role: userWork.role,
		class_study: userWork.classStudy,
		subject: userWork.subject,
		name: userWork.name,
		last_name: userWork.lastName,
		patronymic: userWork.patronymic,
		cab: userWork.cab,
	}

	try {
		const data = await request('/api/add_user', 'POST', { ...payload })
		dispatch({
			type: USER_WORK_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: USER_WORK_FAILED,
			payload: errors,
		})
	}
}

export const updateUser = () => async (dispatch, getState) => {
	dispatch({
		type: USER_WORK_START,
	})

	const { request, errors } = sentHttp()
	const { userWork } = getState()

	const payload = {
		login: userWork.userLogin,
		role: userWork.role,
		class_study: userWork.classStudy,
		subject: userWork.subject,
		name: userWork.name,
		last_name: userWork.lastName,
		patronymic: userWork.patronymic,
		cab: userWork.cab,
	}

	try {
		const data = await request('/api/update_user', 'POST', { ...payload })
		dispatch({
			type: USER_WORK_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: USER_WORK_FAILED,
			payload: errors,
		})
	}
}
