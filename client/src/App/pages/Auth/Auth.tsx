import React, { useState } from 'react'

import Button from '@components/Button'
import Input from '@components/Input'

import styles from './Auth.module.css'

const Auth: React.FC = () => {
	const [loginValue, setLoginValue] = useState<string>('')
	const [passwordValue, setPasswordValue] = useState<string>('')

	return (
		<div>
			<form className={styles.authForm}>
				<h1>Авторизация в системе</h1>
				<div className={styles.input}>
					<div className={styles.inputBLock}>
						<Input value={loginValue} placeholder={'Логин'} onChange={(event) => setLoginValue(event)} />
					</div>
					<div className={styles.inputBLock}>
						<Input
							value={passwordValue}
							placeholder={'Пароль'}
							onChange={(event) => setPasswordValue(event)}
						/>
					</div>
				</div>
				<Button onClick={() => alert('Вы прожали кнопку')}>ВОЙТИ</Button>
			</form>
		</div>
	)
}

export default Auth
