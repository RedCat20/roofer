// @ts-nocheck

import React, { FC, useState, useEffect } from 'react'
import { Circle, Layer, Line } from 'react-konva'
import { useGridConfig } from '../../../../hooks/useGridConfig'
import { useSelector, useDispatch } from 'react-redux'
import {
	changeCustomPoints,
	changeFigurePoints,
	changeFigureSides,
} from '../../../../store/figureParamsSlice'

interface Props {
	customPoints: any[]
	// calcPolygonPointsCallback: (coords: any[]) => void
}

const EditedPointedPolygon: FC<Props> = ({
	customPoints,
	// calcPolygonPointsCallback,
}) => {
	const [builtCustomPoints, setBuiltCustomPoints] = useState([])

	const [lines, setLines] = useState<number[]>([])

	const lineRef = React.useRef(null)

	const gridConfig = useGridConfig()
	const dispatch = useDispatch()

	const [coords, setCoords] = useState([])

	console.log('customPoints', customPoints)

	useEffect(() => {
		if (customPoints?.length && gridConfig) {
			const { startCoords, cellSize } = gridConfig
			const arr = customPoints.map(item => {
				console.log('item: ', item)
				return [
					startCoords[0] + item[0] * cellSize,
					startCoords[1] - item[1] * cellSize,
				]
			})

			console.log('COORDS: ', [...arr])

			setCoords([...arr])
		}
	}, [customPoints, gridConfig])

	React.useEffect(() => {
		if (coords !== null) {
			// build anchors
			let buildCustomPointsCopy: any = []

			for (let i = 0; i < coords.length; i++) {
				buildCustomPointsCopy.push(
					buildAnchor(coords[i][0], coords[i][1], String(i), i)
				)
			}

			setBuiltCustomPoints(buildCustomPointsCopy)

			// set array of points to lines
			let l: any = []
			for (let i = 0; i < coords.length; i++) {
				// @ts-ignore
				l.push(coords[i][0])
				// @ts-ignore
				l.push(coords[i][1])
			}
			// @ts-ignore
			setLines(l)
		}
	}, [coords])

	// Побудова точки
	let buildAnchor = (x: number, y: number, name: string, key: number) => {
		return (
			<Circle
				key={key}
				x={x || 0}
				y={y || 0}
				radius={8}
				stroke={'#666'}
				fill={'#ddd'}
				strokeWidth={2}
				draggable={true}
				id={name}
				onMouseOver={onMouseOverHandler.bind(this)}
				onMouseOut={onMouseOutHandler.bind(this)}
				onDragMove={onDragMoveHandler.bind(this)}
			/>
		)
	}

	function onMouseOverHandler(e: any) {
		document.body.style.cursor = 'pointer'
		e.target.strokeWidth(4)
	}

	function onMouseOutHandler(e: any) {
		document.body.style.cursor = 'default'
		e.target.strokeWidth(2)
	}

	let onDragMoveHandler = (e: any) => {
		const { cellSize, startCoords } = gridConfig
		let id = Number(e.currentTarget.id())

		// build anchors
		let dragedPoints: any = []

		dragedPoints = [...coords]

		// for (let i = 0; i < coords.length; i++) {
		// 	dragedPoints[i] = { x: coords[i][0], y: coords[i][1] }
		// }

		console.log(e.currentTarget.x())
		console.log(e.currentTarget.y())

		dragedPoints[id] = [e.currentTarget.x(), e.currentTarget.y()]

		console.log('dragedPoints', dragedPoints)

		setCoords([...dragedPoints])

		const newArray = [
			...dragedPoints.map(item => [
				item[0] / cellSize - startCoords[0] / cellSize,
				startCoords[1] / cellSize - item[1] / cellSize,
			]),
		]

		dispatch(changeCustomPoints(newArray))

		// calcPolygonPointsCallback(dragedPoints)

		let l: any = []
		for (let i = 0; i < coords.length; i++) {
			// @ts-ignore
			l.push(dragedPoints[i][0])
			// @ts-ignore
			l.push(dragedPoints[i][1])
		}

		console.log('l', l)

		// @ts-ignore
		setLines(l)
	}

	return (
		<>
			<Layer>
				<Line
					ref={lineRef}
					points={lines}
					//     fill={'rgba(139, 69, 19, 0.45)'}
					stroke={'black'}
					strokeWidth={2}
					closed={true}
				/>
			</Layer>

			<Layer style={{ zIndex: 3 }}>{builtCustomPoints}</Layer>
		</>
	)
}

export default EditedPointedPolygon
