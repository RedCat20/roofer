import { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { AppContextProvider } from './context/AppContext'
import SiteWrapper from './components/SiteWrapper'
import './App.scss'

const App: FC = () => {
	// console.log('store: ', store.getState())
	return (
		<Provider store={store}>
			<AppContextProvider>
				<Router>
					<SiteWrapper />
				</Router>
			</AppContextProvider>
		</Provider>
	)
}

export default App
