import React, { useContext, useEffect } from 'react'

import Alert from '@components/Alert'
import Loader from '@components/Loader'
import Table from '@components/Table'
import { AuthContext } from '@context/AuthContext'
import { fetchContacts } from '@store/contacts/actions'
import { RootState } from '@store/rootReducer'
import { clearErrors } from '@store/userWork/actions'
import formsStyles from '@styles/addForms.module.scss'
import globalStyles from '@styles/globalStyles.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../Profile/Profile.module.scss'

const Contacts: React.FC = () => {
	const dispatch = useDispatch()
	const auth = useContext(AuthContext)
	const isLoading = useSelector((state: RootState) => state.contacts.isLoading)
	const messages = useSelector((state: RootState) => state.contacts.messages)
	const contacts = useSelector((state: RootState) => state.contacts.contacts)

	useEffect(() => {
		dispatch(fetchContacts(auth.userId, auth.token))
	}, [])

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={formsStyles.container}>
					<div className={formsStyles.alertsContainer}>
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
					<h1 className={styles.profileHeader}>Контакты преподавателей</h1>
					<div className={styles.profileInfo}>
						<Table tableRows={contacts} />
					</div>
				</div>
			)}
		</>
	)
}

export default Contacts
