// @ts-nocheck

import React, {
	createContext,
	FC,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react'
import styles from './Categories.module.scss'
import { Link } from 'react-router-dom'

import plusImg from '../../../images/plus.png'
import categoryImg from '../../../images/nophoto.png'
import { useActiveCategory } from '../Dictionary/Dictionary'
import AddCategoryDialog from '../Dialogs/AddCategoryDialog'
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import logoImg from '../../../images/logo.png'

interface ICategoryParams {
	categoryExceptions: any[]
	categoryRecommended: any[]
	categoryMade: any[]
}

const Categories: FC = () => {
	const [modalCategory, setModalCategory] = useState<Boolean>(false)

	const { dictionaries: categories } = useSelector(
		(state: RootState) => state.dictionaries
	)

	let onCreateCategory = item => {
		setModalCategory(false)
		const fd = new FormData()
		// @ts-ignore
		fd.append('image', item.selectedFile)
		fd.append('name', item.name)
	}

	return (
		<div className={styles.categoriesWrapper}>
			{/* Сторінка списку категорій */}
			<div className={styles.categoryList}>
				<div
					onClick={e => setModalCategory(true)}
					key={categories.length + 1}
					className={styles.plusCard}
				>
					<img src={plusImg} alt='Plus' />
				</div>

				{categories.map(item => {
					return (
						<Link to={'table' + '/category=' + item.id}>
							<div key={item.id} className={styles.categoryCard}>
								<div className={styles.nameBlock}>
									<div className={styles.img}>
										<img src={logoImg} alt={item.name} />
									</div>
									<div className={styles.name}>{item.name}</div>
								</div>
							</div>
						</Link>
					)
				})}
			</div>

			{modalCategory && (
				<AddCategoryDialog
					modalCategory={modalCategory}
					setModalCategory={setModalCategory}
					onCreateCategoryCallback={onCreateCategory}
				/>
			)}
		</div>
	)
}

export default Categories
