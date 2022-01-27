import { addUser } from '@store/addUser/reducer'
import { authReducer } from '@store/auth/reducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
	authReducer,
	addUser,
})

export type RootState = ReturnType<typeof rootReducer>
