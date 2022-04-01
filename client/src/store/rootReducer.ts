import { addContact } from '@store/addContact/reducer'
import { authReducer } from '@store/auth/reducer'
import { homework } from '@store/homework/reducer'
import { marks } from '@store/marks/reducer'
import { news } from '@store/news/reducer'
import { roles } from '@store/roles/reducer'
import { schedule } from '@store/schedule/reducer'
import { showClassMarks } from '@store/showClassMarks/reducer'
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
	homework,
	marks,
	schedule,
	showClassMarks,
})

export type RootState = ReturnType<typeof rootReducer>
