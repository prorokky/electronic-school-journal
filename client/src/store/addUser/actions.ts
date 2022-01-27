export const ON_CHANGE_LOGIN = 'on_change_login'
export const ON_CHANGE_PASSWORD = 'on_change_password'
export const ON_CHANGE_ROLE = 'on_change_role'
export const ON_CHANGE_CLASS_STUDY = 'on_change_class_study'
export const ON_CHANGE_SUBJECT = 'on_change_subject'
export const ON_CHANGE_NAME = 'on_change_name'
export const ON_CHANGE_LAST_NAME = 'on_change_last_name'
export const ON_CHANGE_PATRONYMIC = 'on_change_patronymic'
export const ON_CHANGE_CAB = 'on_change_cab'

export function onChangeLogin(login: string) {
	return {
		type: ON_CHANGE_LOGIN,
		payload: login,
	}
}

export function onChangePassword(password: string) {
	return {
		type: ON_CHANGE_PASSWORD,
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
