// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './Table.module.scss'
import { useLocation } from 'react-router-dom'

import plusImg from '../../../images/plus.png'
import { AppContext } from '../../../context/AppContext'
import AddTableRowDialog from '../Dialogs/AddTableRowDialog'
import { useSelector, useDispatch } from 'react-redux'

interface ICategoryParams {
	categoryExceptions: any[]
	categoryRecommended: any[]
	categoryMade: any[]
}

const Table: FC = () => {
	const appContext = useContext(AppContext)
	let location = useLocation()

	const [activeCategory, setActiveCategory] = useState(null)
	const { dictionaries: categories } = useSelector(
		(state: RootState) => state.dictionaries
	)
	useEffect(() => {
		if (location) {
			let urlCategoryId = location.pathname.split('=')[1]
			// let result = appContext.state.dictionary.find(
			// 	item => item.id.toString() === urlCategoryId
			// )
			let result = categories.find(item => item.id.toString() === urlCategoryId)
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
						{/* <button onClick={e => removeTableRow(i)}>X</button> */}
						<button onClick={e => {}}>X</button>
					</td>
				</tr>
			)
		}
		return trs
	}

	return (
		<div>
			<h1>Листи</h1>
			<div>
				<table>
					<thead>
						<tr>
							<th>Не виготовляється</th>
							<th>Рекомендовані довжини</th>
							<th>Виготовляється</th>
							<th>Дії</th>
							<th>
								<div
									onClick={e => setModalLength(true)}
									key={Math.random()}
									className={styles.addWrapper}
								>
									<img className={styles.addImg} src={plusImg} alt='Plus' />
								</div>
							</th>
						</tr>
					</thead>
					<tbody>{getTrs()}</tbody>
				</table>
			</div>

			{modalLength && (
				<AddTableRowDialog
					modalLength={modalLength}
					setModalLength={setModalLength}
					exception={exception}
					setException={setException}
					recommended={recommended}
					setRecommended={setRecommended}
					made={made}
					setMade={setMade}
					onCreateLengthCallback={onCreateLength}
				/>
			)}
		</div>
	)
}

export default Table
