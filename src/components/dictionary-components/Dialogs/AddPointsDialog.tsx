// @ts-nocheck

import React, { FC, useContext, useState, useEffect } from 'react'
import { scalesConfig } from '../../../data'
import { useSelector, useDispatch } from 'react-redux'
import styles from './AddPointsDialog.module.scss'
import { FIGURES } from '../../../enums/figure.enum'
import {
	changeCustomPoints,
	changeFigurePoints,
	changeFigureSides,
} from '../../../store/figureParamsSlice'
import { calcSideLengthByPoints } from '../../../helpers/calc.sides.helper'
import { useGridConfig } from '../../../hooks/useGridConfig'
import { setNewSquareParamsByPoints } from '../../../helpers/set.new.square.params'
import { setNewRectangleParamsByPoints } from '../../../helpers/set.new.rectangle.params'

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
	const [newPointsArr, setNewPointsArr] = useState<object[]>([])

	const gridConfig = useGridConfig()

	const dispatch = useDispatch()
	const { selectedFigure, selectedScale } = useSelector(
		(state: any) => state.settings
	)
	const { figureSides, figurePoints, customPoints } = useSelector(
		(state: any) => state.figureParams
	)

	const [polygonCoords, setPolygonCoords] = useState([])

	let onChangePolygonPoint = e => {
		let arr = [...customPoints]

		const id = e.target.id
		const value = Number(e.target.value)

		const axis = id.split('-')?.[0]
		const point = id.split('-')?.[1]

		if (point < arr.length) {
			if (axis === 'x') arr[point] = [value, figurePoints[point][1]]
			else if (axis === 'y') arr[point] = [figurePoints[point][0], value]
			dispatch(changeCustomPoints([...arr]))
		}
	}

	let onCreatePolygonPoints = (e, item) => {
		let arr = [...customPoints]

		const id = e.target.id
		const value = Number(e.target.value)

		const axis = id.split('-')?.[0]
		const point = id.split('-')?.[1]

		if (point < arr.length) {
			if (axis === 'x') arr[point] = [value, item[1]]
			else if (axis === 'y') arr[point] = [item[0], value]
			dispatch(changeCustomPoints([...arr]))
		}
	}

	const setPointsHandler = e => {
		const id = e.target.id

		const axis = id.split('-')?.[0]
		const point = id.split('-')?.[1]

		console.log(axis, point)

		const { cellSize } = gridConfig

		switch (selectedFigure) {
			case FIGURES.Square: {
				const newFigureASide = e.target.value
				setNewSquareParamsByPoints({
					newData: {
						axis,
						point,
						value: newFigureASide,
					},
					storeData: {
						dispatch,
						figureSides,
						changeFigureSides,
						changeFigurePoints,
					},
				})
				break
			}
			case FIGURES.Rectangle: {
				const newFigureASide = e.target.value
				setNewRectangleParamsByPoints({
					newData: {
						axis,
						point,
						value: newFigureASide,
					},
					storeData: {
						dispatch,
						figureSides,
						figurePoints,
						changeFigureSides,
						changeFigurePoints,
					},
				})
				break
			}
		}
	}

	const addPointToPolygon = () => {
		const arr = [...customPoints]
		arr.push([0, 0])
		console.log('arr', arr)
		dispatch(changeCustomPoints([...arr]))
	}

	return (
		<>
			{selectedFigure !== FIGURES.Polygon ? (
				<div className={styles.container}>
					<div className={styles.label}>
						<span>X-0</span>
						<input
							type='number'
							id='x-0'
							disabled={!selectedFigure || selectedFigure !== FIGURES.Polygon}
							value={figurePoints[0]?.[0]}
						/>
					</div>
					<div className={styles.label}>
						<span>Y-0</span>
						<input
							type='number'
							id='y-0'
							disabled={!selectedFigure || selectedFigure !== FIGURES.Polygon}
							value={figurePoints?.[0]?.[1]}
						/>
					</div>
					<hr style={{ width: '100%' }} />
					<div className={styles.label}>
						<span>X-1</span>
						<input
							disabled={!selectedFigure}
							type='number'
							id='x-1'
							value={figurePoints?.[1]?.[0]}
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
							value={figurePoints?.[1]?.[1]}
						/>
					</div>
					<hr style={{ width: '100%' }} />
					<div className={styles.label}>
						<span>X-2</span>
						<input
							disabled={!selectedFigure}
							type='number'
							id='x-2'
							value={figurePoints?.[2]?.[0]}
							onChange={setPointsHandler}
						/>
					</div>
					<div className={styles.label}>
						<span>Y-2</span>
						<input
							disabled={!selectedFigure}
							type='number'
							id='y-2'
							value={figurePoints?.[2]?.[1]}
							onChange={setPointsHandler}
						/>
					</div>
					<hr style={{ width: '100%' }} />
					<div className={styles.label}>
						<span>X-3</span>
						<input
							type='number'
							id='x-3'
							disabled={
								!selectedFigure ||
								[FIGURES.Rectangle, FIGURES.Square].includes(selectedFigure)
							}
							value={figurePoints?.[3]?.[0]}
							onChange={setPointsHandler}
						/>
					</div>
					<div className={styles.label}>
						<span>Y-3</span>
						<input
							disabled={!selectedFigure}
							type='number'
							id='y-3'
							value={figurePoints?.[3]?.[1]}
							onChange={setPointsHandler}
						/>
					</div>
				</div>
			) : (
				<div className={styles.container}>
					{customPoints.map((item, idx, arr) => {
						return (
							<>
								<div className={styles.label}>
									<span>X-{idx}</span>
									<input
										type='number'
										id={`x-${idx}`}
										disabled={!selectedFigure}
										value={item[0]}
										onChange={e => onCreatePolygonPoints(e, item)}
									/>
								</div>
								<div className={styles.label}>
									<span>Y-{idx}</span>
									<input
										type='number'
										id={`y-${idx}`}
										disabled={!selectedFigure}
										value={item[1]}
										onChange={e => onCreatePolygonPoints(e, item)}
									/>
								</div>
							</>
						)
					})}
					{/* <div className={styles.label}>
						<span>X-0</span>
						<input
							type='number'
							id='x-0'
							disabled={!selectedFigure}
							value={figurePoints[0]?.[0]}
							onChange={onCreatePolygonPoints}
						/>
					</div>
					<div className={styles.label}>
						<span>Y-0</span>
						<input
							type='number'
							id='y-0'
							disabled={!selectedFigure}
							value={figurePoints?.[0]?.[1]}
							onChange={onCreatePolygonPoints}
						/>
					</div>
					<hr style={{ width: '100%' }} />
					<div className={styles.label}>
						<span>X-1</span>
						<input
							disabled={!selectedFigure}
							type='number'
							id='x-1'
							value={figurePoints?.[1]?.[0]}
							onChange={onCreatePolygonPoints}
						/>
					</div>
					<div className={styles.label}>
						<span>Y-1</span>
						<input
							type='number'
							id='y-1'
							disabled={!selectedFigure}
							value={figurePoints?.[1]?.[1]}
							onChange={onCreatePolygonPoints}
						/>
					</div>
					<hr style={{ width: '100%' }} />
					<div className={styles.label}>
						<span>X-2</span>
						<input
							disabled={!selectedFigure}
							type='number'
							id='x-2'
							value={figurePoints?.[2]?.[0]}
							onChange={onCreatePolygonPoints}
						/>
					</div>
					<div className={styles.label}>
						<span>Y-2</span>
						<input
							disabled={!selectedFigure}
							type='number'
							id='y-2'
							value={figurePoints?.[2]?.[1]}
							onChange={onCreatePolygonPoints}
						/>
					</div>
					<hr style={{ width: '100%' }} />
					<div className={styles.label}>
						<span>X-3</span>
						<input
							type='number'
							id='x-3'
							disabled={!selectedFigure}
							value={figurePoints?.[3]?.[0]}
							onChange={onCreatePolygonPoints}
						/>
					</div>
					<div className={styles.label}>
						<span>Y-3</span>
						<input
							disabled={!selectedFigure}
							type='number'
							id='y-3'
							value={figurePoints?.[3]?.[1]}
							onChange={onCreatePolygonPoints}
						/>
					</div> */}
					<button onClick={addPointToPolygon}>Add point</button>
				</div>
			)}
		</>
	)
}

export default AddPointsDialog
