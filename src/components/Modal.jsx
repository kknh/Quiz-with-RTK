import { useSelector, useDispatch } from 'react-redux'
import {
	resetFetch,
	selectAllQuestions,
} from '../features/questions/questionsSlice'
import { resetQuiz, selectQuizPoints } from '../features/quiz/quizSlice'

const Modal = () => {
	const dispatch = useDispatch()
	const points = useSelector(selectQuizPoints)
	const questions = useSelector(selectAllQuestions)
	const score = (points / questions.length) * 100

	const clickHandler = () => {
		dispatch(resetQuiz())
		dispatch(resetFetch())
	}

	return (
		<div className="isOpen modal-container">
			<div className="modal-content">
				<h2>Congrats!</h2>
				<p>You answered {score}% of questions correctly</p>
				<button onClick={clickHandler} className="close-btn">
					Play Again
				</button>
			</div>
		</div>
	)
}

export default Modal
