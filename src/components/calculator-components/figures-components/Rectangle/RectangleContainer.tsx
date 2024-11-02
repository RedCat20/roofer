// @ts-nocheck

import React, { FC, useContext } from 'react'
import FullRectangle from './FullRectangle'
import CoveredRectangle from './CoveredRectangle'
import TransformedRectangleController from './TransformedRectangleController'
import { AppContext } from '../../../../context/AppContext'
import { ICoords } from '../../../../interfaces/coords'
import { useSelector, useDispatch } from 'react-redux'
import { changeFigureSides } from '../../../../store/figureParamsSlice'
import { useGridConfig } from '../../../../hooks/useGridConfig'
import { Layer, Text } from 'react-konva'

interface Props {
	setSelectedRectangleIdCallback: (id: any) => void
	selectedRectangleId: any
	setCalcResult: any
}

const RectangleContainer: FC<Props> = ({
	setSelectedRectangleIdCallback,
	selectedRectangleId,
	setCalcResult,
}) => {
	const gridConfig = useGridConfig()
	const dispatch = useDispatch()

	const { dictionaries } = useSelector((state: any) => state.dictionaries)
	const { figureSides } = useSelector((state: any) => state.figureParams)
	const { editedMode, isBuildMode } = useSelector(
		(state: any) => state.settings
	)

	const appContext = useContext(AppContext)

	const setNewSidesCallback = (sides: { width: number; height: number }) => {
		let side1 = (sides.width / gridConfig.cellSize).toFixed(2)
		let side2 = (sides.height / gridConfig.cellSize).toFixed(2)

		dispatch(
			changeFigureSides({
				figureASide: side1,
				figureBSide: side2,
			})
		)
	}

	if (!gridConfig)
		return (
			<Layer>
				<Text text='Loading...'></Text>
			</Layer>
		)

	return (
		<>
			{editedMode === 1 && !isBuildMode && (
				<FullRectangle
					width={figureSides.figureASide}
					height={figureSides.figureBSide}
					gridConfig={gridConfig}
				/>
			)}
			{editedMode === 2 && !isBuildMode && (
				<TransformedRectangleController
					figureWidth={figureSides.figureASide}
					figureHeight={figureSides.figureBSide}
					gridConfig={gridConfig}

					setSelectedCallback={setSelectedRectangleIdCallback}
					selectedId={selectedRectangleId}
					setNewSidesCallback={setNewSidesCallback}
				/>
			)}
			{editedMode === 4 && isBuildMode && dictionaries?.length && (
				<CoveredRectangle
					width={figureSides.figureASide}
					height={figureSides.figureBSide}
					gridConfig={gridConfig}
					dictionaryItem={dictionaries?.[0]}
					setCalcResult={setCalcResult}
				/>
			)}
		</>
	)
}

export default RectangleContainer
