import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import questionsApi from '../../api/questionsApi'

const initialState = {
	questions: [],
	status: 'idle', // loading | succeeded | failed
	error: null,
}

const questionsSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		resetFetch: (state) => {
			state.questions = []
			state.status = 'idle'
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchQuestions.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchQuestions.fulfilled, (state, action) => {
				if (action.payload.response_code === 0) {
					state.status = 'succeeded'
					state.questions = action.payload.results
				} else if (
					action.payload.response_code === 2 ||
					action.payload.response_code === 1
				) {
					state.status = 'failed'
					state.error = 'Oops, there is a problem.'
					console.error('there is a problem with fetched data')
				} else {
					state.status = 'failed'
					state.error = 'Oops, there is a problem.'
				}
			})
			.addCase(fetchQuestions.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export const fetchQuestions = createAsyncThunk(
	'questions/fetchQuestions',
	async (query) => {
		const response = await questionsApi(query).get()
		return response.data
	}
)

export const selectAllQuestions = (state) => state.questions.questions
export const selectFetchStatus = (state) => state.questions.status
export const selectError = (state) => state.questions.error

export const { resetFetch } = questionsSlice.actions

export default questionsSlice.reducer
