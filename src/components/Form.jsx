import { useState } from 'react'
import {
	fetchQuestions,
	selectError,
} from '../features/questions/questionsSlice'
import { useDispatch, useSelector } from 'react-redux'

const Form = () => {
	const dispatch = useDispatch()
	const error = useSelector(selectError)
	const [query, setQuery] = useState({
		amount: 10,
		difficulty: 'easy',
		category: 21,
		type: 'multiple',
	})

	const onChangeHandler = (e) => {
		let { name, value } = e.target
		if (name === 'amount') {
			value = Number(value)
		}
		setQuery((prevQuery) => ({
			...prevQuery,
			[name]: value,
		}))
	}

	const onSubmitHandler = async (e) => {
		e.preventDefault()
		dispatch(fetchQuestions(query))
	}

	return (
		<section className="section">
			<form onSubmit={onSubmitHandler} className="setup-form quiz quiz-small">
				<h2>Setup Quiz</h2>
				<div className="form-control">
					<label htmlFor="amount">Number Of Questions:</label>
					<input
						type="number"
						max={50}
						min={1}
						id="amount"
						name="amount"
						value={query.amount}
						className="form-input"
						onChange={onChangeHandler}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="category">Category:</label>
					<select
						id="category"
						name="category"
						value={(() => {
							console.log(query.category)
							return query.category
						})()}
						className="form-input"
						onChange={onChangeHandler}
					>
						<option value={21}>Sport</option>
						<option value={23}>History</option>
						<option value={24}>Politics</option>
					</select>
				</div>
				<div className="form-control">
					<label htmlFor="difficulty">Select Difficulty:</label>
					<select
						id="difficulty"
						name="difficulty"
						value={query.difficulty}
						className="form-input"
						onChange={onChangeHandler}
					>
						<option value="easy">Easy</option>
						<option value="medium">Medium</option>
						<option value="hard">Hard</option>
					</select>
				</div>
				<button className="submit-btn">Start</button>
				{error ? <div className="error">{error}</div> : null}
			</form>
		</section>
	)
}

export default Form
