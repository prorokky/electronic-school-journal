import React, { useContext, useEffect } from 'react'

import { AuthContext } from '@context/AuthContext'
import { fetchNews } from '@store/news/actions'
import { useDispatch } from 'react-redux'

import styles from './News.module.scss'

const News: React.FC = () => {
	const auth = useContext(AuthContext)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchNews(auth.userId, auth.token))
	}, [fetchNews])

	return <div className={styles.newsContainer}></div>
}

export default News
