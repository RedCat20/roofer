import React, { FC, useContext, useEffect, useState } from 'react'
import FullSquare from './FullSquare'
import CoveredRectangle from '../Rectangle/CoveredRectangle'
import TransformedSquareController from './TransformedSquareController'
import { AppContext } from '../../../../context/AppContext'
import { ICoords } from '../../../../interfaces/coords'
import { useSelector, useDispatch } from 'react-redux'
import CoveredSquare from './CoveredSquare'
import { changeFigureSides } from '../../../../store/figureParamsSlice'

interface Props {
	setSelectedRectangleIdCallback: (id: any) => void
	// setNewSidesCallback: (points: any) => void
	selectedSquareId: any
	setCalcResult: any
}

const SquareContainer: FC<Props> = ({
	setSelectedRectangleIdCallback,
	// setNewSidesCallback,
	selectedSquareId,
	setCalcResult,
}) => {
	const appContext = useContext(AppContext)
	const dispatch = useDispatch();
	
	const { dictionaries } = useSelector((state: any) => state.dictionaries)
	const { figureSides } = useSelector((state: any) => state.figureParams)
	const { editedMode, isBuildMode } = useSelector(
		(state: any) => state.settings
	)

	const { gridConfig } = appContext.state

	const setNewSidesCallback = (sides: { width: number; height: number }) => {
		console.log('setNewSidesCallback', sides)
		let side1 = (sides.width / appContext.state.gridConfig.cellSize).toFixed(2)
		dispatch(changeFigureSides({
			figureASide: side1,
			figureBSide: 0,
		}))
		debugger
	}

	return (
		<>
			{editedMode === 1 &&
				!isBuildMode && ( // || // (editedMode === 4 && isBuildMode))
					<FullSquare
						width={figureSides.figureASide}
						startCoords={appContext.state.gridConfig.startCoords}
						cellSize={appContext.state.gridConfig.cellSize}
						gridHeight={appContext.state.gridConfig.height}
					/>
				)}

			{editedMode === 2 && !isBuildMode && (
				<TransformedSquareController
					figureWidth={figureSides.figureASide}
					figureHeight={figureSides.figureASide}
					startCoords={appContext.state.gridConfig.startCoords}
					cellSize={appContext.state.gridConfig.cellSize}
					setSelectedCallback={setSelectedRectangleIdCallback}
					selectedId={selectedSquareId}
					setNewSidesCallback={setNewSidesCallback}
					gridHeight={appContext.state.gridConfig.height}
				/>
			)}
			{editedMode === 4 && isBuildMode && (
				<CoveredSquare
					width={figureSides.figureASide}
					height={figureSides.figureASide}
					cellSize={gridConfig.cellSize}
					gridHeight={appContext.state.gridConfig.height}
					dictionaryItem={dictionaries?.[0]}
					setCalcResult={setCalcResult}
					startCoords={appContext.state.gridConfig.startCoords}
				/>
			)}
		</>
	)
}

export default SquareContainer
