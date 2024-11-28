import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import Calculator from './calculator-components/Calculator/Calculator'
import Dictionary from './dictionary-components/Dictionary/Dictionary'
import Categories from './dictionary-components/Categories/Categories'
import MainPage from './main-page-component/MainPage/MainPage'
import CategoryInfo from './dictionary-components/CategoryInfo/CategoryInfo'

interface Props {}

const Routers: FC<Props> = () => {
	return (
		<Routes>
			<Route path='/'>
				<Route index element={<MainPage />} />
				<Route path='calculator' element={<Calculator />} />
				<Route path='dictionary' element={<Dictionary />}>
					<Route index element={<Categories />} />
					<Route path='table/:category' element={<CategoryInfo />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default Routers
