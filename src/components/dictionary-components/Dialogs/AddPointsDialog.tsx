// @ts-nocheck

import React, { FC, useContext, useState, useEffect } from 'react'
import { scalesConfig } from '../../../data'
import { AppContext } from '../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'
import styles from './AddPointsDialog.module.scss'
import { FIGURES } from '../../../enums/figure.enum'
import {
	changeFigurePoints,
	changeFigureSides,
} from '../../../store/figureParamsSlice'

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
	const { selectedFigure, selectedScale } = useSelector(
		(state: any) => state.settings
	)
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
	}, [selectedFigure, figureSides])

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
					scalesConfig[`${selectedScale}`] +
				appContext.state.gridConfig.cellSize
			).toFixed(2)

			let convertedY = +(
				-appContext.state.gridConfig.height * scalesConfig[`${selectedScale}`] +
				appContext.state.gridConfig.cellSize +
				+document.querySelector(`#y-${i}`).value *
					scalesConfig[`${selectedScale}`]
			).toFixed(2)

			arr.push({ x: convertedX, y: convertedY })
		}

		setPointsCallback(arr)
	}

	const setPointsHandler = e => {
		const id = e.target.id

		const axis = id.split('-')?.[0]
		const point = id.split('-')?.[1]

		if (selectedFigure === FIGURES.Square && axis === 'x' && point === '1') {
			const x1 = e.target.value
			dispatch(
				changeFigurePoints([
					{ x: 0, y: 0 },
					{ x: x1, y: 0 },
					{ x: x1, y: x1 },
					{ x: 0, y: x1 },
				])
			)
			dispatch(
				changeFigureSides({
					figureASide: Number(x1),
					figureBSide: Number(0),
					figureCSide: Number(0),
					figureDSide: Number(0),
				})
			)

			setNewPointsArr([
				{ x: 0, y: 0 },
				{ x: x1, y: 0 },
				{ x: x1, y: x1 },
				{ x: 0, y: x1 },
			])
		} else if (
			selectedFigure === FIGURES.Rectangle &&
			axis === 'x' &&
			point === '1'
		) {
			const x1 = e.target.value
			dispatch(
				changeFigurePoints([
					{ x: 0, y: 0 },
					{ x: x1, y: 0 },
					{ x: x1, y: x1 },
					{ x: 0, y: x1 },
				])
			)
			dispatch(
				changeFigureSides({
					figureASide: Number(x1),
					figureBSide: Number(0),
					figureCSide: Number(0),
					figureDSide: Number(0),
				})
			)

			setNewPointsArr([
				{ x: 0, y: 0 },
				{ x: x1, y: 0 },
				{ x: x1, y: x1 },
				{ x: 0, y: x1 },
			])
		}
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
						onChange={setPointsHandler}
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
