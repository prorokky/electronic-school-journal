import React from 'react'

import Button from '@components/Button'
import { RootState } from '@store/rootReducer'
import { addUser, deleteUser, updateUser } from '@store/userWork/actions'
import styles from '@styles/AddForms.module.scss'
import { useDispatch, useSelector } from 'react-redux'

const UserWorkButtons: React.FC = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector((state: RootState) => state.userWork.isLoading)

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

	return (
		<div className={styles.buttonContainer}>
			<div className={styles.button}>
				<Button isDisabled={isLoading} onClick={(event) => deleteUserHandler(event)} color={'red'}>
					удалить
				</Button>
			</div>
			<div className={styles.button}>
				<Button isDisabled={isLoading} onClick={(event) => addUserHandler(event)} color={'green'}>
					создать
				</Button>
			</div>
			<div className={styles.button}>
				<Button isDisabled={isLoading} onClick={(event) => updateUserHandler(event)} color={'blue'}>
					изменить
				</Button>
			</div>
		</div>
	)
}

export default UserWorkButtons
