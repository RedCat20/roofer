// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'
import FullTriangle from './FullTriangle'
import CoveredTriangle from './CoveredTriangle'
import TransformedTriangle from './TransformedTriangle'
import EditedPointedPolygon from './EditedPointedPolygon'
import { useSelector, useDispatch } from 'react-redux'

import {
	changeCustomPoints,
	changeFigurePoints,
	changeFigureSides,
} from '../../../../store/figureParamsSlice'

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
	const dispatch = useDispatch()
	const [trianglePoints, setTrianglePoints] = useState<any[]>([])

	function calcFigurePoints(points: any[]) {
		dispatch(changeFigurePoints(points))
	}

	const { dictionaries } = useSelector((state: any) => state.dictionaries)
	const { figureSides, figurePoints, customPoints } = useSelector(
		(state: any) => state.figureParams
	)

	const { editedMode, isBuildMode } = useSelector(
		(state: any) => state.settings
	)

	return (
		<>
			{editedMode === 1 && (
				<FullTriangle
					figureASide={figureSides.figureASide}
					figureBSide={figureSides.figureBSide}
					figureCSide={figureSides.figureCSide}
					calcFigurePoints={calcFigurePoints}
				/>
			)}

			{editedMode === 2 && (
				<TransformedTriangle
					setSelectedCallback={setSelectedTriangleId}
					selectedId={selectedTriangleId}
					polygonPoints={trianglePoints}
					selectedShapeName={selectedTriangleShapeName}
				/>
			)}

			{editedMode === 3 && <EditedPointedPolygon />}

			{editedMode === 4 && (
				<CoveredTriangle
					dictionaryItem={dictionaries?.[0]}
					setCalcResult={setCalcResult}
				/>
			)}
		</>
	)
}

export default TriangleContainer
