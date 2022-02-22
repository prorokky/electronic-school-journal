// @ts-nocheck

import React, { Fragment, useContext, useEffect } from 'react'

import Loader from '@components/Loader'
import { AuthContext } from '@context/AuthContext'
import { fetchNews } from '@store/news/actions'
import { RootState } from '@store/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import globalStyles from '@styles/globalStyles.module.scss'

import styles from './News.module.scss'

const News: React.FC = () => {
	const auth = useContext(AuthContext)
	const dispatch = useDispatch()
	const isLoading = useSelector((state: RootState) => state.news.isLoading)
	const allNews = useSelector((state: RootState) => state.news.allNews)

	useEffect(() => {
		dispatch(fetchNews(auth.userId, auth.token))
	}, [fetchNews])

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={globalStyles.container}>
					{allNews?.map((newsItem, index) => {
						return (
							<div key={index} className={styles.newsContent}>
								<h2 className={styles.newsHeader}>{newsItem.header}</h2>
								<span className={styles.newsText}>{newsItem.text}</span>
								<span className={styles.date}>Дата публикации: {newsItem.date}</span>
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}

export default News
