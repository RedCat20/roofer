// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './OverlapTable.module.scss'
import { useLocation } from 'react-router-dom'

import plusImg from '../../../images/plus.png'
import AddTableRowDialog from '../Dialogs/AddTableRowDialog'
import AddOverlapRowDialog from '../Dialogs/AddOverlapRowDialog'
import { useSelector, useDispatch } from 'react-redux'

interface ICategoryParams {
	categoryExceptions: any[]
	categoryRecommended: any[]
	categoryMade: any[]
}

const OverlapTable: FC = () => {
	let location = useLocation()
	const { dictionaries: categories } = useSelector(
		(state: RootState) => state.dictionaries
	)
	const [activeCategory, setActiveCategory] = useState(null)
	const [overlapLength, setOverlapLength] = useState<Boolean>(false)

	useEffect(() => {
		if (location) {
			let urlCategoryId = location.pathname.split('=')[1]
			let result = categories.find(item => item.id.toString() === urlCategoryId)

			setActiveCategory(result)
		}
	}, [location])

	useEffect(() => {
		if (activeCategory) {
			setOverlaps(activeCategory.overlaps)
		}
	}, [activeCategory])

	let removeTableRow = index => {
		// let arr1 = activeCategory.exceptions.filter(function(value, ind, arr) {
		//     return arr.indexOf(value) !== index;
		// });
		//
		// var requestOptions;
		//
		// let myHeaders = new Headers();
		// myHeaders.append("Content-Type", "application/json");
		//
		// requestOptions = {
		//     // method: 'POST',
		//     method: 'PUT',
		//     headers: myHeaders,
		//     body: JSON.stringify({
		//         id: activeCategory.id,
		//         overlaps: arr1,
		//     }),
		//     redirect: 'follow'
		// };
		//
		// // @ts-ignore
		// fetch('http://185.25.118.150:11111/api/directory', requestOptions)
		//     .then(response => {
		//         return response.text()
		//     })
		//     .then(result => {
		//         console.log("result: ", result)
		//     })
		//     .catch(error => console.log('error', error))
		//     .finally(() => window.location.reload())
	}

	function getTrs() {
		let trs = []
		for (let i = 0; i < overlaps?.length; i++) {
			trs.push(
				<tr key={'table_tr' + i} className=''>
					<td>{overlaps[i].general || '-'}</td>
					<td>{overlaps[i].useful || '-'}</td>
					<td>{overlaps[i].general - overlaps[i].useful || '-'}</td>
					{/* <td>{overlaps[i].overlap || '-'}</td> */}
					<td>
						{/* <button onClick={e => removeTableRow(i)}>X</button> */}
						<button onClick={e => {}}>X</button>
					</td>
				</tr>
			)
		}
		return trs
	}

	const [overlaps, setOverlaps] = useState([])

	let onCloseOverlap = () => {
		setOverlapLength(false)
	}

	let onCreateOverlap = overlapObj => {
		setOverlapLength(false)
		setOverlaps([...overlaps, overlapObj])

		var requestOptions

		let myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		requestOptions = {
			// method: 'POST',
			method: 'PUT',
			headers: myHeaders,
			body: JSON.stringify({
				id: activeCategory.id,
				overlaps: [...overlaps, overlapObj],
			}),
			redirect: 'follow',
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

	// - загальна ширина нахлесту
	// - корисна ширина нахлесту
	// - нахлест (може бути від'ємним) рахується: загальна - корисна.

	return (
		<div clasName={styles.container}>
			<h1>Overlap</h1>
			<div>
				<table>
					<thead>
						<tr>
							<th>Main width</th>
							<th>Useful width</th>
							<th>Overlap</th>
							<th>Actions</th>
							<th>
								<div
									onClick={e => setOverlapLength(true)}
									key={Math.random()}
									className={styles.addWrapper}
								>
									<img className={styles.addImg} src={plusImg} alt='Plus' />
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{/*<tr>*/}
						{/*    <td>-</td>*/}
						{/*    <td>-</td>*/}
						{/*    <td>-</td>*/}
						{/*    <td>*/}
						{/*        <button>X</button>*/}
						{/*    </td>*/}
						{/*</tr>*/}

						{getTrs()}
					</tbody>
				</table>
			</div>

			{overlapLength && (
				<AddOverlapRowDialog
					onCreateOverlapCallback={onCreateOverlap}
					onCloseOverlapCallback={onCloseOverlap}
				/>
			)}
		</div>
	)
}

export default OverlapTable
