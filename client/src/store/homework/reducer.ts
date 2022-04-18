import { HomeworkReducerState } from '@store/homework/types'

const initialState: HomeworkReducerState = {}

export const homework = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		default:
			return state
	}
}
