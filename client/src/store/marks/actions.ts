// @ts-nocheck

export const CHANGE_CLASS = 'change_class'

export const onChangeClass = (chosenClass: string) => {
	return {
		type: CHANGE_CLASS,
		payload: chosenClass,
	}
}
