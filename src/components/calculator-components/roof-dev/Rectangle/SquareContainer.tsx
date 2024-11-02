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
	selectedRectangleId: any
	setCalcResult: any
}

const SquareContainer: FC<Props> = ({
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

	const setNewSidesCallback = (sides: { width: number; height: number }) => {
		let side1 = (sides.width / gridConfig.cellSize).toFixed(2)
		let side2 = (sides.height / gridConfig.cellSize).toFixed(2)

		dispatch(
			changeFigureSides({
				...figureSides,
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
			{editedMode === 1 && <FullSquare />}

			{editedMode === 2 && (
				<TransformedSquareController
					setSelectedCallback={setSelectedRectangleIdCallback}
					selectedId={selectedRectangleId}
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
