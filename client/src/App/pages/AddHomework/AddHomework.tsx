import React, { useContext, useEffect } from 'react'

import Button from '@components/Button'
import Input from '@components/Input'
import Loader from '@components/Loader'
import Select from '@components/Select'
import Textarea from '@components/Textarea'
import { AuthContext } from '@context/AuthContext'
import { changeClassStudy, changeDateFor, changeDateFrom, changeHomework, fetchClasses } from '@store/homework/actions'
import { RootState } from '@store/rootReducer'
import formStyles from '@styles/addForms.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import styles from './AddHomework.module.scss'

export const AddHomework: React.FC = () => {
	const dispatch = useDispatch()
	const homework = useSelector((state: RootState) => state.homework.homework)
	const dateFor = useSelector((state: RootState) => state.homework.date_for)
	const dateFrom = useSelector((state: RootState) => state.homework.date_from)
	const isLoading = useSelector((state: RootState) => state.homework.isLoading)
	const classes = useSelector((state: RootState) => state.homework.classes)
	const classStudy = useSelector((state: RootState) => state.homework.class_study)

	const auth = useContext(AuthContext)

	useEffect(() => {
		dispatch(fetchClasses(auth.userId, auth.token))
	}, [fetchClasses])

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={formStyles.container}>
					<div className={formStyles.formContainer}>
						<form>
							<h1 className={formStyles.formHead}>Выдать домашнее задание</h1>
							<div className={formStyles.validateSelect}>
								{/* TODO: стилизовать селект и сделать компентом */}
								<label className={styles.label}>Класс: </label>
								<Select
									optionsArray={classes}
									value={classStudy}
									onChange={(event) => dispatch(changeClassStudy(event))}
								/>
								{/*<select
									className={styles.select}
									value={classStudy}
									onChange={(event) => dispatch(changeClassStudy(event.target.value))}
								>
									{classes.map((classItem, index) => {
										return (
											<option key={index} value={classItem}>
												{classItem}
											</option>
										)
									})}
								</select>*/}
							</div>
							<div className={formStyles.validateInput}>
								<Textarea
									value={homework}
									placeholder={'Домашнее задание'}
									onChange={(event) => dispatch(changeHomework(event))}
								/>
							</div>
							<div className={formStyles.validateInput}>
								<Input
									value={dateFrom}
									placeholder={'Дата выдачи'}
									onChange={(event) => dispatch(changeDateFrom(event))}
								/>
							</div>
							<div className={formStyles.validateInput}>
								<Input
									value={dateFor}
									placeholder={'Дата сдачи'}
									onChange={(event) => dispatch(changeDateFor(event))}
								/>
							</div>
							<div className={formStyles.button}>
								<Button isDisabled={isLoading} color={'green'}>
									добавить
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default AddHomework
