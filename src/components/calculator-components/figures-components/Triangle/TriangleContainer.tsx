import React, { FC, useContext, useEffect, useState } from 'react'
import FullTriangle from './FullTriangle'
import CoveredTriangle from './CoveredTriangle'
import TransformedTriangle from './TransformedTriangle'
import { AppContext } from '../../../../context/AppContext'
import EditedPointedPolygon from './EditedPointedPolygon'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
	setSelectedTriangleIdCallback: (id: any) => void
	setNewSidesCallback: (points: any) => void
	selectedTriangleId: any
	calcTrianglePointsCallback: (points: any[]) => void
	setSelectedTriangleId: (id: any) => void
	selectedTriangleShapeName: any
	setCalcResult: any
}

const TriangleContainer: FC<Props> = ({
	setSelectedTriangleIdCallback,
	setNewSidesCallback,
	selectedTriangleId,
	calcTrianglePointsCallback,
	setSelectedTriangleId,
	selectedTriangleShapeName,
	setCalcResult,
}) => {
	const appContext = useContext(AppContext)

	const [trianglePoints, setTrianglePoints] = useState<any[]>([])

	function calcFigurePoints(points: any[]) {
		setTrianglePoints(points)
	}

	const { dictionaries } = useSelector((state: any) => state.dictionaries)
	const { figureSides } = useSelector((state: any) => state.figureParams)
	const { editedMode, isBuildMode } = useSelector(
		(state: any) => state.settings
	)

	const { gridConfig } = appContext.state

	return (
		<>
			{editedMode === 1 && !isBuildMode && (
				<FullTriangle
					figureASide={figureSides.figureASide}
					figureBSide={figureSides.figureBSide}
					figureCSide={figureSides.figureCSide}
					startCoords={appContext.state.gridConfig.startCoords}
					cellSize={appContext.state.gridConfig.cellSize}
					gridHeight={appContext.state.gridConfig.height}
					calcTrianglePointsCallback={calcFigurePoints}
				/>
			)}

			{editedMode === 2 && !isBuildMode && (
				<TransformedTriangle
					setSelectedCallback={setSelectedTriangleId}
					selectedId={selectedTriangleId}
					polygonPoints={trianglePoints}
					selectedShapeName={selectedTriangleShapeName}
				/>
			)}

			{editedMode === 3 && !isBuildMode && (
				<EditedPointedPolygon
					calcPolygonPointsCallback={calcFigurePoints}
					coords={trianglePoints}
					cellSize={appContext.state.gridConfig.cellSize}
					gridHeight={appContext.state.gridConfig.height}
				/>
			)}

			{editedMode === 4 && isBuildMode && (
				<CoveredTriangle
					figureASide={figureSides.figureASide}
					figureBSide={figureSides.figureBSide}
					figureCSide={figureSides.figureCSide}
					setCalcResult={setCalcResult}
					startCoords={appContext.state.gridConfig.startCoords}
					coords={trianglePoints}
					gridHeight={appContext.state.gridConfig.height}
					cellSize={appContext.state.gridConfig.cellSize}
					dictionaryItem={dictionaries?.[0]}
				/>
			)}
		</>
	)
}

export default TriangleContainer
