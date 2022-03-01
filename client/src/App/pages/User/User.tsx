import React from 'react'

import Alert from '@components/Alert'
import Loader from '@components/Loader'
import UserWorkButtons from '@components/UserWorkForm/UserWorkButtons'
import UserWorkInputs from '@components/UserWorkForm/UserWorkInputs'
import { RootState } from '@store/rootReducer'
import { clearErrors } from '@store/userWork/actions'
import styles from '@styles/addForms.module.scss'
import { useDispatch, useSelector } from 'react-redux'

const User: React.FC = () => {
	const dispatch = useDispatch()
	const messages = useSelector((state: RootState) => state.userWork.messages)
	const isLoading = useSelector((state: RootState) => state.userWork.isLoading)

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
						<form>
							<h1 className={styles.formHead}>Работа с пользователями</h1>
							<span className={styles.info}>Для удаления заполните только логин</span>
							<span className={styles.info}>Для изменения заполните все поля, кроме пароля</span>
							<UserWorkInputs />
							<UserWorkButtons />
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default User
