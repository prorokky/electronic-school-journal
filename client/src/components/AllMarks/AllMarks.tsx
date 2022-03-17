import React, { useContext, useEffect } from 'react'

import { AuthContext } from '@context/AuthContext'
import { fetchClassMarks } from '@store/marks/actions'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from "@store/rootReducer";

const AllMarks: React.FC = () => {
	const dispatch = useDispatch()
	const auth = useContext(AuthContext)
	const table = useSelector((state: RootState) => state.marks.marksTable)

	useEffect(() => {
		dispatch(fetchClassMarks())
	}, [dispatch])

	return <div>All marks here</div>
}

export default AllMarks
