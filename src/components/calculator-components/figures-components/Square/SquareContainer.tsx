// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'
import FullSquare from './FullSquare'
import CoveredRectangle from '../Rectangle/CoveredRectangle'
import TransformedSquareController from './TransformedSquareController'
import { ICoords } from '../../../../interfaces/coords'
import { useSelector, useDispatch } from 'react-redux'
import CoveredSquare from './CoveredSquare'
import { changeFigureSides } from '../../../../store/figureParamsSlice'
import { useGridConfig } from '../../../../hooks/useGridConfig'
import { Layer, Text } from 'react-konva'

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
	const gridConfig = useGridConfig()
	const dispatch = useDispatch()

	const { dictionaries } = useSelector((state: any) => state.dictionaries)
	const { figureSides } = useSelector((state: any) => state.figureParams)
	const { editedMode, isBuildMode } = useSelector(
		(state: any) => state.settings
	)

	const setNewSidesCallback = (sides: { width: number; height: number }) => {
		let side1 = (sides.width / gridConfig.cellSize).toFixed(2)
		dispatch(
			changeFigureSides({
				figureASide: side1,
				figureBSide: 0,
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
				<FullSquare gridConfig={gridConfig} width={figureSides.figureASide} />
			)}

			{editedMode === 2 && !isBuildMode && (
				<TransformedSquareController
					figureWidth={figureSides.figureASide}
					figureHeight={figureSides.figureASide}
					gridConfig={gridConfig}
					
					setSelectedCallback={setSelectedRectangleIdCallback}
					selectedId={selectedSquareId}
					setNewSidesCallback={setNewSidesCallback}
				/>
			)}
			{editedMode === 4 && isBuildMode && dictionaries?.length && (
				<CoveredSquare
					width={figureSides.figureASide}
					height={figureSides.figureASide}
					gridConfig={gridConfig}
					dictionaryItem={dictionaries?.[0]}
					setCalcResult={setCalcResult}
				/>
			)}
		</>
	)
}

export default SquareContainer
