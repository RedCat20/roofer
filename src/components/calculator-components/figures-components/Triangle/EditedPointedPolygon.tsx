// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'
import { Circle, Layer, Line } from 'react-konva'
import { scalesConfig } from '../../../../data'
import { AppContext } from '../../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
	coords: any[]
	calcPolygonPointsCallback: (coords: any[]) => void
	gridHeight: any
	cellSize: any
}

const EditedPointedPolygon: FC<Props> = ({
	coords,
	calcPolygonPointsCallback,
	gridHeight,
	cellSize,
}) => {
	const [points, setPoints] = useState<any[]>([])
	const [builtCustomPoints, setBuiltCustomPoints] = useState([])
	const appContext = useContext(AppContext)
	const { selectedScale } = useSelector((state: any) => state.settings)

	const [lines, setLines] = useState<number[]>([])

	const lineRef = React.useRef(null)

	React.useEffect(() => {
		// console.log("use effect lines: ", lines)
	}, [lines])

	React.useEffect(() => {
		// console.log("use effect builtCustomPoints: ", builtCustomPoints);
	}, [builtCustomPoints])

	const [scaledCoords, setScaledCoords] = useState()

	useEffect(() => {
		if (scaledCoords?.length !== 3) return

		let figureBottomLine =
			-gridHeight / scalesConfig[`${selectedScale}`] + cellSize
		// let figureBottomLine = -gridHeight + cellSize;

		// console.log('figureBottomLine: ', figureBottomLine)

		let yDifference = figureBottomLine - scaledCoords[0].y

		// console.log('figureBottomLine: ', figureBottomLine);
		// console.log('coords[0].y: ', coords[0].y);
		// console.log('coords[0].y: ', coords[1].y);
		// console.log('coords[0].y: ', coords[2].y);

		let i1 = -1 * figureBottomLine - -1 * scaledCoords[0].y
		let i2 = -1 * figureBottomLine - -1 * scaledCoords[1].y
		let i3 = -1 * figureBottomLine - -1 * scaledCoords[2].y

		const result = scaledCoords.reduce((a, b) => {
			return a.y < b.y ? a : b
		})

		let i = -1 * figureBottomLine - -1 * result.y

		console.log('result: ', result)

		setScaledCoords([
			//{x: coords[0].x, y: coords[0].y + figureBottomLine - coords[0].y},
			// {x: coords[0].x, y: coords[0].y},
			//{x: coords[0].x, y: coords[0].y + figureBottomLine - coords[0].y},
			{ x: scaledCoords[0].x, y: scaledCoords[0].y - i },
			// {x: coords[1].x, y: coords[1].y},
			//{x: coords[1].x, y: coords[1].y + figureBottomLine - coords[1].y},
			{ x: scaledCoords[1].x, y: scaledCoords[1].y - i },
			// {x: coords[2].x, y: figureBottomLine - coords[2].y},
			{ x: scaledCoords[2].x, y: scaledCoords[2].y - i },
		])
	}, [selectedScale])

	useEffect(() => {
		setScaledCoords(coords)
	}, [coords])

	React.useEffect(() => {
		if (scaledCoords?.length === 3) {
			let coords = scaledCoords.slice()

			// build anchors
			let buildCustomPointsCopy: any = []

			for (let i = 0; i < coords.length; i++) {
				buildCustomPointsCopy.push(
					buildAnchor(coords[i].x, coords[i].y, String(i), i)
				)
			}

			setBuiltCustomPoints(buildCustomPointsCopy)

			// set array of points to lines
			let l: any = []
			for (let i = 0; i < coords.length; i++) {
				// @ts-ignore
				l.push(coords[i].x)
				// @ts-ignore
				l.push(coords[i].y)
			}
			// @ts-ignore
			setLines(l)
			setPoints(coords)
		}
	}, [scaledCoords])

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
		let id = Number(e.currentTarget.id())

		let stage = e.target.getStage()
		const pointerPosition = stage.getPointerPosition()

		// build anchors
		let dragedPoints: any = []

		// for (let i = 0; i < points.length; i++) {
		//     dragedPoints[i] = points[i];
		// }

		for (let i = 0; i < coords.length; i++) {
			dragedPoints[i] = coords[i]
		}

		dragedPoints[id] = { x: e.currentTarget.x(), y: e.currentTarget.y() }

		setPoints(dragedPoints)

		calcPolygonPointsCallback(dragedPoints)

		let l: any = []
		for (let i = 0; i < coords.length; i++) {
			// @ts-ignore
			l.push(dragedPoints[i].x)
			// @ts-ignore
			l.push(dragedPoints[i].y)
		}
		// @ts-ignore
		setLines(l)

		//dragedPoints.forEach()
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
