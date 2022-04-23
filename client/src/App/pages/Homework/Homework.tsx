import React from 'react'

import Button from '@components/Button'
import Loader from '@components/Loader'
import { getHomework, onChangeDate } from '@store/homework/actions'
import { RootState } from '@store/rootReducer'
import formStyles from '@styles/addForms.module.scss'
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Homework.module.scss'
import Table from "@components/Table";

const Homework: React.FC = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector((state: RootState) => state.homework.isLoading)
	const date = useSelector((state: RootState) => state.homework.date)
	const homeworkData = useSelector((state: RootState) => state.homework.homeworkData)

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={formStyles.container}>
					<h1 className={formStyles.formHead}>Домашнее задание</h1>
					<div className={styles.datePicker}>
						<label className={styles.label}>Дата выдачи: </label>
						<DatePicker
							selected={date}
							dateFormat={'dd.MM.yyyy'}
							onChange={(date: Date) => dispatch(onChangeDate(date))}
						/>
						<Button color={'green'} onClick={() => dispatch(getHomework(date))}>
							ОК
						</Button>
					</div>
					<Table tableRows={homeworkData} checkNull={false} />
				</div>
			)}
		</>
	)
}

export default Homework
