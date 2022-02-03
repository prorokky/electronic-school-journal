export const ON_CHANGE_NAME = 'on_change_name'
export const ON_CHANGE_LAST_NAME = 'on_change_last_name'
export const ON_CHANGE_PATRONYMIC = 'on_change_patronymic'
export const ON_CHANGE_PHONE = 'on_change_phone'
export const ON_CHANGE_MAIL = 'on_change_mail'
export const CLEAR_FORM = 'clear_form'

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

export function clearForm() {
	return {
		type: CLEAR_FORM
	}
}
