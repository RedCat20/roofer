// @ts-nocheck

import React, { FC, useEffect, useState } from 'react'
import { Circle, Layer, Line } from 'react-konva'
import { ALL } from 'dns'
import { useGridConfig } from '../../../../hooks/useGridConfig'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
	customPoints: any
	// calcPolygonPointsCallback: (points: any[]) => void
}

const CreativePointedPolygon: FC<Props> = ({
	customPoints,
	// calcPolygonPointsCallback,
}) => {
	const gridConfig = useGridConfig()
	const dispatch = useDispatch()

	const [points, setPoints] = useState([])
	const [builtCustomPoints, setBuiltCustomPoints] = useState([])

	const [polygonPoints, setPolygonPoints] = useState([])

	const [lines, setLines] = useState<number[]>([])

	const lineRef = React.useRef(null)

	const { selectedScale } = useSelector((state: any) => state.settings)

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

			console.log('polygonPoints', [...arr])

			setPolygonPoints([...arr])
		}
	}, [customPoints, gridConfig])

	React.useEffect(() => {
		if (polygonPoints?.length > 0) {
			// build anchors
			let buildCustomPointsCopy: any = []
			for (let i = 0; i < polygonPoints.length; i++) {
				buildCustomPointsCopy[i] = builtCustomPoints[i]
			}
			if (polygonPoints.length > 0) {
				polygonPoints.forEach((item: any, index: string | number) => {
					// @ts-ignore
					buildCustomPointsCopy.push(
						buildAnchor(
							polygonPoints[index][0],
							polygonPoints[index][1],
							index,
							index
						)
					)
				})
			}
			setBuiltCustomPoints(buildCustomPointsCopy)

			// set array of points to lines
			let l: any = []
			for (let i = 0; i < polygonPoints.length; i++) {
				// @ts-ignore
				l.push(polygonPoints[i][0])
				// @ts-ignore
				l.push(polygonPoints[i][1])
			}
			console.log('l', l)
			// @ts-ignore
			setLines(l)
		}
	}, [polygonPoints])

	// Побудова точки
	let buildAnchor = (x: number, y: number, name: string, key: number) => {
		return (
			<Circle
				key={key + points?.length}
				x={x || 0}
				y={y || 0}
				radius={10 * selectedScale}
				stroke={'#666'}
				fill={'#ddd'}
				strokeWidth={2}
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
		let stage = e.target.getStage()
		const pointerPosition = stage.getPointerPosition()
	}

	return (
		<>
			<Layer>
				<Line
					ref={lineRef}
					points={lines}
					stroke={'black'}
					strokeWidth={2}
					closed={true}
					opacity={1}
				/>
			</Layer>

			<Layer style={{ zIndex: 2 }}>{builtCustomPoints}</Layer>
		</>
	)
}

export default CreativePointedPolygon
