import { SET_ROLES_INFO_TABLE } from './actions'
import { RolesReducerState } from './types'

const initialState: RolesReducerState = {
	rolesInfoTable: [],
}

export const roles = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SET_ROLES_INFO_TABLE:
			return {
				...state,
				rolesInfoTable: action.payload,
			}
		default:
			return state
	}
}
