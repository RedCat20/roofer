// @ts-nocheck

import React, { FC, useContext, useEffect } from 'react'
import { Rect, Layer } from 'react-konva'
import { ICoords } from '../../../../interfaces/coords'
import { scalesConfig } from '../../../../data'
import {
	changeFigureSides,
	changeFigurePoints,
} from '../../../../store/figureParamsSlice'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
	width: number
	height: number
	gridConfig: any
}

const FullRectangle: FC<Props> = ({ width, height, gridConfig }) => {
	const dispatch = useDispatch()
	const { figurePoints, figureSides } = useSelector(
		(state: any) => state.figureParams
	)
	const { selectedScale } = useSelector((state: any) => state.settings)
	const { startCoords, cellSize } = gridConfig

	useEffect(() => {
		dispatch(
			changeFigurePoints([
				{ x0: 0, y0: 0 },
				{ x1: width * cellSize, y1: 0 },
				{ x2: 0, y2: 0 },
				{ x3: 0, y3: 0 },
			])
		)
	}, [])

	return (
		<Layer>
			<Rect
				x={startCoords.x}
				y={startCoords.y}
				width={width * cellSize}
				height={height * cellSize}
				strokeWidth={2}
				stroke={'black'}
				opacity={1}
			/>
		</Layer>
	)
}

export default FullRectangle
