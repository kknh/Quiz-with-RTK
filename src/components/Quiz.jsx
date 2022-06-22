import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllQuestions } from '../features/questions/questionsSlice'
import {
	showModal,
	selectQuizStage,
	selectQuizPoints,
	addPoints,
	nextStage,
	selectShowModal,
} from '../features/quiz/quizSlice'

const Quiz = () => {
	const dispatch = useDispatch()
	const questions = useSelector(selectAllQuestions)
	const quizStage = useSelector(selectQuizStage)
	const quizPoints = useSelector(selectQuizPoints)
	const showModalStatus = useSelector(selectShowModal)

	const question = questions[quizStage]

	/**************************************************/
	// Placing up correct answer on a random position //
	const randomIndex = Math.floor(Math.random() * 4)
	let answers = [...question.incorrect_answers]
	answers.splice(randomIndex, 0, question.correct_answer)
	/**************************************************/

	const onClickAnswerHandler = (answer) => {
		console.log('clicked')
		console.log(question.correct_answer)
		console.log(answer)
		console.log(showModalStatus)
		if (answer === question.correct_answer) {
			dispatch(addPoints())
		}

		//checking if last question
		if (quizStage === questions.length - 1) {
			dispatch(showModal())
		} else {
			dispatch(nextStage())
		}
	}

	return (
		<section className="quiz">
			{questions.map((question, i) => (
				<div
					key={question.question}
					className={quizStage === i ? 'display-block' : 'display-none'}
				>
					<div className="correct-answers">{`Correct Answers : ${quizPoints}/${questions.length}`}</div>
					<h2>{decodeHtml(question.question)}</h2>
					{answers.map((answer) => (
						<button
							key={answer}
							onClick={() => onClickAnswerHandler(answer)}
							className="answer-btn"
						>
							{decodeHtml(answer)}
						</button>
					))}
					<button
						className="next-question"
						onClick={() =>
							quizStage === questions.length - 1
								? dispatch(showModal())
								: dispatch(nextStage())
						}
					>
						Next Question
					</button>
				</div>
			))}
		</section>
	)
}
export default Quiz

// solution from https://stackoverflow.com/questions/1787322/what-is-the-htmlspecialchars-equivalent-in-javascript
function decodeHtml(str) {
	var map = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#039;': "'",
	}
	return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) {
		return map[m]
	})
}
