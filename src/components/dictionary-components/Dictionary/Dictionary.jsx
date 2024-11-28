import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import styles from './Dictionary.module.scss'

const Dictionary = () => {
	const { dictionaries: categories } = useSelector(state => state.dictionaries)

	let location = useLocation()

	const [activeCategory, setActiveCategory] = useState(null)

	useEffect(() => {
		if (location) {
			let urlCategoryId = location.pathname.split('=')[1]
			let result = categories.find(item => item.id.toString() === urlCategoryId)

			setActiveCategory(result)
		}
	}, [location])

	return (
		<div className={styles.container}>
			<div className={styles.topContainer}>
				<div className={styles.blocktitle}>
					<h1 className={styles.title}>Dictionary </h1> {'>'}{' '}
					<a href='/dictionary'> Categories</a>{' '}
					{activeCategory ? (
						<>
							{'> '}
							{activeCategory.name}
						</>
					) : (
						''
					)}
				</div>
			</div>
			<div className={styles.article}>
				<Outlet context={{ activeCategory, setActiveCategory }} />
			</div>
		</div>
	)
}

export default Dictionary

export function useActiveCategory() {
	return useOutletContext()
}
