import { sentHttp } from '../../helpers'

export const ON_CHANGE_NAME = 'on_change_name'
export const ON_CHANGE_LAST_NAME = 'on_change_last_name'
export const ON_CHANGE_PATRONYMIC = 'on_change_patronymic'
export const ON_CHANGE_PHONE = 'on_change_phone'
export const ON_CHANGE_MAIL = 'on_change_mail'
export const ADDING_CONTACT_START = 'adding_contact_start'
export const ADDING_CONTACT_SUCCESS = 'adding_contact_success'
export const ADDING_CONTACT_FAILED = 'adding_contact_failed'
export const CLEAR_ERRORS = 'clear_ERRORS'

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

export function onChangePhone(phone: string) {
	return {
		type: ON_CHANGE_PHONE,
		payload: phone,
	}
}

export function onChangeMail(mail: string) {
	return {
		type: ON_CHANGE_MAIL,
		payload: mail,
	}
}

export const clearErrors = () => (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	})
}

export const addContact = () => async (dispatch, getState) => {
	dispatch({
		type: ADDING_CONTACT_START,
	})

	// @ts-ignore
	const { request, errors } = sentHttp()
	const { addContact } = getState()
	const payload = {
		name: addContact.name,
		last_name: addContact.last_name,
		patronymic: addContact.patronymic,
		phone: addContact.phone,
		mail: addContact.mail,
	}

	try {
		const data = await request('/api/add_contact', 'POST', { ...payload })
		dispatch({
			type: ADDING_CONTACT_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: ADDING_CONTACT_FAILED,
			payload: errors,
		})
	}
}
