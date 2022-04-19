import React, { useContext, useEffect } from 'react'

import Alert from '@components/Alert'
import Loader from '@components/Loader'
import Select from '@components/Select'
import Table from '@components/Table'
import { AuthContext } from '@context/AuthContext'
import { RootState } from '@store/rootReducer'
import { changeChosenSubject, getAllSubject, clearErrors } from '@store/showMyMarks/actions'
import formStyles from '@styles/addForms.module.scss'
import globalStyles from '@styles/globalStyles.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ShowMyMarks.module.scss'

const ShowMyMarks: React.FC = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector((state: RootState) => state.showMyMarks.isLoading)
	const messages = useSelector((state: RootState) => state.showMyMarks.messages)
	const allSubjects = useSelector((state: RootState) => state.showMyMarks.allSubject)
	const chosenSubject = useSelector((state: RootState) => state.showMyMarks.chosenSubject)
	const allMarks = useSelector((state: RootState) => state.showMyMarks.allMarks)

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
					<h2 className={styles.header}>Успеваемость</h2>
					<div className={styles.validateSelect}>
						<label className={styles.selectLabel}>Предмет: </label>
						<Select
							optionsArray={allSubjects}
							value={chosenSubject}
							onChange={(event) => dispatch(changeChosenSubject(event))}
						/>
					</div>
					<div>
						<Table tableRows={allMarks} checkNull={false} />
					</div>
				</div>
			)}
		</>
	)
}

export default ShowMyMarks
