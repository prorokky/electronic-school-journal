import React from 'react'

import Alert from '@components/Alert'
import Button from '@components/Button'
import Input from '@components/Input'
import Loader from '@components/Loader'
import {
	onChangeMail,
	onChangePhone,
	onChangeLastName,
	onChangeName,
	onChangePatronymic,
	clearErrors,
	addContact,
} from '@store/addContact/actions'
import { RootState } from '@store/rootReducer'
import styles from '@styles/addForms.module.scss'
import { useDispatch, useSelector } from 'react-redux'

const AddContact: React.FC = () => {
	// @ts-ignore
	const dispatch = useDispatch()
	const name = useSelector((state: RootState) => state.addContact.name)
	const last_name = useSelector((state: RootState) => state.addContact.last_name)
	const patronymic = useSelector((state: RootState) => state.addContact.patronymic)
	const phone = useSelector((state: RootState) => state.addContact.phone)
	const mail = useSelector((state: RootState) => state.addContact.mail)
	const messages = useSelector((state: RootState) => state.addContact.messages)
	const isLoading = useSelector((state: RootState) => state.addContact.isLoading)

	const addContactHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch(addContact())
	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.container}>
					<div className={styles.alertsContainer}>
						{messages.map((message, index) => {
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
								<Input
									value={name}
									placeholder={'Имя'}
									onChange={(event) => dispatch(onChangeName(event))}
								/>
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

export default AddContact
