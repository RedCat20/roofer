// @ts-nocheck

import React, { FC, useContext, useState, useEffect } from 'react'
import { scalesConfig } from '../../../data'
import { AppContext } from '../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'
import styles from './AddPointsDialog.module.scss'
import { FIGURES } from '../../../enums/figure.enum'

interface IAddTableRowDialogProps {
	pointsArr?: any
	setPointsCallback: any
	onCloseCallback: any
}

const AddPointsDialog: FC<IAddTableRowDialogProps> = ({
	pointsArr,
	setPointsCallback,
	onCloseCallback,
}) => {
	const appContext = useContext(AppContext)
	const [newPointsArr, setNewPointsArr] = useState<object[]>([])

	const dispatch = useDispatch()
	const { selectedFigure } = useSelector((state: any) => state.settings)
	const { figureSides, figurePoints } = useSelector(
		(state: any) => state.figureParams
	)

	useEffect(() => {
		setNewPointsArr([
			{ x: 0, y: 0 },
			{ x: figureSides.figureASide, y: 0 },
			{ x: figureSides.figureASide, y: figureSides.figureBSide },
			{ x: 0, y: figureSides.figureBSide },
		])
	}, [figureSides])

	let onCreatePolygonPoints = () => {
		let arr = []

		for (let i = 0; i < 6; i++) {
			if (
				!document.querySelector(`#x-${i}`) ||
				(document.querySelector(`#x-${i}`) &&
					document.querySelector(`#x-${i}`)?.value === '')
			)
				continue

			let convertedX = +(
				+document.querySelector(`#x-${i}`).value *
					scalesConfig[`${appContext.state.selectedScale}`] +
				appContext.state.gridConfig.cellSize
			).toFixed(2)

			let convertedY = +(
				-appContext.state.gridConfig.height *
					scalesConfig[`${appContext.state.selectedScale}`] +
				appContext.state.gridConfig.cellSize +
				+document.querySelector(`#y-${i}`).value *
					scalesConfig[`${appContext.state.selectedScale}`]
			).toFixed(2)

			arr.push({ x: convertedX, y: convertedY })
		}

		setPointsCallback(arr)
	}

	const setPointsHandler = e => {
		// console.log('setPointsHandler: ', e.target.value)
		// console.log('setPointsHandler: ', e.target.id)
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.label}>
					<span>X-0</span>
					{/*<input type='text' id="x-0" onChange={setPointsHandler.bind(this)} value={newPointsArr[0]?.x} />*/}
					<input
						type='number'
						id='x-0'
						disabled={!selectedFigure || selectedFigure !== FIGURES.Polygon}
						value={newPointsArr[0]?.x}
						// onChange={setPointsHandler.bind(this)}
					/>
				</div>
				<div className={styles.label}>
					<span>Y-0</span>
					<input
						type='number'
						id='y-0'
						disabled={!selectedFigure || selectedFigure !== FIGURES.Polygon}
						value={newPointsArr[0]?.y}
					/>
				</div>

				<div className={styles.label}>
					<span>X-1</span>
					<input
						disabled={!selectedFigure}
						type='number'
						id='x-1'
						value={newPointsArr[1]?.x}
					/>
				</div>
				<div className={styles.label}>
					<span>Y-1</span>
					<input
						type='number'
						id='y-1'
						disabled={
							!selectedFigure ||
							[FIGURES.Rectangle, FIGURES.Square].includes(selectedFigure)
						}
						value={newPointsArr[1]?.y}
					/>
				</div>

				<div className={styles.label}>
					<span>X-2</span>
					<input
						disabled={
							!selectedFigure || [FIGURES.Square].includes(selectedFigure)
						}
						type='number'
						id='x-2'
						value={newPointsArr[2]?.x}
					/>
				</div>
				<div className={styles.label}>
					<span>Y-2</span>
					<input
						disabled={
							!selectedFigure || [FIGURES.Square].includes(selectedFigure)
						}
						type='number'
						id='y-2'
						value={newPointsArr[2]?.y}
					/>
				</div>

				<div className={styles.label}>
					<span>X-3</span>

					<input
						type='number'
						id='x-3'
						disabled={
							!selectedFigure ||
							[FIGURES.Rectangle, FIGURES.Square].includes(selectedFigure)
						}
						value={newPointsArr[3]?.x}
					/>
				</div>
				<div className={styles.label}>
					<span>Y-3</span>
					<input
						disabled={
							!selectedFigure || [FIGURES.Square].includes(selectedFigure)
						}
						type='number'
						id='y-3'
						value={newPointsArr[3]?.y}
					/>
				</div>
			</div>
		</>
	)
}

export default AddPointsDialog
