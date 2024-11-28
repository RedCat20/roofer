// @ts-nocheck

import { FC, useContext, useEffect, useState } from 'react'
import { Layer } from 'react-konva'
import { ICoords } from '../../../../interfaces/coords'
import TransformedSquare from './TransformedSquare'
import { scalesConfig } from '../../../../data'
import { useSelector, useDispatch } from 'react-redux'
import { useGridConfig } from '../../../../hooks/useGridConfig'

interface Props {
	setSelectedCallback: (id: any) => void
	selectedId: any
	setNewSidesCallback: (sides: any) => void
}

const TransformedSquareController: FC<Props> = ({
	setSelectedCallback,
	selectedId,
	setNewSidesCallback,
}) => {
	let selectShapeHandler = (id: any) => {
		setSelectedCallback(id)
	}

	const gridConfig = useGridConfig()
	const { selectedScale } = useSelector((state: any) => state.settings)
	const {
		figureSides: { figureASide },
	} = useSelector((state: any) => state.figureParams)

	const [rectangles, setRectangles] = useState([])

	useEffect(() => {
		if (!gridConfig) return

		const { height: gridHeight, startCoords, cellSize } = gridConfig

		setRectangles([
			{
				x: startCoords?.[0],
				y: startCoords?.[1] - figureASide * cellSize,
				width: figureASide * cellSize,
				height: figureASide * cellSize,
				fill: 'rgba(139, 69, 19, 0.3)',
				stroke: 'rgba(139, 69, 19, 1)',
				id: 'square1',
			},
		])
	}, [gridConfig, figureASide])

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
