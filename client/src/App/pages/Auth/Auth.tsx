import React, { useState } from 'react'

import AuthImg from '@assets/auth-img.png'
import Button from '@components/Button'
import Input from '@components/Input'
import { onChangeLogin, onChangePassword } from '@store/auth/actions'
import { RootState } from '@store/rootReducer'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Auth.module.scss'

const Auth: React.FC = () => {
	const login = useSelector((state: RootState) => state.authReducer.login)
	const password = useSelector((state: RootState) => state.authReducer.password)
	const dispatch = useDispatch()

	return (
		<div className={styles.authContainer}>
			<div className={styles.formContainer}>
				<div className={styles.authIcon}>
					<img src={AuthImg} alt="Logo" />
				</div>
				<form className={styles.authForm}>
					<h1 className={styles.formHead}>Авторизация в системе</h1>
					<div className={styles.validateInput}>
						<Input
							value={login}
							placeholder={'Логин'}
							onChange={(event) => dispatch(onChangeLogin(event))}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input
							value={password}
							placeholder={'Пароль'}
							onChange={(event) => dispatch(onChangePassword(event))}
							isPassword={true}
						/>
					</div>
					<div className={styles.signIn}>
						<Button onClick={() => alert(password)}>войти</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Auth
