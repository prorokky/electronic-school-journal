import React, { useState } from 'react'

import Button from '@components/Button'
import Input from '@components/Input'
import Select from '@components/Select'
import { RootState } from '@store/rootReducer'
import formStyles from '@styles/addForms.module.scss'
import globalStyles from '@styles/globalStyles.module.scss'
import { useSelector } from 'react-redux'

import styles from './Schedule.module.scss'

const Schedule: React.FC = () => {
	const classes = useSelector((state: RootState) => state.user.user.classes)
	const [chosenClass, setChosenClass] = useState<string>(classes[0])
	const [mondayLessons, setMondayLessons] = useState<string>('')
	const [tuesdayLessons, setTuesdayLessons] = useState<string>('')
	const [wednesdayLessons, setWednesdayLessons] = useState<string>('')
	const [thursdayLessons, setThursdayLessons] = useState<string>('')
	const [fridayLessons, setFridayLessons] = useState<string>('')
	const [saturdayLessons, setSaturdayLessons] = useState<string>('')
	const [isLoading, setLoading] = useState<boolean>(false)

	return (
		<div className={globalStyles.container}>
			<form className={styles.scheduleForm} onSubmit={(event) => console.log(event)}>
				<div className={formStyles.validateSelect}>
					<label className={styles.label}>Класс обучения: </label>
					<Select optionsArray={classes} value={chosenClass} onChange={(event) => setChosenClass(event)} />
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Понедельник</h2>
					<div className={styles.validateInput}>
						<Input
							value={mondayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => setMondayLessons(event)}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Вторник</h2>
					<div className={styles.validateInput}>
						<Input
							value={tuesdayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => setTuesdayLessons(event)}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Среда</h2>
					<div className={styles.validateInput}>
						<Input
							value={wednesdayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => setWednesdayLessons(event)}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Четверг</h2>
					<div className={styles.validateInput}>
						<Input
							value={thursdayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => setThursdayLessons(event)}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Пятница</h2>
					<div className={styles.validateInput}>
						<Input
							value={fridayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => setFridayLessons(event)}
						/>
					</div>
				</div>
				<div className={styles.inputLessons}>
					<h2 className={styles.lessonsHeader}>Суббота</h2>
					<div className={styles.validateInput}>
						<Input
							value={saturdayLessons}
							placeholder={'Введите предметы через запятую'}
							onChange={(event) => setSaturdayLessons(event)}
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
