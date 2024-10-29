// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './CategoryInfo.module.scss'
import { useLocation } from 'react-router-dom'

import plusImg from '../../../images/plus.png'
import { AppContext } from '../../../context/AppContext'
import AddTableRowDialog from '../Dialogs/AddTableRowDialog'
import Table from '../Table/Table'
import OverlapTable from '../OverlapTable/OverlapTable'

interface ICategoryParams {
	categoryExceptions: any[]
	categoryRecommended: any[]
	categoryMade: any[]
}

const CategoryInfo: FC = () => {
	const appContext = useContext(AppContext)
	let location = useLocation()

	const [activeCategory, setActiveCategory] = useState(null)

	useEffect(() => {
		if (location) {
			let urlCategoryId = location.pathname.split('=')[1]
			let result = appContext.state.dictionary.find(
				item => item.id.toString() === urlCategoryId
			)
			setActiveCategory(result)
		}
	}, [location])

	const [modalLength, setModalLength] = useState<Boolean>(false)

	const [categoryExceptions, setCategoryExceptions] = useState<any[]>([])
	const [categoryRecommended, setCategoryRecommended] = useState<any[]>([])
	const [categoryMade, setCategoryMade] = useState<any[]>([])

	const [categoryParams, setCategoryParams] = useState<ICategoryParams[]>([])

	const [exception, setException] = useState<string>('')
	const [recommended, setRecommended] = useState<string>('')
	const [made, setMade] = useState<string>('')

	let onCreateLength = () => {
		setModalLength(false)

		//// API

		var requestOptions

		let myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		if (categoryExceptions?.length) {
			setCategoryExceptions([...categoryExceptions, exception])
			setCategoryRecommended([...categoryRecommended, recommended])
			setCategoryMade([...categoryMade, made])

			requestOptions = {
				// method: 'POST',
				method: 'PUT',
				headers: myHeaders,
				body: JSON.stringify({
					id: activeCategory.id,
					exceptions: [...categoryExceptions, exception],
					recommended: [...categoryRecommended, recommended],
					made: [...categoryMade, made],
				}),
				redirect: 'follow',
			}
		} else {
			setCategoryExceptions([exception])
			setCategoryRecommended([recommended])
			setCategoryMade([made])

			requestOptions = {
				// method: 'POST',
				method: 'PUT',
				headers: myHeaders,
				body: JSON.stringify({
					id: activeCategory.id,
					exceptions: [exception],
					recommended: [recommended],
					made: [made],
				}),
				redirect: 'follow',
			}
		}

		// @ts-ignore
		fetch('http://185.25.118.150:11111/api/directory', requestOptions)
			.then(response => {
				return response.text()
			})
			.then(result => console.log('result: ', result))
			// .then(result => document.location.reload())
			.catch(error => console.log('error', error))
			.finally(() => window.location.reload())
	}

	useEffect(() => {
		if (activeCategory) {
			setCategoryExceptions(activeCategory.exceptions)
			setCategoryRecommended(activeCategory.recommended)
			setCategoryMade(activeCategory.made)
		}
	}, [activeCategory])

	useEffect(() => {
		setCategoryParams([
			{
				categoryExceptions: categoryExceptions,
				categoryRecommended: categoryRecommended,
				categoryMade: categoryMade,
			},
		])
	}, [categoryExceptions, categoryRecommended, categoryMade])

	let removeTableRow = index => {
		let arr1 = activeCategory.exceptions.filter(function (value, ind, arr) {
			return arr.indexOf(value) !== index
		})

		let arr2 = activeCategory.recommended.filter(function (value, ind, arr) {
			return arr.indexOf(value) !== index
		})

		let arr3 = activeCategory.made.filter(function (value, ind, arr) {
			return arr.indexOf(value) !== index
		})

		var requestOptions

		let myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		requestOptions = {
			// method: 'POST',
			method: 'PUT',
			headers: myHeaders,
			body: JSON.stringify({
				id: activeCategory.id,
				exceptions: arr1,
				recommended: arr2,
				made: arr3,
			}),
			redirect: 'follow',
		}

		// @ts-ignore
		fetch('http://185.25.118.150:11111/api/directory', requestOptions)
			.then(response => {
				return response.text()
			})
			.then(result => {
				setException(arr1)
				setRecommended(arr2)
				setMade(arr3)
			})
			.catch(error => console.log('error', error))
			.finally(() => window.location.reload())
	}

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
						<button onClick={e => removeTableRow(i)}>X</button>
					</td>
				</tr>
			)
		}
		return trs
	}

	return (
		<div className={styles.container}>
			<Table />
			<OverlapTable />
		</div>
	)
}

export default CategoryInfo
