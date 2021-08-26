import ReactDOM from 'react-dom'
import Main from '~/main'

const App = () => <Main />

const domContainer = document.getElementById('main')

if (domContainer) {
	ReactDOM.render(<App />, domContainer)
} else {
	const error = new Error('DOM container is missing!')
	throw error
}
