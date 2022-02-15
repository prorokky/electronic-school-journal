import React, { useEffect } from 'react'

import Input from '@components/Input'
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
	CLEAN_FORM,
} from '@store/userWork/actions'
import styles from '@styles/AddForms.module.scss'
import { useDispatch, useSelector } from 'react-redux'

const UserWorkInputs: React.FC = () => {
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

	useEffect(() => {
		dispatch({
			type: CLEAN_FORM,
		})
	}, [])

	return (
		<>
			<div className={styles.validateInput}>
				<Input value={login} placeholder={'Логин'} onChange={(event) => dispatch(onChangeUserLogin(event))} />
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
		</>
	)
}

export default UserWorkInputs
