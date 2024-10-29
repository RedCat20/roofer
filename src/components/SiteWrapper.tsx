import { FC } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../store'
import { useGetDictionariesQuery } from '../store/api/dictionary'

import Routers from './Routers'
import styles from './SiteWrapper.module.scss'

import { Header } from './layout/Header/Header'
import { DataError } from './layout/DataError/DataError'
import { Footer } from './layout/Footer/Footer'

const SiteWrapper: FC = () => {
	const { data: dictionaries, error, isLoading } = useGetDictionariesQuery('')
	const state = useSelector((state: RootState) => {
		return state
	})
	return (
		<div className={styles.container}>
			<Header />
			{isLoading ? (
				<>Loading...</>
			) : (
				<div className={styles.content}>
					{!error ? (
						<Routers defaultDictionaries={dictionaries} />
					) : (
						<DataError />
					)}
				</div>
			)}
			<Footer />
		</div>
	)
}

export default SiteWrapper
