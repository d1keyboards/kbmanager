import ReactDOM from 'react-dom'
import { Global } from '@emotion/react'
import { global } from '~/ui/style'
import Main from '~/ui/main'

const App = () => (
	<div>
		<Global styles={global} />
		<Main />
		<div>Hopsa 11</div>
	</div>
)

const domContainer = document.getElementById('main')

if (domContainer) {
	ReactDOM.render(<App />, domContainer)
} else {
	const error = new Error('DOM container is missing!')
	throw error
}
