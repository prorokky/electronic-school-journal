import React, { useState } from 'react'

import Button from '@components/Button'
import Input from '@components/Input'
import Navbar from '@components/Navbar'

import styles from './AddUser.module.scss'

const AddUser: React.FC = () => {
	// TODO: добавить редакс, подставить нужные значения, поменять на массив инпуты
	const [loginValue, setLoginValue] = useState<string>('')
	const [passwordValue, setPasswordValue] = useState<string>('')

	return (
		<div className={styles.addUserContainer}>
			<Navbar />
			<div className={styles.formContainer}>
				<form>
					<h1 className={styles.formHead}>Добавление пользователя</h1>
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
					<div className={styles.validateInput}>
						<Input
							value={passwordValue}
							placeholder={'Пароль'}
							onChange={(event) => setPasswordValue(event)}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input
							value={passwordValue}
							placeholder={'Пароль'}
							onChange={(event) => setPasswordValue(event)}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input
							value={passwordValue}
							placeholder={'Пароль'}
							onChange={(event) => setPasswordValue(event)}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input
							value={passwordValue}
							placeholder={'Пароль'}
							onChange={(event) => setPasswordValue(event)}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input
							value={passwordValue}
							placeholder={'Пароль'}
							onChange={(event) => setPasswordValue(event)}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input
							value={passwordValue}
							placeholder={'Пароль'}
							onChange={(event) => setPasswordValue(event)}
						/>
					</div>
					<div className={styles.validateInput}>
						<Input
							value={passwordValue}
							placeholder={'Пароль'}
							onChange={(event) => setPasswordValue(event)}
						/>
					</div>
					<div className={styles.createUser}>
						<Button onClick={() => alert('Вы прожали кнопку')}>войти</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddUser
