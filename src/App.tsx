import { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import SiteWrapper from './components/SiteWrapper'
import './App.scss'

const App: FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<SiteWrapper />
			</Router>
		</Provider>
	)
}

export default App
