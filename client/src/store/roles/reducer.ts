import { FETCH_ROLES_FAILED, FETCH_ROLES_STARTED, FETCH_ROLES_SUCCESS } from './actions'
import { RolesReducerState } from './types'

const initialState: RolesReducerState = {
	rolesInfoTable: [],
	isLoading: false,
	errors: [],
}

export const roles = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case FETCH_ROLES_STARTED:
			return {
				rolesInfoTable: [],
				isLoading: true,
				errors: [],
			}
		case FETCH_ROLES_SUCCESS:
			return {
				...state,
				isLoading: false,
				rolesInfoTable: action.payload,
			}
		case FETCH_ROLES_FAILED:
			return {
				isLoading: false,
				rolesInfoTable: [],
				errors: action.payload,
			}
		default:
			return state
	}
}
