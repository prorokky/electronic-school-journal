import React from 'react'

import Alert from '@components/Alert'
import Button from '@components/Button'
import Input from '@components/Input'
import Select from '@components/Select'
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
} from '@store/addSchedule/actions'
import { RootState } from '@store/rootReducer'
import formStyles from '@styles/addForms.module.scss'
import globalStyles from '@styles/globalStyles.module.scss'
import { useSelector, useDispatch } from 'react-redux'

import styles from './AddSchedule.module.scss'

const AddSchedule: React.FC = () => {
	const dispatch = useDispatch()
	const classes = useSelector((state: RootState) => state.user.user.classes)
	const mondayLessons = useSelector((state: RootState) => state.addSchedule.mondayLessons)
	const tuesdayLessons = useSelector((state: RootState) => state.addSchedule.tuesdayLessons)
	const wednesdayLessons = useSelector((state: RootState) => state.addSchedule.wednesdayLessons)
	const thursdayLessons = useSelector((state: RootState) => state.addSchedule.thursdayLessons)
	const fridayLessons = useSelector((state: RootState) => state.addSchedule.fridayLessons)
	const saturdayLessons = useSelector((state: RootState) => state.addSchedule.saturdayLessons)
	const chosenClass = useSelector((state: RootState) => state.addSchedule.chosenClass)
	const isLoading = useSelector((state: RootState) => state.addSchedule.isLoading)
	const messages = useSelector((state: RootState) => state.addSchedule.messages)

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
					<label className={styles.label}>?????????? ????????????????: </label>
					<Select
						optionsArray={classes}
						value={chosenClass}
						onChange={(event) => dispatch(onChangeClass(event))}
					/>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>??????????????????????</h2>
					<div className={styles.validateInput}>
						<Input
							value={mondayLessons}
							placeholder={'?????????????? ???????????????? ?????????? ??????????????'}
							onChange={(event) => dispatch(onChangeMondayLessons(event))}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>??????????????</h2>
					<div className={styles.validateInput}>
						<Input
							value={tuesdayLessons}
							placeholder={'?????????????? ???????????????? ?????????? ??????????????'}
							onChange={(event) => dispatch(onChangeTuesdayLessons(event))}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>??????????</h2>
					<div className={styles.validateInput}>
						<Input
							value={wednesdayLessons}
							placeholder={'?????????????? ???????????????? ?????????? ??????????????'}
							onChange={(event) => dispatch(onChangeWednesdayLessons(event))}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>??????????????</h2>
					<div className={styles.validateInput}>
						<Input
							value={thursdayLessons}
							placeholder={'?????????????? ???????????????? ?????????? ??????????????'}
							onChange={(event) => dispatch(onChangeThursdayLessons(event))}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>??????????????</h2>
					<div className={styles.validateInput}>
						<Input
							value={fridayLessons}
							placeholder={'?????????????? ???????????????? ?????????? ??????????????'}
							onChange={(event) => dispatch(onChangeFridayLessons(event))}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>??????????????</h2>
					<div className={styles.validateInput}>
						<Input
							value={saturdayLessons}
							placeholder={'?????????????? ???????????????? ?????????? ??????????????'}
							onChange={(event) => dispatch(onChangeSaturdayLessons(event))}
						/>
					</div>
				</div>
				<div className={formStyles.button}>
					<Button isDisabled={isLoading} color={'green'}>
						????????????????
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AddSchedule
