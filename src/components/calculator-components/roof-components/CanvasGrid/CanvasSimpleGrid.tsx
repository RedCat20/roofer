// @ts-nocheck

import React, { FC, useContext, useEffect } from 'react'

import { Layer, Line } from 'react-konva'
import GridNumbers from './GridNumbers'
import { scalesConfig } from '../../../../data'
import { AppContext } from '../../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'
import { useGridConfig } from '../../../../hooks/useGridConfig'

interface Props {}

const CanvasSimpleGrid: FC<Props> = ({}) => {
	const appContext = useContext(AppContext)
	const { selectedScale } = useSelector((state: any) => state.settings)
	const gridConfig = useGridConfig()

	function createCellRows() {
		const horizontalLines = Math.floor(
			gridConfig?.height / gridConfig?.cellSize
		)
		const verticalLines = Math.floor(gridConfig?.width / gridConfig?.cellSize)

		let step = gridConfig?.cellSize

		let arr = []

		let x = gridConfig?.startCoords.x - gridConfig?.cellSize
		let y = gridConfig?.startCoords.y - gridConfig?.cellSize

		for (let i = 0; i < verticalLines; i++) {
			arr.push(
				<Line
					key={'vertical_' + i}
					x={(x += step)}
					y={0}
					width={10}
					points={[0, 0, 0, -gridConfig?.height, 0]}
					stroke='rgba(204, 204, 204, 0.4)'
				/>
			)
		}

		x = gridConfig?.startCoords.x - gridConfig?.cellSize
		y = gridConfig?.startCoords.y - gridConfig?.cellSize

		for (let i = 0; i < horizontalLines; i++) {
			arr.push(
				<Line
					key={'horizontal_' + i}
					x={x}
					y={(y += step)}
					width={10}
					points={[
						0,
						0,
						verticalLines * gridConfig?.cellSize + gridConfig?.cellSize / 2,
						0,
						0,
					]}
					stroke='rgba(204, 204, 204, 0.4)'
				/>
			)
		}
		return arr
	}

	return (
		<>
			<GridNumbers gridHeight={gridConfig?.gridHeight} />
			<Layer>{createCellRows()}</Layer>
		</>
	)
}

export default CanvasSimpleGrid
