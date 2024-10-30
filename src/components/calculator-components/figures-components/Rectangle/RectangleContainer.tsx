import React, { FC, useContext } from 'react'
import FullRectangle from './FullRectangle'
import CoveredRectangle from './CoveredRectangle'
import TransformedRectangleController from './TransformedRectangleController'
import { AppContext } from '../../../../context/AppContext'
import { ICoords } from '../../../../interfaces/coords'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
	setSelectedRectangleIdCallback: (id: any) => void
	setNewSidesCallback: (points: any) => void
	selectedRectangleId: any
	setCalcResult: any
}

const RectangleContainer: FC<Props> = ({
	setSelectedRectangleIdCallback,
	setNewSidesCallback,
	selectedRectangleId,
	setCalcResult,
}) => {
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
				<FullRectangle
					width={figureSides.figureASide}
					height={figureSides.figureBSide}
					startCoords={appContext.state.gridConfig.startCoords}
					cellSize={appContext.state.gridConfig.cellSize}
					gridHeight={appContext.state.gridConfig.height}
				/>
			)}
			{editedMode === 2 && !isBuildMode && (
				<TransformedRectangleController
					figureWidth={figureSides.figureASide}
					figureHeight={figureSides.figureBSide}
					startCoords={appContext.state.gridConfig.startCoords}
					cellSize={appContext.state.gridConfig.cellSize}
					setSelectedCallback={setSelectedRectangleIdCallback}
					selectedId={selectedRectangleId}
					setNewSidesCallback={setNewSidesCallback}
					gridHeight={appContext.state.gridConfig.height}
				/>
			)}
			{editedMode === 4 && isBuildMode && (
				<CoveredRectangle
					width={figureSides.figureASide}
					height={figureSides.figureBSide}
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

export default RectangleContainer
