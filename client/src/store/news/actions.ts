export const ON_CHANGE_HEADER = 'on_change_header'
export const ON_CHANGE_TEXT = 'on_change_text'
export const CLEAR_FORM = 'clear_form'

export function onChangeText(text: string) {
	return {
		type: ON_CHANGE_TEXT,
		payload: text,
	}
}

export function onChangeHeader(header: string) {
	return {
		type: ON_CHANGE_HEADER,
		payload: header,
	}
}

export function clearForm() {
	return {
		type: CLEAR_FORM,
	}
}
