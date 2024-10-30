// @ts-nocheck

import React, { FC, useContext, useEffect } from 'react'
import { Layer } from 'react-konva'
import { ICoords } from '../../../../interfaces/coords'
import TransformedSquare from './TransformedSquare'
import { scalesConfig } from '../../../../data'
import { AppContext } from '../../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
	figureWidth: number
	figureHeight: number
	startCoords: ICoords
	cellSize: number
	setSelectedCallback: (id: any) => void
	selectedId: any
	setNewSidesCallback: (sides: any) => void
	gridHeight: number
}

const TransformedSquareController: FC<Props> = ({
	figureWidth,
	figureHeight,
	startCoords,
	cellSize,
	setSelectedCallback,
	selectedId,
	setNewSidesCallback,
	gridHeight,
}) => {
	const appContext = useContext(AppContext)
	let figureBottomLine = Math.floor(gridHeight / cellSize) * cellSize
	const { selectedScale } = useSelector((state: any) => state.settings)

	let selectShapeHandler = (id: any) => {
		setSelectedCallback(id)
	}

	const currentFigure = [
		{
			x: startCoords.x,
			y: Math.floor(gridHeight / cellSize) * cellSize - figureWidth * cellSize,
			width: figureWidth * cellSize,
			height: figureHeight * cellSize,
			fill: 'rgba(139, 69, 19, 0.3)',
			stroke: 'rgba(139, 69, 19, 1)',
			id: 'rectangle2',
		},
	]

	useEffect(() => {
		setRectangles([
			{
				x: startCoords.x,
				y: -gridHeight / scalesConfig[`${selectedScale}`] + cellSize,
				width: figureWidth * cellSize,
				height: figureHeight * cellSize,
				fill: 'rgba(139, 69, 19, 0.3)',
				stroke: 'rgba(139, 69, 19, 1)',
				id: 'rectangle2',
			},
		])
	}, [selectedScale])

	const [rectangles, setRectangles] = React.useState(currentFigure)

	return (
		<Layer>
			{rectangles.map((rect, i) => {
				return (
					<TransformedSquare
						key={i}
						shapeProps={rect}
						isSelected={rect.id === selectedId}
						onSelect={() => {
							// @ts-ignore
							selectShapeHandler(rect.id)
						}}
						onChange={(newAttrs: any) => {
							setNewSidesCallback(newAttrs)
							const rects = rectangles.slice()
							rects[i] = newAttrs
							setRectangles(rects)
						}}
					/>
				)
			})}
		</Layer>
	)
}

export default TransformedSquareController
