import React from 'react'

import Alert from '@components/Alert'
import Button from '@components/Button'
import Input from '@components/Input'
import { useHttp } from '@hooks/http.hook'
import { RootState } from '@store/rootReducer'
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
	deleteUser,
	clearErrors,
	addUser,
	updateUser,
} from '@store/userWork/actions'
import styles from '@styles/AddForms.module.scss'
import { useDispatch, useSelector } from 'react-redux'

const User: React.FC = () => {
	// @ts-ignore
	const { loading, errors, request } = useHttp()
	const dispatch = useDispatch()
	const login = useSelector((state: RootState) => state.userWork.userLogin)
	const password = useSelector((state: RootState) => state.userWork.userPassword)
	const role = useSelector((state: RootState) => state.userWork.role)
	const class_study = useSelector((state: RootState) => state.userWork.classStudy)
	const subject = useSelector((state: RootState) => state.userWork.subject)
	const name = useSelector((state: RootState) => state.userWork.name)
	const last_name = useSelector((state: RootState) => state.userWork.lastName)
	const patronymic = useSelector((state: RootState) => state.userWork.patronymic)
	const cab = useSelector((state: RootState) => state.userWork.cab)
	const messages = useSelector((state: RootState) => state.userWork.messages)

	const addUserHandler = async (event) => {
		event.preventDefault()
		dispatch(addUser())
	}

	const deleteUserHandler = (event) => {
		event.preventDefault()
		dispatch(deleteUser())
	}

	const updateUserHandler = async (event) => {
		event.preventDefault()
		dispatch(updateUser())
	}

	// TODO: вынести верстку отдельной компонентой

	return (
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
				<form>
					<h1 className={styles.formHead}>Работа с пользователями</h1>
					<span className={styles.info}>Для удаления заполните только логин</span>
					<span className={styles.info}>Для изменения заполните все поля, кроме пароля</span>
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
					<div className={styles.buttonContainer}>
						<div className={styles.button}>
							<Button isDisabled={loading} onClick={(event) => deleteUserHandler(event)} color={'red'}>
								удалить
							</Button>
						</div>
						<div className={styles.button}>
							<Button isDisabled={loading} onClick={(event) => addUserHandler(event)} color={'green'}>
								создать
							</Button>
						</div>
						<div className={styles.button}>
							<Button isDisabled={loading} onClick={(event) => updateUserHandler(event)} color={'blue'}>
								изменить
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default User
