// @ts-nocheck

import React, {
	ContextType,
	createContext,
	FC,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react'

import styles from './Dictionary.module.scss'

import { useSelector, useDispatch } from 'react-redux'

// import { useHistory } from 'react-router';

import plusImg from '../../../images/plus.png'
import categoryImg from '../../../images/nophoto.png'
// import { AppContext } from '../../../context/AppContext'
import Categories from '../Categories/Categories'

import { Outlet, useLocation, useOutletContext } from 'react-router-dom'

interface ICategoryParams {
	categoryExceptions: any[]
	categoryRecommended: any[]
	categoryMade: any[]
}

const Dictionary: FC = () => {
	// const appContext = useContext(AppContext)

	const { dictionaries: categories } = useSelector(
		(state: RootState) => state.dictionaries
	)

	// const history = useHistory()
	let location = useLocation()

	const [modalCategory, setModalCategory] = useState<Boolean>(false)
	const [modalLength, setModalLength] = useState<Boolean>(false)
	const [type, setType] = useState('calculator')
	const [categoryName, setCategoryName] = useState('')

	// const [categories, setCategories] = useState<any[]>([])
	const [categoryExceptions, setCategoryExceptions] = useState<any[]>([])
	const [categoryRecommended, setCategoryRecommended] = useState<any[]>([])
	const [categoryMade, setCategoryMade] = useState<any[]>([])

	const [categoryParams, setCategoryParams] = useState<ICategoryParams[]>([])

	const [name, setName] = useState<string>('')

	const [exception, setException] = useState<string>([])
	const [recommended, setRecommended] = useState<string>([])
	const [made, setMade] = useState<string>([])

	const node = useRef<HTMLDivElement>(null)

	let handleClickOutside = (event: any) => {
		if (node && !node.current?.contains(event.target)) {
			setModalLength(false)
			setModalCategory(false)
		}
	}

	const [selectedFile, setSelectedFile] = useState(undefined)
	const [preview, setPreview] = useState(undefined)

	let onCreateCategory = () => {
		setModalCategory(false)

		const fd = new FormData()
		// @ts-ignore
		fd.append('image', selectedFile)
		fd.append('name', name)

		// send `POST` request

		var requestOptions: RequestInit = {
			method: 'POST',
			body: fd,
			redirect: 'follow',
		}

		fetch('http://185.25.118.150:11111/api/directory', requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error))

		// setCategories([
		// 	...categories,
		// 	{
		// 		id: categories.length + 1,
		// 		name: name,
		// 		image: preview !== undefined ? preview : categoryImg,
		// 		exceptions: [],
		// 		recommended: [],
		// 		made: [],
		// 	},
		// ])
	}

	// useEffect(() => {
	// 	appContext.dispatch({
	// 		type: 'update-dictionary',
	// 		payload: { dictionary: categories },
	// 	})
	// }, [categories])

	let onCreateLength = () => {
		setModalLength(false)

		setCategoryExceptions([...categoryExceptions, exception])
		setCategoryRecommended([...categoryRecommended, recommended])
		setCategoryMade([...categoryMade, made])
	}

	useEffect(() => {
		setCategoryParams([
			{
				categoryExceptions: categoryExceptions,
				categoryRecommended: categoryRecommended,
				categoryMade: categoryMade,
			},
		])
	}, [categoryExceptions, categoryRecommended, categoryMade])

	// useEffect(() => {
	// 	setType('categories')
	// 	// setCategories(appContext.state.dictionary)
	// }, [])

	function getTrs() {
		let trs = []

		for (
			let i = 0;
			i < categoryParams[0]?.categoryRecommended?.length &&
			i < categoryParams[0]?.categoryMade?.length &&
			i < categoryParams[0]?.categoryExceptions?.length;
			i++
		) {
			trs.push(
				<tr key={'table_tr' + i} className=''>
					<td>{categoryParams[0].categoryExceptions[i] || '-'}</td>
					<td>{categoryParams[0].categoryRecommended[i] || '-'}</td>
					<td>{categoryParams[0].categoryMade[i] || '-'}</td>
					<td>
						<button>X</button>
					</td>
				</tr>
			)
		}
		return trs
	}

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
	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined)
			return
		}

		const objectUrl = URL.createObjectURL(selectedFile)
		// @ts-ignore
		setPreview(objectUrl)
	}, [selectedFile])

	const onSelectFile = (e: any) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined)
			return
		}

		var binaryData = []
		binaryData.push(selectedFile)
		// @ts-ignore
		let objectUrl = window.URL.createObjectURL(
			new Blob(binaryData, { type: 'image' })
		)

		setSelectedFile(e.target.files[0])
	}

	function onSetCategoryBtnHandler(item: any) {
		setType('category-info')
		setCategoryName(item.name)
		setCategoryExceptions(item.exceptions || [])
		setCategoryRecommended(item.recommended || [])
		setCategoryMade(item.made || [])
		uploadFile(selectedFile)
	}

	function onRemoveBtnHandler(item: any) {
		fetch('http://185.25.118.150:11111/api/directory/' + item.id, {
			method: 'DELETE',
		})
			.then(res => {
				return res.json()
			})
			.then(data => console.log('data: ', data))
	}

	const [activeCategory, setActiveCategory] = useState(null)

	useEffect(() => {
		if (location) {
			let urlCategoryId = location.pathname.split('=')[1]
			let result = categories.find(item => item.id.toString() === urlCategoryId)
			// let result = appContext.state.dictionary.find(
			// 	item => item.id.toString() === urlCategoryId
			// )
			setActiveCategory(result)
		}
	}, [location])

	return (
		<div className={styles.container}>
			<div className={styles.topContainer}>
				<div className={styles.blocktitle}>
					<span className={styles.title}>Довідник </span> {'>'}{' '}
					<a href='/dictionary' style={{ textDecoration: 'underline' }}>
						{' '}
						Категорії
					</a>{' '}
					<a> {activeCategory ? `> ${activeCategory.name}` : ''} </a>
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
	return useOutletContext<ContextType>()
}
