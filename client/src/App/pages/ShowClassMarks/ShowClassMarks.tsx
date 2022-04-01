import React, { useContext, useEffect } from 'react'

import Alert from '@components/Alert'
import AllMarks from '@components/AllMarks'
import Loader from '@components/Loader'
import Select from '@components/Select'
import { AuthContext } from '@context/AuthContext'
import { RootState } from '@store/rootReducer'
import { changeChosenSubject, getAllSubject, clearErrors } from '@store/showClassMarks/actions'
import formStyles from '@styles/addForms.module.scss'
import globalStyles from '@styles/globalStyles.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ShowClassMarks.module.scss'

const ShowClassMarks: React.FC = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector((state: RootState) => state.showClassMarks.isLoading)
	const messages = useSelector((state: RootState) => state.showClassMarks.messages)
	const allSubjects = useSelector((state: RootState) => state.showClassMarks.allSubject)
	const chosenSubject = useSelector((state: RootState) => state.showClassMarks.chosenSubject)
	const classStudy = useSelector((state: RootState) => state.user.user.class_study)

	const auth = useContext(AuthContext)

	useEffect(() => {
		dispatch(getAllSubject(auth.userId, auth.token))
	}, [dispatch])

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={globalStyles.container}>
					<div className={formStyles.alertsContainer}>
						{messages?.map((message, index) => {
							// @ts-ignore
							return (
								<Alert
									cleanError={() => dispatch(clearErrors())}
									// @ts-ignore
									text={message.message}
									key={index}
									// @ts-ignore
									isWarning={message.isWarning}
								/>
							)
						})}
					</div>
					<h2 className={styles.header}>Оценки всего класса</h2>
					<div className={styles.validateSelect}>
						<label className={styles.selectLabel}>Предмет: </label>
						<Select
							optionsArray={allSubjects}
							value={chosenSubject}
							onChange={(event) => dispatch(changeChosenSubject(event))}
						/>
					</div>
					{chosenSubject !== '' && <AllMarks classStudy={classStudy} />}
				</div>
			)}
		</>
	)
}

export default ShowClassMarks
