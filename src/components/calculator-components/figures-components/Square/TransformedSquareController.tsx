// @ts-nocheck

import React, { FC, useContext, useEffect } from 'react'
import { Layer } from 'react-konva'
import { ICoords } from '../../../../interfaces/coords'
import TransformedSquare from './TransformedSquare'
import { scalesConfig } from '../../../../data'
import { AppContext } from '../../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'
import { useGridConfig } from '../../../../hooks/useGridConfig'

interface Props {
	figureWidth: number
	figureHeight: number
	setSelectedCallback: (id: any) => void
	selectedId: any
	setNewSidesCallback: (sides: any) => void
	gridConfig: any
}

const TransformedSquareController: FC<Props> = ({
	figureWidth,
	figureHeight,
	setSelectedCallback,
	selectedId,
	setNewSidesCallback,
}) => {
	const gridConfig = useGridConfig()

	const appContext = useContext(AppContext)
	const { selectedScale } = useSelector((state: any) => state.settings)

	let selectShapeHandler = (id: any) => {
		setSelectedCallback(id)
	}

	const [rectangles, setRectangles] = React.useState([])

	useEffect(() => {
		if (!selectedScale || !gridConfig) return

		const { startCoords, cellSize, height: gridHeight } = gridConfig

		setRectangles([
			{
				x: startCoords.x,
				y: startCoords.y,
				width: figureWidth * cellSize,
				height: figureHeight * cellSize,
				fill: 'rgba(139, 69, 19, 0.3)',
				stroke: 'rgba(139, 69, 19, 1)',
				id: 'square1',
			},
		])
	}, [selectedScale, gridConfig])

	return (
		<Layer>
			{rectangles.map((rect, i) => {
				return (
					<TransformedSquare
						key={'square_' + i}
						shapeProps={rect}
						isSelected={rect.id === selectedId}
						onSelect={() => {
							// @ts-ignore
							selectShapeHandler(rect.id)
						}}
						onChange={(newAttrs: any) => {
							console.log('onChange newAttrs', newAttrs)
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
