import React from 'react'

import Alert from '@components/Alert'
import Button from '@components/Button'
import Input from '@components/Input'
import Loader from '@components/Loader'
import Textarea from '@components/Textarea'
import { onChangeText, onChangeHeader, addNews, clearErrors } from '@store/news/actions'
import { RootState } from '@store/rootReducer'
import styles from '@styles/AddForms.module.scss'
import { useDispatch, useSelector } from 'react-redux'

const AddNews: React.FC = () => {
	// @ts-ignore
	const dispatch = useDispatch()
	const header = useSelector((state: RootState) => state.news.header)
	const text = useSelector((state: RootState) => state.news.text)
	const messages = useSelector((state: RootState) => state.news.messages)
	const isLoading = useSelector((state: RootState) => state.news.isLoading)

	const addNewsHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch(addNews())
	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.container}>
					<div className={styles.alertsContainer}>
						{messages?.map((message, index) => {
							return (
								// @ts-ignore
								<Alert
									cleanError={() => dispatch(clearErrors())}
									text={message.message}
									key={index}
									isWarning={message.isWarning}
								/>
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
								<Button isDisabled={isLoading} color={'green'}>
									добавить
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default AddNews
