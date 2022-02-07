import { addContact } from '@store/addContact/reducer'
import { addUser } from '@store/addUser/reducer'
import { authReducer } from '@store/auth/reducer'
import { roles } from '@store/roles/reducer'
import { user } from '@store/user/reducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
	authReducer,
	addUser,
	user,
	addContact,
	roles,
})

export type RootState = ReturnType<typeof rootReducer>
