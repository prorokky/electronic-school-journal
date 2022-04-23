import React, { useContext, useEffect } from 'react'

import Alert from '@components/Alert'
import Button from '@components/Button'
import Loader from '@components/Loader'
import Select from '@components/Select'
import Textarea from '@components/Textarea'
import { AuthContext } from '@context/AuthContext'
import {
	addHomework,
	changeClassStudy,
	changeDateFor,
	changeDateFrom,
	changeHomework,
	fetchClasses,
	clearErrors,
} from '@store/addHomework/actions'
import { RootState } from '@store/rootReducer'
import formStyles from '@styles/addForms.module.scss'
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'

import styles from './AddHomework.module.scss'

import 'react-datepicker/dist/react-datepicker.css'

export const AddHomework: React.FC = () => {
	const dispatch = useDispatch()
	const homework = useSelector((state: RootState) => state.addHomework.homework)
	const dateFor = useSelector((state: RootState) => state.addHomework.date_for)
	const dateFrom = useSelector((state: RootState) => state.addHomework.date_from)
	const isLoading = useSelector((state: RootState) => state.addHomework.isLoading)
	const classes = useSelector((state: RootState) => state.addHomework.classes)
	const classStudy = useSelector((state: RootState) => state.addHomework.class_study)
	const messages = useSelector((state: RootState) => state.addHomework.messages)

	const auth = useContext(AuthContext)

	useEffect(() => {
		dispatch(fetchClasses(auth.userId, auth.token))
	}, [fetchClasses])

	const handleForm = (event) => {
		event.preventDefault()
		dispatch(addHomework())
	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={formStyles.container}>
					<div className={formStyles.alertsContainer}>
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
					<div className={formStyles.formContainer}>
						<form onSubmit={(event) => handleForm(event)}>
							<h1 className={formStyles.formHead}>Выдать домашнее задание</h1>
							<div className={formStyles.validateSelect}>
								<label className={styles.label}>Класс: </label>
								<Select
									optionsArray={classes}
									value={classStudy}
									onChange={(event) => dispatch(changeClassStudy(event))}
								/>
							</div>
							<div className={formStyles.validateInput}>
								<Textarea
									value={homework}
									placeholder={'Домашнее задание'}
									onChange={(event) => dispatch(changeHomework(event))}
								/>
							</div>
							<div className={formStyles.validateDatePicker}>
								<label className={styles.label}>Дата выдачи: </label>
								<DatePicker
									selected={dateFrom}
									dateFormat={'dd.MM.yyyy'}
									onChange={(date: Date) => dispatch(changeDateFrom(date))}
								/>
							</div>
							<div className={formStyles.validateDatePicker}>
								<label className={styles.label}>Дата сдачи: </label>
								<DatePicker
									selected={dateFor}
									dateFormat={'dd.MM.yyyy'}
									onChange={(date: Date) => dispatch(changeDateFor(date))}
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
