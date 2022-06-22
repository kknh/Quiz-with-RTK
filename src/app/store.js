import { configureStore } from '@reduxjs/toolkit'
import questionsSlice from '../features/questions/questionsSlice'
import quizSlice from '../features/quiz/quizSlice'
const store = configureStore({
	reducer: {
		questions: questionsSlice,
		quiz: quizSlice,
	},
})

export default store
