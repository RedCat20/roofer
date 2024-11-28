import { useEffect, useState } from 'react'
import { useWindowSize } from './useWindowSize'

import {
	asideWidth,
	veryLargeBreakpoint,
	headerHeight,
	editBtnWrapper,
	mainMargin,
} from '../variables/style.vars.js'
import { useSelector } from 'react-redux'

export function useGridConfig() {
	const [width, height] = useWindowSize()

	const [gridConfig, setGridConfig] = useState(null)

	const { selectedScale } = useSelector((state: any) => state.settings)

	const defaultCellSize = 100
	const defaultStartX = 0

	let defaultGridConfig: any = {
		width: 0,
		height: 0,
		startCoords: [0, 0],
		cellSize: 0,
		step: 420 / 10,
		overlap: 150 / 10,
	}

	useEffect(() => {
		if (!width || !height) return

		const gridCellSize = defaultCellSize * selectedScale

		const gridWidht =
			width <= veryLargeBreakpoint
				? width - asideWidth - mainMargin * 2
				: veryLargeBreakpoint - asideWidth - mainMargin * 2

		const gridHeight = height - headerHeight - mainMargin * 2 - editBtnWrapper

		const gridStartX = defaultStartX + gridCellSize
		const gridStartY = gridHeight - (gridHeight % gridCellSize) - gridCellSize

		defaultGridConfig = {
			width: gridWidht,
			height: gridHeight,
			startCoords: [gridStartX, gridStartY],
			cellSize: gridCellSize,
			// в см
			blockWidth: (420 / 1000) * 100 * selectedScale,
			overlap: (150 / 1000) * 100 * selectedScale,
		}

		setGridConfig(defaultGridConfig)
	}, [width, height, selectedScale])

	return gridConfig
}
