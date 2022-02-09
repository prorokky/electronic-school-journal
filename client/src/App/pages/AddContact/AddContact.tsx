import React, { useEffect, useState } from 'react'

import Alert from '@components/Alert'
import Button from '@components/Button'
import Input from '@components/Input'
import { useHttp } from '@hooks/http.hook'
import {
	clearForm,
	onChangeMail,
	onChangePhone,
	onChangeLastName,
	onChangeName,
	onChangePatronymic,
} from '@store/addContact/actions'
import { RootState } from '@store/rootReducer'
import { useDispatch, useSelector } from 'react-redux'

import styles from '@styles/AddForms.module.scss'

const AddContact: React.FC = () => {
	// @ts-ignore
	const { loading, errors, request } = useHttp()
	const dispatch = useDispatch()
	const name = useSelector((state: RootState) => state.addContact.name)
	const last_name = useSelector((state: RootState) => state.addContact.last_name)
	const patronymic = useSelector((state: RootState) => state.addContact.patronymic)
	const phone = useSelector((state: RootState) => state.addContact.phone)
	const mail = useSelector((state: RootState) => state.addContact.mail)
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

	const addContactHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		cleanError('', true)
		const payload = {
			name,
			last_name,
			patronymic,
			phone,
			mail,
		}
		try {
			const data = await request('/api/add_contact', 'POST', { ...payload })
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
				<form onSubmit={(event) => addContactHandler(event)}>
					<h1 className={styles.formHead}>Добавление контактов</h1>
					<div className={styles.validateInput}>
						<Input
							value={last_name}
							placeholder={'Фамилия'}
							onChange={(event) => dispatch(onChangeLastName(event))}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input value={name} placeholder={'Имя'} onChange={(event) => dispatch(onChangeName(event))} />
					</div>
					<div className={styles.validateInput}>
						<Input
							value={patronymic}
							placeholder={'Отчество'}
							onChange={(event) => dispatch(onChangePatronymic(event))}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input
							value={phone}
							placeholder={'Телефон'}
							onChange={(event) => dispatch(onChangePhone(event))}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input
							value={mail}
							placeholder={'Почта'}
							onChange={(event) => dispatch(onChangeMail(event))}
						/>
					</div>
					<div className={styles.button}>
						<Button isDisabled={loading} color={'green'}>добавить</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddContact
