import React, { useEffect, useState } from 'react'

import Alert from '@components/Alert'
import Button from '@components/Button'
import Input from '@components/Input'
import Navbar from '@components/Navbar'
import { useHttp } from '@hooks/http.hook'
import {
	onChangeCab,
	onChangeClassStudy,
	onChangeLastName,
	onChangeUserLogin,
	onChangeName,
	onChangeUserPassword,
	onChangePatronymic,
	onChangeRole,
	onChangeSubject,
	cleanForm,
} from '@store/addUser/actions'
import { RootState } from '@store/rootReducer'
import { useDispatch, useSelector } from 'react-redux'

import styles from './AddUser.module.scss'

const AddUser: React.FC = () => {
	// @ts-ignore
	const { loading, errors, request } = useHttp()
	const dispatch = useDispatch()
	const login = useSelector((state: RootState) => state.addUser.userLogin)
	const password = useSelector((state: RootState) => state.addUser.userPassword)
	const role = useSelector((state: RootState) => state.addUser.role)
	const class_study = useSelector((state: RootState) => state.addUser.classStudy)
	const subject = useSelector((state: RootState) => state.addUser.subject)
	const name = useSelector((state: RootState) => state.addUser.name)
	const last_name = useSelector((state: RootState) => state.addUser.lastName)
	const patronymic = useSelector((state: RootState) => state.addUser.patronymic)
	const cab = useSelector((state: RootState) => state.addUser.cab)
	const [showMessages, setShowMessages] = useState<Object[]>([])

	useEffect(() => {
		dispatch(cleanForm())
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

	const addUserHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		cleanError('', true)
		const payload = {
			login,
			password,
			role,
			class_study,
			subject,
			name,
			last_name,
			patronymic,
			cab,
		}
		try {
			const data = await request('/api/add_user', 'POST', { ...payload })
			setShowMessages((prevState) => [...prevState, { msg: data.message, isWarning: false }])
		} catch (e) {}
		dispatch(cleanForm())
	}

	return (
		<div className={styles.addUserContainer}>
			<Navbar />
			<div className={styles.alertsContainer}>
				{showMessages.map((message, index) => {
					return (
						// @ts-ignore
						<Alert cleanError={cleanError} text={message.msg} key={index} isWarning={message.isWarning} />
					)
				})}
			</div>
			<div className={styles.formContainer}>
				<form onSubmit={(event) => addUserHandler(event)}>
					<h1 className={styles.formHead}>Добавление пользователя</h1>
					<div className={styles.validateInput}>
						<Input
							value={login}
							placeholder={'Логин'}
							onChange={(event) => dispatch(onChangeUserLogin(event))}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input
							value={password}
							placeholder={'Пароль'}
							isPassword={true}
							onChange={(event) => dispatch(onChangeUserPassword(event))}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input value={role} placeholder={'Роль'} onChange={(event) => dispatch(onChangeRole(event))} />
					</div>
					<div className={styles.validateInput}>
						<Input
							value={class_study}
							placeholder={'Класс обучения'}
							onChange={(event) => dispatch(onChangeClassStudy(event))}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input
							value={subject}
							placeholder={'Предмет обучения'}
							onChange={(event) => dispatch(onChangeSubject(event))}
						/>
					</div>
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
							value={cab}
							placeholder={'Закрепленный кабинет'}
							onChange={(event) => dispatch(onChangeCab(event))}
						/>
					</div>
					<div className={styles.createUser}>
						<Button isDisabled={loading}>войти</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddUser
