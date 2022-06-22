import { useSelector } from 'react-redux'

import Loading from './utils/Loading'
import Form from './components/Form'
import Quiz from './components/Quiz'
import Modal from './components/Modal'

import { selectShowModal } from './features/quiz/quizSlice'
import { selectFetchStatus } from './features/questions/questionsSlice'

function App() {
	const fetchStatus = useSelector(selectFetchStatus)
	const showModal = useSelector(selectShowModal)

	let content

	if (fetchStatus === 'idle' || fetchStatus === 'failed') {
		content = <Form />
	} else if (fetchStatus === 'loading') {
		content = <Loading />
	} else if (fetchStatus === 'succeeded' && !showModal) {
		content = <Quiz />
	} else if (showModal) {
		content = <Modal />
	}

	return <main>{content}</main>
}

export default App
