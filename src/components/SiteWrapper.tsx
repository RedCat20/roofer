import { FC } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../store'
import { useGetDictionariesQuery } from '../store/api/dictionary'
import { useWindowSize } from '../hooks/useWindowSize'

import Routers from './Routers'
import styles from './SiteWrapper.module.scss'

import { Header } from './layout/Header/Header'
import { DataError } from './layout/DataError/DataError'
import { Footer } from './layout/Footer/Footer'

const SiteWrapper: FC = () => {
	const { data: dictionaries, error, isLoading } = useGetDictionariesQuery('')
	const [width, height] = useWindowSize()

	const state = useSelector((state: RootState) => {
		return state
	})

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.content}>
				{isLoading ? (
					<div className={styles.loading}>Loading...</div>
				) : (
					<>
						{width < 900 ? (
							<DataError errorText='Потрібен прилад з більшою шириною' />
						) : !error ? (
							<Routers />
						) : (
							<DataError />
						)}
					</>
				)}
			</div>
			<Footer />
		</div>
	)
}

export default SiteWrapper
