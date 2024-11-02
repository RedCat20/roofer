// @ts-nocheck

import React, { FC, useContext, useEffect } from 'react'

import { Layer, Line, Text } from 'react-konva'
import { scalesConfig } from '../../../../data'
import { AppContext } from '../../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'
import { useGridConfig } from '../../../../hooks/useGridConfig'

interface Props {
	gridHorizontalNumbers: number
	gridVerticalNumbers: number
}

const GridNumbers: FC<Props> = ({}) => {
	const appContext = useContext(AppContext)
	const { selectedFigure, selectedScale } = useSelector(
		(state: any) => state.settings
	)
	const gridConfig = useGridConfig()

	function createCellNumber() {
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
				<Text
					text={i.toString()}
					key={'vertical__' + i}
					x={(x += step)}
					y={y + 10}
					scaleY={-1}
					fill={'red'}
					width={100}
				/>
			)
		}

		x = gridConfig?.startCoords.x - gridConfig?.cellSize
		y = gridConfig?.startCoords.y - gridConfig?.cellSize

		for (let i = 0; i < horizontalLines; i++) {
			arr.push(
				<Text
					text={i.toString()}
					key={'horizontal__' + i}
					x={x}
					scaleY={-1}
					fill={'red'}
					y={(y += step)}
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
