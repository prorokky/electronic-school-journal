export type MarksReducerState = {
	chosenClass: string
	messages: Array<object>
	isLoading: boolean
	students: Array<string>
	selectedStudent: string
	markDate: Date
	mark: string
	markType: string
	marksTable: Array<Array<object>>
}
