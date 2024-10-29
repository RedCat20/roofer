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
import { AppContext } from '../../../context/AppContext'
import { useActiveCategory } from '../Dictionary/Dictionary'
import AddCategoryDialog from '../Dialogs/AddCategoryDialog'
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

interface ICategoryParams {
	categoryExceptions: any[]
	categoryRecommended: any[]
	categoryMade: any[]
}

const Categories: FC = () => {
	const appContext = useContext(AppContext)

	const [modalCategory, setModalCategory] = useState<Boolean>(false)

	// const [categories, setCategories] = useState<any[]>([])
	const { dictionaries: categories } = useSelector(
		(state: RootState) => state.dictionaries
	)

	// const [name, setName] = useState<string>('');
	// const [selectedFile, setSelectedFile] = useState(undefined)
	// const [preview, setPreview] = useState(undefined)

	let onCreateCategory = item => {
		setModalCategory(false)
		const fd = new FormData()
		// @ts-ignore
		fd.append('image', item.selectedFile)
		fd.append('name', item.name)

		// send `POST` request

		var requestOptions: RequestInit = {
			method: 'POST',
			body: fd,
			redirect: 'follow',
		}

		fetch('http://185.25.118.150:11111/api/directory', requestOptions)
			.then(response => {
				response.text()
				//  setCategories([...categories, {id: categories.length + 1, name: name, image: (preview !== undefined ? preview : categoryImg), exceptions: [], recommended: [], made: []}])
			})
			.then(result => {
				// console.log(result)
				window.location.href = '/dictionary'
			})
			.catch(error => console.log('error', error))
	}

	// useEffect(() => {
	// 	appContext.dispatch({
	// 		type: 'update-dictionary',
	// 		payload: { dictionary: categories },
	// 	})
	// }, [categories])

	useEffect(() => {
		// console.log('appContext.state.dictionary:', appContext.state.dictionary)
		// setCategories(appContext.state.dictionary)
	}, [])

	const uploadFile = (file: any) => {
		// add file to FormData object
		const fd = new FormData()
		// @ts-ignore
		fd.append('image', selectedFile)

		// send `POST` request
		fetch('/http://185.25.118.150:11111/api/directory', {
			method: 'POST',
			body: fd,
		})
			.then(res => res.json())
			.then(json => console.log(json))
			.catch(err => console.error(err))
	}

	// create a preview as a side effect, whenever selected file is changed
	// useEffect(() => {
	//     if (!selectedFile) {
	//         setPreview(undefined)
	//         return
	//     }
	//
	//     const objectUrl = URL.createObjectURL(selectedFile)
	//     // @ts-ignore
	//     setPreview(objectUrl)
	// }, [selectedFile])

	function onRemoveBtnHandler(item: any) {
		fetch('http://185.25.118.150:11111/api/directory/' + item.id, {
			method: 'DELETE',
		})
			.then(res => {
				return res.json()
			})
			.then(data => {
				window.location.href = '/dictionary'
				//console.log('data: ', data)
			})
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
								<FontAwesomeIcon
									icon={faTrashCan}
									// icon='fa-solid fa-trash'
									className={styles.removeBtn}
									onClick={e => {
										e.preventDefault()
										e.stopPropagation()
										// onRemoveBtnHandler(item)
									}}
								/>

								{/* <button
									className={styles.removeBtn}
									onClick={e => {
										e.preventDefault()
										e.stopPropagation()
										onRemoveBtnHandler(item)
									}}
								>
									X
								</button> */}
								<div className={styles.nameBlock}>
									<div className={styles.img}>
										<img src={item.image} alt={item.name} />
									</div>
									<div className={styles.name}>{item.name}</div>
								</div>
								<button
									className={styles.editBtn}
									onClick={e => {
										// e.preventDefault(); // e.stopPropagation()
									}}
								>
									Редагувати
								</button>
							</div>
						</Link>
					)
				})}
			</div>

			{modalCategory && (
				<AddCategoryDialog
					modalCategory={modalCategory}
					setModalCategory={setModalCategory}
					// selectedFile={selectedFile}
					onCreateCategoryCallback={onCreateCategory}
				/>
			)}
		</div>
	)
}

export default Categories
