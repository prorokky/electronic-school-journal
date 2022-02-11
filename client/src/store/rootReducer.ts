import { addContact } from '@store/addContact/reducer'
import { authReducer } from '@store/auth/reducer'
import { news } from '@store/news/reducer'
import { roles } from '@store/roles/reducer'
import { user } from '@store/user/reducer'
import { userWork } from '@store/userWork/reducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
	authReducer,
	userWork,
	user,
	addContact,
	roles,
	news,
})

export type RootState = ReturnType<typeof rootReducer>
