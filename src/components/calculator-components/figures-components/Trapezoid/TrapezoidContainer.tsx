import React, { FC, useContext, useEffect, useState } from 'react'
import FullTrapezoid from './FullTrapezoid'
import CoveredTrapezoid from './CoveredTrapezoid'
import TransformedTrapezoid from './TransformedTrapezoid'
import { AppContext } from '../../../../context/AppContext'
import { ICoords } from '../../../../interfaces/coords'
import { useSelector, useDispatch } from 'react-redux'

import EditedPointedPolygon from './EditedPointedPolygon'
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

	function calcFigurePoints(points: any[]) {
		setTrapezoidPoints([...points])
	}

	// useEffect(() => {
	// 	// console.log('trapezoidPoints: ', trapezoidPoints)
	// }, [trapezoidPoints])

	const appContext = useContext(AppContext)

	const { dictionaries } = useSelector((state: any) => state.dictionaries)
	const { figureSides } = useSelector((state: any) => state.figureParams)
	const { editedMode, isBuildMode } = useSelector(
		(state: any) => state.settings
	)

	const { gridConfig } = appContext.state

	return (
		<>
			{editedMode === 1 && !isBuildMode && (
				<FullTrapezoid
					figureASide={figureSides.figureASide}
					figureBSide={figureSides.figureBSide}
					figureCSide={figureSides.figureCSide}
					figureDSide={figureSides.figureDSide}
					startCoords={appContext.state.gridConfig.startCoords}
					cellSize={appContext.state.gridConfig.cellSize}
					gridHeight={appContext.state.gridConfig.height}
					calcTrapezoidPointsCallback={calcFigurePoints}
				/>
			)}

			{editedMode === 2 && !isBuildMode && (
				<TransformedTrapezoid
					trapezoidPoints={trapezoidPoints}
					selectedShapeName={selectedTrapezoidShapeName}
					setNewSidesCallback={setNewSidesCallback}
					cellSize={appContext.state.gridConfig.cellSize}
				/>
			)}

			{editedMode === 3 && !isBuildMode && (
				<EditedPointedPolygon
					calcPolygonPointsCallback={calcFigurePoints}
					coords={trapezoidPoints}
					cellSize={appContext.state.gridConfig.cellSize}
					gridHeight={appContext.state.gridConfig.height}
				/>
			)}

			{editedMode === 4 && isBuildMode && (
				<CoveredTrapezoid
					coords={trapezoidPoints}
					gridHeight={appContext.state.gridConfig.height}
					cellSize={appContext.state.gridConfig.cellSize}
					dictionaryItem={dictionaries?.[0]}
					figureASide={figureSides.figureASide}
					figureBSide={figureSides.figureBSide}
					figureCSide={figureSides.figureCSide}
					figureDSide={figureSides.figureDSide}
					setCalcResult={setCalcResult}
				/>
			)}
		</>
	)
}

export default TrapezoidContainer
