// @ts-nocheck

import React, { useContext, useEffect } from 'react'

import AuthImg from '@assets/auth-img.png'
import Alert from '@components/Alert'
import Button from '@components/Button'
import Input from '@components/Input'
import Loader from '@components/Loader'
import { AuthContext } from '@context/AuthContext'
import { clearErrors } from '@store/addContact/actions'
import { AUTH_FAILED, AUTH_START, AUTH_SUCCESS, CLEAR_FORM, onChangeLogin, onChangePassword } from '@store/auth/actions'
import { RootState } from '@store/rootReducer'
import { useDispatch, useSelector } from 'react-redux'

import { sentHttp } from '../../../helpers'
import styles from './Auth.module.scss'

const Auth: React.FC = () => {
	const login = useSelector((state: RootState) => state.authReducer.login)
	const password = useSelector((state: RootState) => state.authReducer.password)
	const isLoading = useSelector((state: RootState) => state.authReducer.isLoading)
	const messages = useSelector((state: RootState) => state.authReducer.messages)
	const auth = useContext(AuthContext)
	const { request, errors } = sentHttp()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({
			type: CLEAR_FORM,
		})
	}, [])

	const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch({
			type: AUTH_START,
		})
		const payload = {
			login,
			password,
		}
		try {
			const data = await request('/api/auth/login', 'POST', { ...payload })
			// @ts-ignore
			auth.login(data.token, data.userId)
			dispatch({
				type: AUTH_SUCCESS,
			})
		} catch (e) {
			dispatch({
				type: AUTH_FAILED,
				payload: errors,
			})
		}
	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.authContainer}>
					<div className={styles.alertsContainer}>
						{messages?.map((message, index) => {
							return (
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
						<div className={styles.authIcon}>
							<img src={AuthImg} alt="Logo" />
						</div>
						<form className={styles.authForm} onSubmit={(event) => loginHandler(event)}>
							<h1 className={styles.formHead}>?????????????????????? ?? ??????????????</h1>
							<div className={styles.validateInput}>
								<Input
									value={login}
									placeholder={'??????????'}
									onChange={(event) => dispatch(onChangeLogin(event))}
								/>
							</div>
							<div className={styles.validateInput}>
								<Input
									value={password}
									inputType={'password'}
									placeholder={'????????????'}
									onChange={(event) => dispatch(onChangePassword(event))}
								/>
							</div>
							<div className={styles.signIn}>
								<Button isDisabled={isLoading} color={'green'}>
									??????????
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default Auth
