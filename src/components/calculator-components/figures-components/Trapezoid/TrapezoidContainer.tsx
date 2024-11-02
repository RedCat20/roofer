// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'
import FullTrapezoid from './FullTrapezoid'
import CoveredTrapezoid from './CoveredTrapezoid'
import TransformedTrapezoid from './TransformedTrapezoid'
import { AppContext } from '../../../../context/AppContext'
import { ICoords } from '../../../../interfaces/coords'
import { useSelector, useDispatch } from 'react-redux'
import { useGridConfig } from '../../../../hooks/useGridConfig'
import { Layer, Text } from 'react-konva'
import { changeFigureSides } from '../../../../store/figureParamsSlice'

import EditedPointedPolygon from './EditedPointedPolygon'
import { scaledCells } from '../../../../variables/grid.vars'

interface Props {
	setSelectedTrapezoidIdCallback: (id: any) => void
	setNewSidesCallback: (points: any) => void
	selectedTrapezoidId: any
	calcTrapezoidPointsCallback: (points: any[]) => void
	setSelectedTrapezoidId: (id: any) => void
	selectedTrapezoidShapeName: any

	setCalcResult: any
}

const TrapezoidContainer: FC<Props> = ({
	calcTrapezoidPointsCallback,
	setSelectedTrapezoidIdCallback,
	setNewSidesCallback,
	selectedTrapezoidId,
	setSelectedTrapezoidId,
	selectedTrapezoidShapeName,
	setCalcResult,
}) => {
	const dispatch = useDispatch()
	const { selectedScale } = useSelector((state: any) => state.settings)

	// const appContext = useContext(AppContext)
	// const { dictionaries } = useSelector((state: any) => state.dictionaries)

	// const {
	// 	selectedFigure,
	// 	editedMode,
	// 	isBuildMode,
	// 	figureSides,
	// 	gridConfig,
	// 	dictionary,
	// } = appContext.state

	const [trapezoidPoints, setTrapezoidPoints] = useState<any[]>([])
	const [startPoints, setStartPoints] = useState<any[]>([])
	const [isSetupStartPoints, setIsSetupStartPoints] = useState(false)

	useEffect(() => {}, [])

	function calcFigurePoints(points: any[]) {
		setTrapezoidPoints([...points])
		if (!isSetupStartPoints) {
			setStartPoints([...points])
			setIsSetupStartPoints(true)
		}
	}

	useEffect(() => {
		if (!trapezoidPoints?.length) return

		// const length = scaledCells[selectedScale];

		const defaultCellSize = 100

		const setupCellSize = gridConfig?.cellSize - 10

		const k = setupCellSize / defaultCellSize

		console.log('k', k)

		console.log(
			'new points: ',
			{ x: startPoints[0].x * k, y: startPoints[0].y * k },
			{ x: startPoints[1].x * k, y: startPoints[1].y * k },
			{ x: startPoints[2].x * k, y: startPoints[2].y * k },
			{ x: startPoints[3].x * k, y: startPoints[3].y * k }
		)

		let figureBottomLine = gridConfig?.startCoords?.y * k

		const result = trapezoidPoints.reduce((a, b) => {
			return a.y < b.y ? a : b
		})

		let i = -1 * figureBottomLine - -1 * result.y

		setTrapezoidPoints([
			{ x: startPoints[0].x * k, y: startPoints[0].y - i },
			{ x: startPoints[1].x * k, y: startPoints[1].y - i },
			{ x: startPoints[2].x * k, y: startPoints[2].y - i },
			{ x: startPoints[3].x * k, y: startPoints[3].y - i },
		])

		console.log(selectedScale)
	}, [selectedScale])

	// useEffect(() => {
	// 	// console.log('trapezoidPoints: ', trapezoidPoints)
	// }, [trapezoidPoints])

	const appContext = useContext(AppContext)

	const { dictionaries } = useSelector((state: any) => state.dictionaries)
	const { figureSides } = useSelector((state: any) => state.figureParams)
	const { editedMode, isBuildMode } = useSelector(
		(state: any) => state.settings
	)

	const gridConfig = useGridConfig()

	if (!gridConfig)
		return (
			<Layer>
				<Text text='Loading...'></Text>
			</Layer>
		)

	return (
		<>
			{editedMode === 1 && !isBuildMode && (
				<FullTrapezoid
					figureASide={figureSides.figureASide}
					figureBSide={figureSides.figureBSide}
					figureCSide={figureSides.figureCSide}
					figureDSide={figureSides.figureDSide}
					figureHSide={figureSides.figureHSide}
					gridConfig={gridConfig}
					calcTrapezoidPointsCallback={calcFigurePoints}
				/>
			)}

			{editedMode === 2 && !isBuildMode && (
				<TransformedTrapezoid
					trapezoidPoints={trapezoidPoints}
					selectedShapeName={selectedTrapezoidShapeName}
					setNewSidesCallback={setNewSidesCallback}
					// cellSize={appContext.state.gridConfig.cellSize}
				/>
			)}

			{editedMode === 3 && !isBuildMode && (
				<EditedPointedPolygon
					calcPolygonPointsCallback={calcFigurePoints}
					coords={trapezoidPoints}
					setNewSidesCallback={setNewSidesCallback}
				/>
			)}

			{editedMode === 4 && isBuildMode && dictionaries?.length && (
				<CoveredTrapezoid
					coords={trapezoidPoints}
					gridConfig={gridConfig}
					// gridHeight={appContext.state.gridConfig.height}
					// cellSize={appContext.state.gridConfig.cellSize}
					dictionaryItem={dictionaries?.[0]}
					figureASide={figureSides.figureASide}
					figureBSide={figureSides.figureBSide}
					figureCSide={figureSides.figureCSide}
					figureDSide={figureSides.figureDSide}
					figureHSide={figureSides.figureHSide}
					setCalcResult={setCalcResult}
				/>
			)}
		</>
	)
}

export default TrapezoidContainer
