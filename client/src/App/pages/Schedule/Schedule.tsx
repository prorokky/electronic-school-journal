import React from 'react'

import Alert from '@components/Alert'
import Button from '@components/Button'
import Input from '@components/Input'
import Select from '@components/Select'
import { RootState } from '@store/rootReducer'
import {
	addSchedule,
	clearErrors,
	onChangeClass,
	onChangeFridayLessons,
	onChangeMondayLessons,
	onChangeSaturdayLessons,
	onChangeThursdayLessons,
	onChangeTuesdayLessons,
	onChangeWednesdayLessons,
} from '@store/schedule/actions'
import formStyles from '@styles/addForms.module.scss'
import globalStyles from '@styles/globalStyles.module.scss'
import { useSelector, useDispatch } from 'react-redux'

import styles from './Schedule.module.scss'

const Schedule: React.FC = () => {
	const dispatch = useDispatch()
	const classes = useSelector((state: RootState) => state.user.user.classes)
	const mondayLessons = useSelector((state: RootState) => state.schedule.mondayLessons)
	const tuesdayLessons = useSelector((state: RootState) => state.schedule.tuesdayLessons)
	const wednesdayLessons = useSelector((state: RootState) => state.schedule.wednesdayLessons)
	const thursdayLessons = useSelector((state: RootState) => state.schedule.thursdayLessons)
	const fridayLessons = useSelector((state: RootState) => state.schedule.fridayLessons)
	const saturdayLessons = useSelector((state: RootState) => state.schedule.saturdayLessons)
	const chosenClass = useSelector((state: RootState) => state.schedule.chosenClass)
	const isLoading = useSelector((state: RootState) => state.schedule.isLoading)
	const messages = useSelector((state: RootState) => state.schedule.messages)

	const handleForm = (event) => {
		event.preventDefault()
		dispatch(
			addSchedule(
				[mondayLessons, tuesdayLessons, wednesdayLessons, thursdayLessons, fridayLessons, saturdayLessons],
				chosenClass
			)
		)
	}

	return (
		<div className={globalStyles.container}>
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
			<form className={styles.scheduleForm} onSubmit={(event) => handleForm(event)}>
				<div className={formStyles.validateSelect}>
					<label className={styles.label}>Класс обучения: </label>
					<Select
						optionsArray={classes}
						value={chosenClass}
						onChange={(event) => dispatch(onChangeClass(event))}
					/>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Понедельник</h2>
					<div className={styles.validateInput}>
						<Input
							value={mondayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => dispatch(onChangeMondayLessons(event))}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Вторник</h2>
					<div className={styles.validateInput}>
						<Input
							value={tuesdayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => dispatch(onChangeTuesdayLessons(event))}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Среда</h2>
					<div className={styles.validateInput}>
						<Input
							value={wednesdayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => dispatch(onChangeWednesdayLessons(event))}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Четверг</h2>
					<div className={styles.validateInput}>
						<Input
							value={thursdayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => dispatch(onChangeThursdayLessons(event))}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Пятница</h2>
					<div className={styles.validateInput}>
						<Input
							value={fridayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => dispatch(onChangeFridayLessons(event))}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Суббота</h2>
					<div className={styles.validateInput}>
						<Input
							value={saturdayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => dispatch(onChangeSaturdayLessons(event))}
						/>
					</div>
				</div>
				<div className={formStyles.button}>
					<Button isDisabled={isLoading} color={'green'}>
						добавить
					</Button>
				</div>
			</form>
		</div>
	)
}

export default Schedule
