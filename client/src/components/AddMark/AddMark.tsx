import React from 'react'

import Alert from '@components/Alert'
import Button from '@components/Button'
import Input from '@components/Input'
import Loader from '@components/Loader'
import Select from '@components/Select'
import { addMark, changeDate, onChangeMark, onChangeMarkType, onChangeStudent, clearErrors } from '@store/marks/actions'
import { RootState } from '@store/rootReducer'
import formStyles from '@styles/addForms.module.scss'
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'

import styles from './AddMark.module.scss'

const AddMark: React.FC = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector((state: RootState) => state.marks.isLoading)
	const students = useSelector((state: RootState) => state.marks.students)
	const selectedStudent = useSelector((state: RootState) => state.marks.selectedStudent)
	const markDate = useSelector((state: RootState) => state.marks.markDate)
	const mark = useSelector((state: RootState) => state.marks.mark)
	const markType = useSelector((state: RootState) => state.marks.markType)
	const messages = useSelector((state: RootState) => state.marks.messages)

	const handleForm = (event) => {
		event.preventDefault()
		dispatch(addMark())
	}

	return (
		<div className={styles.container}>
			{isLoading ? (
				<div className={styles.loader}>
					<Loader />
				</div>
			) : (
				<>
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
							<div className={formStyles.validateSelect}>
								<label className={styles.label}>Ученик: </label>
								<Select
									optionsArray={students}
									value={selectedStudent}
									onChange={(event) => dispatch(onChangeStudent(event))}
								/>
							</div>
							<div className={formStyles.validateDatePicker}>
								<label className={styles.label}>Дата сдачи: </label>
								<DatePicker
									selected={markDate}
									dateFormat={'dd.MM.yyyy'}
									onChange={(date: Date) => dispatch(changeDate(date))}
								/>
							</div>
							<div className={formStyles.validateInput}>
								<Input
									value={mark}
									placeholder={'Оценка'}
									onChange={(event) => dispatch(onChangeMark(event))}
								/>
							</div>
							<div className={formStyles.validateInput}>
								<Input
									value={markType}
									placeholder={'Тип оценка знаний '}
									onChange={(event) => dispatch(onChangeMarkType(event))}
								/>
							</div>
							<div className={formStyles.button}>
								<Button isDisabled={isLoading} color={'green'}>
									добавить
								</Button>
							</div>
						</form>
					</div>
				</>
			)}
		</div>
	)
}

export default AddMark
