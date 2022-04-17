import React, { Fragment, useEffect } from 'react'

import Alert from '@components/Alert'
import Loader from '@components/Loader'
import Table from '@components/Table'
import { clearErrors } from '@store/addContact/actions'
import { RootState } from '@store/rootReducer'
import { fetchSchedule } from '@store/schedule/actions'
import formStyles from '@styles/addForms.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Schedule.module.scss'

const tablesName: Array<string> = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

const Schedule: React.FC = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector((state: RootState) => state.schedule.isLoading)
	const messages = useSelector((state: RootState) => state.schedule.messages)
	const schedule = useSelector((state: RootState) => state.schedule.schedule)

	useEffect(() => {
		dispatch(fetchSchedule())
	}, [fetchSchedule])

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.container}>
					<div className={formStyles.alertsContainer}>
						{messages.map((message, index) => {
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
					<div className={styles.tablesContainer}>
						<h2 className={styles.headerText}>Расписание</h2>
						{schedule.map((dayLessons, index) => {
							console.log(dayLessons)
							return (
								dayLessons[0]?.value !== '' && (
									<Fragment key={index}>
										<h3 className={styles.tableName}>{tablesName[index]}</h3>
										<Table tableRows={dayLessons} checkNull={false} />
									</Fragment>
								)
							)
						})}
					</div>
				</div>
			)}
		</>
	)
}

export default Schedule
