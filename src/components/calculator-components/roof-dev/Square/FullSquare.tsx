// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Rect, Layer } from 'react-konva'
import { useGridConfig } from '../../../../hooks/useGridConfig'

interface Props {}

const FullSquare: FC<Props> = ({}) => {
	const gridConfig = useGridConfig()
	const { selectedScale } = useSelector((state: any) => state.settings)
	const {
		figureSides: { figureASide },
	} = useSelector((state: any) => state.figureParams)

	return (
		<Layer>
			<Rect
				x={gridConfig?.startCoords?.[0]}
				y={gridConfig?.startCoords?.[1] - figureASide * gridConfig?.cellSize}
				width={figureASide * gridConfig?.cellSize}
				height={figureASide * gridConfig?.cellSize}
				fill='rgba(255,255,0,0.2)'
				strokeWidth={2}
				stroke={'black'}
				opacity={1}
			/>
		</Layer>
	)
}

export default FullSquare
