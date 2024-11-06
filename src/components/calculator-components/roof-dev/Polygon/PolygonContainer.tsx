import React, { FC, useContext, useEffect, useState } from 'react'

import { AppContext } from '../../../../context/AppContext'

import EditedPointedPolygon from './EditedPointedPolygon'
import CreativePointedPolygon from './CreativePointedPolygon'
import TransformedPolygon from './TransformedPolygon'
import CoveredPolygon from './CoveredPolygon'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
	clickedCoords: any
	polygonCoords: any[] | null
	setSelectedPolygonId: (id: any) => void
	setNewSidesCallback: (points: any) => void
	calcPolygonPointsCallback: (points: any[]) => void
	//  selectedPolygonId: (id: any) => void;
	selectedPolygonId: any
	selectedPolygonShapeName: any
	setCalcResult: any
}

const PolygonContainer: FC<Props> = ({
	// clickedCoords,
	// polygonCoords,
	// calcPolygonPointsCallback,
	// setSelectedPolygonId,
	// setNewSidesCallback,
	// selectedPolygonId,
	// selectedPolygonShapeName,
	setCalcResult,
}) => {
	// const appContext = useContext(AppContext)
	const { dictionaries } = useSelector((state: any) => state.dictionaries)
	const { figureSides, figurePoints, customPoints } = useSelector(
		(state: any) => state.figureParams
	)

	// const {
	// 	selectedFigure,
	// 	editedMode,
	// 	isBuildMode,
	// 	figureSides,
	// 	gridConfig,
	// 	dictionary,
	// } = appContext.state

	const [polygonPoints, setPolygonPoints] = useState<any[]>([...customPoints])
	// const [flagToRerender, setFlagToRerender] = useState(false)

	// function calcFigurePoints(points: any[]) {
	// 	console.log('points', points)
	// 	setPolygonPoints(points)
	// }

	// React.useEffect(() => {
	// 	if (clickedCoords !== null) {
	// 		//alert('clicked coords');
	// 		let pointsCopy: any = []
	// 		for (let i = 0; i < polygonPoints.length; i++) {
	// 			pointsCopy[i] = polygonPoints[i]
	// 		}
	// 		pointsCopy.push(clickedCoords)
	// 		setPolygonPoints(pointsCopy)
	// 	}
	// }, [clickedCoords])

	// React.useEffect(() => {
	// 	if (polygonCoords && polygonCoords?.length > 0) {
	// 		setPolygonPoints(polygonCoords)
	// 	}
	// }, [polygonCoords])

	const { editedMode, isBuildMode } = useSelector(
		(state: any) => state.settings
	)

	console.log('customPoints', customPoints)

	return (
		<>
			{editedMode === 1 && (
				<CreativePointedPolygon
					customPoints={customPoints}
					// calcPolygonPointsCallback={calcFigurePoints}
				/>
			)}

			{/* {editedMode === 2 && (
				<TransformedPolygon
					setSelectedCallback={setSelectedPolygonId}
					selectedId={selectedPolygonId}
					polygonPoints={polygonPoints}
					selectedShapeName={selectedPolygonShapeName}
				/>
			)}*/}

			{editedMode === 3 && (
				<EditedPointedPolygon
					// calcPolygonPointsCallback={calcFigurePoints}
					customPoints={customPoints}
				/>
			)}

			{editedMode === 4 && (
				<CoveredPolygon
					dictionaryItem={dictionaries?.[0]}
					// coords={polygonPoints}
					// gridHeight={appContext.state.gridConfig.height}
					// cellSize={appContext.state.gridConfig.cellSize}
					// startCoords={appContext.state.gridConfig.startCoords}
					// dictionaryItem={dictionaries?.[0]}
					setCalcResult={setCalcResult}
				/>
			)}
		</>
	)
}

export default PolygonContainer
