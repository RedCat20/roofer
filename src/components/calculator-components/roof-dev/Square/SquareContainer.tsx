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
	setSelectedSquareIdCallback: (id: any) => void
	selectedSquareId: any
	setCalcResult: any
}

const SquareContainer: FC<Props> = ({
	setSelectedSquareIdCallback,
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
		let side = (sides.width / gridConfig.cellSize).toFixed(2)
		dispatch(
			changeFigureSides({
				...figureSides,
				figureASide: side,
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
			{editedMode === 1 && <FullSquare />}

			{editedMode === 2 && (
				<TransformedSquareController
					setSelectedCallback={setSelectedSquareIdCallback}
					selectedId={selectedSquareId}
					setNewSidesCallback={setNewSidesCallback}
				/>
			)}
			{editedMode === 4 && dictionaries?.length && (
				<CoveredSquare
					dictionaryItem={dictionaries?.[0]}
					setCalcResult={setCalcResult}
				/>
			)}
		</>
	)
}

export default SquareContainer
