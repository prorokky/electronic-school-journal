import React, { useContext, useEffect, useState } from 'react'

import AuthImg from '@assets/auth-img.png'
import Alert from '@components/Alert'
import Button from '@components/Button'
import Input from '@components/Input'
import { AuthContext } from '@context/AuthContext'
import { useHttp } from '@hooks/http.hook'
import { cleanForm, onChangeLogin, onChangePassword } from '@store/auth/actions'
import { RootState } from '@store/rootReducer'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Auth.module.scss'

const Auth: React.FC = () => {
	const auth = useContext(AuthContext)
	// @ts-ignore
	const { loading, errors, request } = useHttp()
	const login = useSelector((state: RootState) => state.authReducer.login)
	const password = useSelector((state: RootState) => state.authReducer.password)
	const dispatch = useDispatch()
	const [message, setMessage] = useState<string>('')

	useEffect(() => {
		dispatch(cleanForm())
		setMessage('')
		setMessage(errors)
	}, [errors])

	const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const payload = {
			login,
			password,
		}
		try {
			const data = await request('/api/auth/login', 'POST', { ...payload })
			auth.login(data.token, data.userId)
		} catch (e) {}
		dispatch(cleanForm())
	}

	return (
		<div className={styles.authContainer}>
			<div className={styles.alertsContainer}>
				{message && <Alert cleanError={() => setMessage('')} text={message} isWarning={true} />}
			</div>
			<div className={styles.formContainer}>
				<div className={styles.authIcon}>
					<img src={AuthImg} alt="Logo" />
				</div>
				<form className={styles.authForm} onSubmit={(event) => loginHandler(event)}>
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
						<Button isDisabled={loading} color={'green'}>войти</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Auth
