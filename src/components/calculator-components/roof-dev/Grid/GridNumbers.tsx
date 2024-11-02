// @ts-nocheck

import React, { FC, useContext, useEffect } from 'react'

import { Layer, Line, Text } from 'react-konva'
import { scalesConfig } from '../../../../data'
import { useSelector, useDispatch } from 'react-redux'
import { useGridConfig } from '../../../../hooks/useGridConfig'

interface Props {}

const GridNumbers: FC<Props> = ({ startCoords, cellSize }) => {
	const { selectedScale } = useSelector((state: any) => state.settings)
	const gridConfig = useGridConfig()

	function createCellNumber() {
		const cellSize = gridConfig?.cellSize || 0
		const startCoords = gridConfig?.startCoords || [0, 0]

		const horizontalLines = Math.floor(gridConfig?.height / cellSize)
		const verticalLines = Math.floor(gridConfig?.width / cellSize)

		let step = cellSize
		let arr = []

		let x = startCoords[0] - cellSize
		let y = startCoords[1]

		for (let i = 0; i < verticalLines + 1; i++) {
			arr.push(
				<Text
					text={i.toString()}
					key={'vertical__' + i}
					x={(x += step)}
					y={y}
					// y={y + 10}
					// scaleY={-1}
					// scaleX={1}
					fill={'darkred'}
					width={100}
				/>
			)
		}
		x = startCoords[0]
		y = startCoords[1] + cellSize

		for (let i = 0; i < horizontalLines + 1; i++) {
			arr.push(
				<Text
					text={i.toString()}
					key={'horizontal__' + i}
					x={x}
					// scaleY={-1}
					// scaleX={1}
					fill={'darkred'}
					y={(y -= step)}
					// y={(y += step)}
					width={100}
				/>
			)
		}

		return arr
	}

	return (
		<>
			<Layer>{createCellNumber()}</Layer>
		</>
	)
}

export default GridNumbers
