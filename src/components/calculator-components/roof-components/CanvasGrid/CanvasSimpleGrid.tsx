// @ts-nocheck

import React, { FC, useContext, useEffect } from 'react'

import { Layer, Line } from 'react-konva'
import GridNumbers from './GridNumbers'
import { scalesConfig } from '../../../../data'
import { AppContext } from '../../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
	cellSize: number
	gridHeight: number
	gridHorizontalNumbers: number
	gridVerticalNumbers: number
}

const CanvasSimpleGrid: FC<Props> = ({
	cellSize,
	gridHeight,
	gridHorizontalNumbers,
	gridVerticalNumbers,
}) => {
	const appContext = useContext(AppContext)
	const { selectedScale } = useSelector((state: any) => state.settings)

	function createCellRows() {
		let step = cellSize

		let arr = []
		let x = 0
		let y = -gridHeight / scalesConfig[`${selectedScale}`]

		for (let i = 1; i < 50; i++) {
			arr.push(
				<Line
					key={i}
					x={(x += step)}
					y={y}
					width={10}
					points={[
						0,
						0,
						0,
						gridHeight / scalesConfig[`${selectedScale}`] + cellSize * 2,
						0,
					]}
					stroke='rgba(204, 204, 204, 0.25)'
				/>
			)
		}

		// for (let i = 1; i < gridVerticalNumbers + 2; i++) {
		for (let i = 1; i < 50; i++) {
			arr.push(
				<Line
					key={100 + i}
					x={0}
					y={(y += step)}
					width={10}
					points={[0, 0, 50 * cellSize + cellSize * 2, 0, 0]}
					// points={[0, 0, gridHorizontalNumbers * cellSize + cellSize * 2, 0, 0]}
					stroke='rgba(204, 204, 204, 0.25)'
				/>
			)
		}
		return arr
	}

	return (
		<>
			<GridNumbers
				cellSize={cellSize}
				gridHeight={gridHeight}
				gridHorizontalNumbers={gridHorizontalNumbers}
				gridVerticalNumbers={gridVerticalNumbers}
			/>

			<Layer>{createCellRows()}</Layer>
		</>
	)
}

export default CanvasSimpleGrid
