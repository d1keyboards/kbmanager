import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import Main from '~/main'

const language =
	(navigator.languages && navigator.languages[0]) || navigator.language

const App = () => (
	<IntlProvider locale={language}>
		<MemoryRouter>
			<Main />
		</MemoryRouter>
	</IntlProvider>
)

const domContainer = document.getElementById('main')

if (domContainer) {
	ReactDOM.render(<App />, domContainer)
} else {
	const error = new Error('DOM container is missing!')
	throw error
}
