import React, { useEffect } from 'react'

import Loader from '@components/Loader'
import Table from '@components/Table'
import { fetchClassMarks } from '@store/marks/actions'
import { RootState } from '@store/rootReducer'
import { useDispatch, useSelector } from 'react-redux'

import styles from './AllMarks.module.scss'

type AllMarksProps = {
	classStudy: string
	subject?: string
}

const AllMarks: React.FC<AllMarksProps> = ({ classStudy, subject }) => {
	const dispatch = useDispatch()
	const table = useSelector((state: RootState) => state.marks.marksTable)
	const isLoading = useSelector((state: RootState) => state.marks.isLoading)

	useEffect(() => {
		dispatch(fetchClassMarks(classStudy, subject))
	}, [dispatch])

	return (
		<div className={styles.container}>
			{isLoading ? (
				<div className={styles.loader}>
					<Loader />
				</div>
			) : (
				<div className={styles.table}>
					<Table tableRows={table} checkNull={false} />
				</div>
			)}
		</div>
	)
}

export default AllMarks
