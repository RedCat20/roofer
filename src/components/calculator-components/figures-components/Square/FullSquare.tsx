// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'
import { Rect, Layer } from 'react-konva'
import { ICoords } from '../../../../interfaces/coords'
import { scalesConfig } from '../../../../data'
import { useSelector, useDispatch } from 'react-redux'
import { useGridConfig } from '../../../../hooks/useGridConfig'

interface Props {
	width: number
	gridConfig: any
}

const FullSquare: FC<Props> = ({ width, gridConfig }) => {
	const { selectedScale } = useSelector((state: any) => state.settings)
	const { startCoords, cellSize } = gridConfig

	return (
		<Layer>
			<Rect
				x={startCoords.x}
				y={startCoords.y}
				width={width * cellSize}
				height={width * cellSize}
				// fill='gold'
				strokeWidth={2}
				stroke={'black'}
				opacity={1}
			/>
		</Layer>
	)
}

export default FullSquare
