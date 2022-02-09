import React, { useEffect, useState } from 'react'

import Alert from '@components/Alert'
import Button from '@components/Button'
import Input from '@components/Input'
import Textarea from '@components/Textarea'
import { useHttp } from '@hooks/http.hook'
import { clearForm, onChangeText, onChangeHeader } from '@store/news/actions'
import { RootState } from '@store/rootReducer'
import { useDispatch, useSelector } from 'react-redux'

import styles from '@styles/AddForms.module.scss'
import css from './AddNews.module.scss'

const AddNews: React.FC = () => {
	// @ts-ignore
	const { loading, errors, request } = useHttp()
	const dispatch = useDispatch()
	const header = useSelector((state: RootState) => state.news.header)
	const text = useSelector((state: RootState) => state.news.text)
	const [showMessages, setShowMessages] = useState<Object[]>([])

	useEffect(() => {
		dispatch(clearForm())
		cleanError('', true)
		errors?.map((error: { msg: string }, index: number) => {
			setShowMessages((prevState) => [...prevState, { msg: error.msg, isWarning: true }])
		})
	}, [errors])

	const cleanError = (msg: string, allErrors: boolean) => {
		if (allErrors) {
			setShowMessages([])
		} else {
			// @ts-ignore
			setShowMessages(showMessages.filter((message) => message.msg !== msg))
		}
	}

	const addNewsHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		cleanError('', true)
		const payload = {
			header,
			text,
		}
		try {
			const data = await request('/api/news/add_news', 'POST', { ...payload })
			setShowMessages((prevState) => [...prevState, { msg: data.message, isWarning: false }])
		} catch (e) {}
		dispatch(clearForm())
	}

	return (
		<div className={styles.container}>
			<div className={styles.alertsContainer}>
				{showMessages.map((message, index) => {
					return (
						// @ts-ignore
						<Alert cleanError={cleanError} text={message.msg} key={index} isWarning={message.isWarning} />
					)
				})}
			</div>
			<div className={styles.formContainer}>
				<form onSubmit={(event) => addNewsHandler(event)}>
					<h1 className={styles.formHead}>Добавление новостей</h1>
					<div className={styles.validateInput}>
						<Input
							value={header}
							placeholder={'Заголовок'}
							onChange={(event) => dispatch(onChangeHeader(event))}
						/>
					</div>
					<div className={styles.validateTextarea}>
						<Textarea
							value={text}
							placeholder={'Что нового?'}
							onChange={(event) => dispatch(onChangeText(event))}
						/>
					</div>
					<div className={styles.button}>
						<Button isDisabled={loading} color={'green'}>
							добавить
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddNews
