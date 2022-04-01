import React, { useState } from 'react'

import AddMark from '@components/AddMark'
import AllMarks from '@components/AllMarks'
import Select from '@components/Select'
import { onChangeClass } from '@store/marks/actions'
import { RootState } from '@store/rootReducer'
import globalStyles from '@styles/globalStyles.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Marks.module.scss'

const Marks: React.FC = () => {
	const dispatch = useDispatch()
	const [showAllMarks, setShowAllMarks] = useState<boolean>(false)
	const [showAddMark, setShowAddMark] = useState<boolean>(false)

	const classes = useSelector((state: RootState) => state.user.user.classes)
	const chosenClass = useSelector((state: RootState) => state.marks.chosenClass)

	return (
		<div className={globalStyles.container}>
			<div className={styles.functionsSelectContainer}>
				<div className={styles.validateSelect}>
					<label className={styles.selectLabel}>Класс обучения: </label>
					<Select
						optionsArray={classes}
						value={chosenClass}
						onChange={(event) => dispatch(onChangeClass(event))}
					/>
				</div>
				<h2
					className={styles.functionText}
					onClick={() => {
						setShowAddMark(false)
						setShowAllMarks(true)
					}}
				>
					Показать все оценки
				</h2>
				<h2
					className={styles.functionText}
					onClick={() => {
						setShowAllMarks(false)
						setShowAddMark(true)
					}}
				>
					Выставить оценки
				</h2>
			</div>
			{chosenClass !== '' && showAllMarks && <AllMarks classStudy={chosenClass} />}
			{chosenClass !== '' && showAddMark && <AddMark />}
		</div>
	)
}

export default Marks
