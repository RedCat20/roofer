// @ts-nocheck

import React, { FC, useContext, useEffect } from 'react'

import { Layer, Line, Text } from 'react-konva'
import { scalesConfig } from '../../../../data'
import { AppContext } from '../../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
	cellSize: number
	gridHeight: number
	gridHorizontalNumbers: number
	gridVerticalNumbers: number
}

const GridNumbers: FC<Props> = ({
	cellSize,
	gridHeight,
	gridHorizontalNumbers,
	gridVerticalNumbers,
}) => {
	const appContext = useContext(AppContext)
	const { selectedFigure, selectedScale } = useSelector(
		(state: any) => state.settings
	)

	function createCellNumber() {
		let step = cellSize

		let arr = []
		let x = 0
		let y = 0

		for (let i = 0; i < 50; i++) {
			x += step
			let newX = x
			arr.push(
				<Text
					text={i.toString()}
					key={1000 + i}
					x={newX}
					// offsetX={-appContext.state.gridConfig.cellSize}
					y={-gridHeight / scalesConfig[`${selectedScale}`] + 10}
					scaleY={-1}
					fill={'red'}
					width={100}
				/>
			)
		}

		for (let i = 0; i < 50; i++) {
			y += step
			let newY = y
			arr.push(
				<Text
					text={i.toString()}
					key={10000 + i}
					x={0}
					scaleY={-1}
					fill={'red'}
					y={-gridHeight / scalesConfig[`${selectedScale}`] + newY}
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
