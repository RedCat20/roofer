// @ts-nocheck

import React, { FC, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layer, Line } from 'react-konva'

import { useGridConfig } from '../../../../hooks/useGridConfig'
import GridNumbers from './GridNumbers'

interface Props {
	startCoords
	cellSize
	scale
}

const CanvasSimpleGrid: FC<Props> = ({ startCoords, cellSize, scale }) => {
	const { selectedScale } = useSelector((state: any) => state.settings)
	const gridConfig = useGridConfig()

	// const startCoords = [0, 0]

	function createCellRows() {
		const horizontalLines = Math.floor(gridConfig?.height / cellSize)
		const verticalLines = Math.floor(gridConfig?.width / cellSize)

		let arr = []

		let x = startCoords[0] - cellSize
		let y = startCoords[1] - cellSize

		for (let i = 0; i < verticalLines; i++) {
			arr.push(
				<Line
					key={'vertical_' + i}
					x={(x += cellSize)}
					y={0}
					points={[0, 0, 0, gridConfig?.height, 0]}
					stroke={i === 0 ? 'salmon' : 'silver'}
					strokeWidth={i === 0 ? 3 : 2}
				/>
			)
		}

		x = startCoords[0] - cellSize
		y = gridConfig?.height - ((gridConfig?.height % cellSize) - cellSize)

		for (let i = 0; i < horizontalLines + 1; i++) {
			arr.push(
				<Line
					key={'horizontal_' + i}
					x={x}
					y={(y -= cellSize)}
					lineWidth={1}
					points={[0, 0, gridConfig?.width, 0, 0]}
					stroke={i === 1 ? 'salmon' : i === 0 ? 'gainsboro' : 'silver'}
					strokeWidth={i === 1 ? 3 : i === 0 ? 1 : 2}
				/>
			)
		}
		return arr
	}

	if (!gridConfig || !cellSize) return

	return (
		<>
			<Layer>{createCellRows()}</Layer>
			<GridNumbers />
		</>
	)
}

export default CanvasSimpleGrid
