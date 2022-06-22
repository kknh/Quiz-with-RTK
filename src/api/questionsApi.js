import axios from 'axios'

const questionsApi = (params) => {
	return axios.create({
		baseURL: process.env.REACT_APP_URL,
		params,
	})
}

export default questionsApi
