// @ts-nocheck

import { sentHttp } from '../../helpers'

export const ON_CHANGE_HEADER = 'on_change_header'
export const ON_CHANGE_TEXT = 'on_change_text'
export const ADDING_NEWS_START = 'adding_news_start'
export const ADDING_NEWS_SUCCESS = 'adding_news_success'
export const ADDING_NEWS_FAILED = 'adding_news_failed'
export const FETCH_NEWS_STARTED = 'fetch_news_started'
export const FETCH_NEWS_SUCCESS = 'fetch_news_success'
export const FETCH_NEWS_FAILED = 'fetch_news_failed'
export const CLEAR_ERRORS = 'clear_ERRORS'

export function onChangeText(text: string) {
	return {
		type: ON_CHANGE_TEXT,
		payload: text,
	}
}

export function onChangeHeader(header: string) {
	return {
		type: ON_CHANGE_HEADER,
		payload: header,
	}
}

export const clearErrors = () => (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	})
}

export const addNews = () => async (dispatch, getState) => {
	dispatch({
		type: ADDING_NEWS_START,
	})

	// @ts-ignore
	const { request, errors } = sentHttp()
	const { news } = getState()
	const payload = {
		header: news.header,
		text: news.text,
	}

	try {
		const data = await request('/api/news/add_news', 'POST', { ...payload })
		dispatch({
			type: ADDING_NEWS_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
			type: ADDING_NEWS_FAILED,
			payload: errors,
		})
	}
}

export const fetchNews = (userId, token) => async (dispatch) => {
	dispatch({
		type: FETCH_NEWS_STARTED,
	})

	const { request } = sentHttp()

	try {
		if (userId) {
			const data = await request('/api/news/get_news', 'GET', null, {
				Authorization: `Bearer ${token}`,
			})
			dispatch({
				type: FETCH_NEWS_SUCCESS,
				payload: data,
			})
		}
	} catch (e) {
		dispatch({
			type: FETCH_NEWS_FAILED,
		})
	}
}
