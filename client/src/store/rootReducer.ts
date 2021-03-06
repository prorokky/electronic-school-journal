import { addContact } from '@store/addContact/reducer'
import { addHomework } from '@store/addHomework/reducer'
import { addSchedule } from '@store/addSchedule/reducer'
import { authReducer } from '@store/auth/reducer'
import { contacts } from '@store/contacts/reducer'
import { homework } from '@store/homework/reducer'
import { marks } from '@store/marks/reducer'
import { news } from '@store/news/reducer'
import { roles } from '@store/roles/reducer'
import { schedule } from '@store/schedule/reducer'
import { showClassMarks } from '@store/showClassMarks/reducer'
import { showMyMarks } from '@store/showMyMarks/reducer'
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
	addHomework,
	marks,
	addSchedule,
	showClassMarks,
	showMyMarks,
	contacts,
	schedule,
	homework,
})

export type RootState = ReturnType<typeof rootReducer>
