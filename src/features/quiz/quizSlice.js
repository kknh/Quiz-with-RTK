import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	showModal: false, // false | true
	points: 0,
	stage: 0,
}

const quizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		addPoints: (state) => {
			state.points++
		},
		showModal: (state) => {
			state.showModal = true
		},
		nextStage: (state) => {
			state.stage++
		},
		resetQuiz: (state) => {
			state.showModal = false
			state.points = 0
			state.stage = 0
		},
	},
})

export const selectShowModal = (state) => state.quiz.showModal
export const selectQuizPoints = (state) => state.quiz.points
export const selectQuizStage = (state) => state.quiz.stage

export const { addPoints, showModal, nextStage, resetQuiz } = quizSlice.actions

export default quizSlice.reducer
