import React, { useState } from 'react'

import Button from '@components/Button'
import Input from '@components/Input'

import AuthImg from '../../../assets/auth-img.png'
import styles from './Auth.module.css'

const Auth: React.FC = () => {
	const [loginValue, setLoginValue] = useState<string>('')
	const [passwordValue, setPasswordValue] = useState<string>('')

	return (
		<div className={styles.authContainer}>
			<div className={styles.formContainer}>
				<div className={styles.authIcon}>
					<img src={AuthImg} alt="Logo" />
				</div>
				<form className={styles.authForm}>
					<h1 className={styles.formHead}>Авторизация в системе</h1>
					<div className={styles.validateInput}>
						<Input value={loginValue} placeholder={'Логин'} onChange={(event) => setLoginValue(event)} />
					</div>
					<div className={styles.validateInput}>
						<Input
							value={passwordValue}
							placeholder={'Пароль'}
							onChange={(event) => setPasswordValue(event)}
						/>
					</div>
					<div className={styles.signIn}>
						<Button onClick={() => alert('Вы прожали кнопку')}>войти</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Auth
