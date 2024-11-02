// @ts-nocheck
import React, { FC, useContext, useEffect } from 'react'
import CanvasFullGrid from './CanvasFullGrid'
import CanvasSimpleGrid from './CanvasSimpleGrid'
import { AppContext } from '../../../../context/AppContext'
import { StageConsumer } from '../../../../context/StageConsumer'
import { useGridConfig } from '../../../../hooks/useGridConfig'
import { useWindowSize } from '../../../../hooks/useWindowSize'
import { useSelector, useDispatch } from 'react-redux'
import {
	asideWidth,
	veryLargeBreakpoint,
	mainPadding,
	roofPadding,
} from '../../../../variables/style.vars.js'
interface Props {}

const CanvasGridContainer: FC<Props> = () => {
	const gridConfig = useGridConfig()
	const { isBuildMode } = useSelector((state: any) => state.settings)

	// const gridWidht =
	// 	width <= veryLargeBreakpoint
	// 		? width - asideWidth - mainPadding * 2 - roofPadding * 2
	// 		: veryLargeBreakpoint - asideWidth - mainPadding * 2 - roofPadding * 2

	// const gridHeight =
	// 	(width <= veryLargeBreakpoint
	// 		? width - asideWidth - mainPadding * 2 - roofPadding * 2
	// 		: veryLargeBreakpoint - asideWidth - mainPadding * 2 - roofPadding * 2) /
	// 	2

	return (
		<>
			{/* {!isBuildMode && gridConfig && (
				<CanvasFullGrid
					cellSize={gridConfig.cellSize}
					gridHeight={gridHeight}
					gridHorizontalNumbers={gridConfig.gridHorizontalNumbers}
					gridVerticalNumbers={gridConfig.gridVerticalNumbers}
				/>
			)}
			{isBuildMode && gridConfig && (
				<CanvasSimpleGrid
					cellSize={gridConfig.cellSize}
					gridHeight={gridHeight}
					gridHorizontalNumbers={gridConfig.gridHorizontalNumbers}
					gridVerticalNumbers={gridConfig.gridVerticalNumbers}
				/>
			)} */}

			<CanvasSimpleGrid
			// cellSize={gridConfig.cellSize}
			// gridHeight={gridConfig.gridHeight}
			// gridHorizontalNumbers={gridConfig.gridWidth / gridConfig.cellSize}
			// gridVerticalNumbers={gridConfig.gridHeight / gridConfig.cellSize}
			/>
		</>
	)
}

export default CanvasGridContainer
