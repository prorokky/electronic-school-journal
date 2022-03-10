import { CHANGE_CLASS } from '@store/marks/actions'
import { MarksreducerState } from '@store/marks/types'

const initialState: MarksreducerState = {
	chosenClass: '',
}

export const marks = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CHANGE_CLASS:
			return {
				...state,
				chosenClass: action.payload,
			}
		default:
			return state
	}
}
