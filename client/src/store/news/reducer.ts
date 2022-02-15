import {
	ON_CHANGE_HEADER,
	ON_CHANGE_TEXT,
	ADDING_NEWS_START,
	ADDING_NEWS_SUCCESS, ADDING_NEWS_FAILED, CLEAR_ERRORS, FETCH_NEWS_STARTED, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILED,
} from '@store/news/actions'

import { AddNewsReducer } from './types'

const initialState: AddNewsReducer = {
	header: '',
	text: '',
	messages: [],
	isLoading: false,
	news: [],
}

export const news = (state = initialState, action: { type: any; payload: any }) => {
	switch (action.type) {
		case ADDING_NEWS_START:
			return { ...state, messages: [], isLoading: true }
		case ADDING_NEWS_SUCCESS:
			return { header: '', text: '', messages: action.payload, isLoading: false }
		case ADDING_NEWS_FAILED:
			return { header: '', text: '', messages: action.payload, isLoading: false }
		case ON_CHANGE_HEADER:
			return { ...state, header: action.payload }
		case ON_CHANGE_TEXT:
			return { ...state, text: action.payload }
		case FETCH_NEWS_STARTED:
			return {
				...state,
				news: [],
				isLoading: true,
				messages: [],
			}
		case FETCH_NEWS_SUCCESS:
			return {
				...state,
				news: action.payload,
				isLoading: false,
			}
		case FETCH_NEWS_FAILED:
			return {
				...state,
				news: [],
				isLoading: false,
				messages: action.payload,
			}
		case CLEAR_ERRORS:
			return { ...state, messages: [] }
		default:
			return state
	}
}
