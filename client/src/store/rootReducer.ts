import { authReducer } from '@store/auth/reducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
	authReducer: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
