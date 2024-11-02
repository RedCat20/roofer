import { useEffect, useContext, useState, useLayoutEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { IGridConfig } from '../interfaces/grid-config-interface'
import { gridParams } from '../data'
import { useWindowSize } from './useWindowSize'

import { scaledCells } from '../variables/grid.vars'

import {
	asideWidth,
	veryLargeBreakpoint,
	mainPadding,
	roofPadding,
	headerHeight,
	footerHeight,
	editBtnWrapper,
} from '../variables/style.vars.js'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedScale } from '../store/settingSlice'

export function useGridConfig() {
	const [width, height] = useWindowSize()

	const [gridConfig, setGridConfig] = useState(null)

	const dispatch = useDispatch()
	const { selectedScale } = useSelector((state: any) => state.settings)

	const defaultCellSize = 100
	const defaultStartX = 0
	const defaultStartY = 0

	let defaultGridConfig: any = {
		width: 0,
		height: 0,
		startCoords: [0, 0],
		cellSize: 0,
		step: 420 / 10,
		overlap: 150 / 10,
	}

	// useEffect(() => {
	// 	dispatch(setSelectedScale(0.5))
	// }, [setSelectedScale])

	useEffect(() => {
		if (!width || !height) return

		const gridCellSize = defaultCellSize * selectedScale

		const gridWidht =
			width <= veryLargeBreakpoint
				? width - asideWidth
				: veryLargeBreakpoint - asideWidth

		// const gridHeight =
		// 	Math.floor((height - headerHeight) / gridCellSize - 1) * defaultCellSize
		const gridHeight = height - headerHeight - editBtnWrapper

		const gridStartX = defaultStartX + gridCellSize
		const gridStartY = gridHeight - (gridHeight % gridCellSize) - gridCellSize

		defaultGridConfig = {
			width: gridWidht,
			height: gridHeight,
			startCoords: [gridStartX, gridStartY],
			cellSize: gridCellSize,
			// в см
			blockWidth: 420 / 1000 * 100 * selectedScale,
			overlap: 150 / 1000 * 100 * selectedScale,
		}

		setGridConfig(defaultGridConfig)
	}, [width, height, selectedScale])

	return gridConfig
}
