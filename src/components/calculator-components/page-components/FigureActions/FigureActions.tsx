// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'

import styles from './FigureActions.module.scss'
import { FIGURES } from '../../../../enums/figure.enum'
import { IGridConfig } from '../../../../interfaces/grid-config-interface'
import { gridParams, scalesConfig } from '../../../../data'
import AddPointsDialog from '../../../dictionary-components/Dialogs/AddPointsDialog'
import { FiguresInputs } from './FiguresInputs/FiguresInputs'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedScale } from '../../../../store/settingSlice'

interface Props {}

const FigureActions: FC<Props> = ({}) => {
	const dispatch = useDispatch()
	const { selectedFigure } = useSelector((state: any) => state.settings)

	const { figureSides } = useSelector((state: any) => state.figureParams)
	const { selectedScale } = useSelector((state: any) => state.settings)

	/// Functional buttons

	function calcFigureBtnHandler(e: any) {
		if (e.target.value > 200) return

		if (selectedScale) {
			const width = window.innerWidth

			let defaultGridConfig: IGridConfig | null = null

			let createdScale = `scale${selectedScale + 1}`

			dispatch(setSelectedScale(selectedScale + 1))
		}
	}

	const [isAddPointsDialog, setIsAddPointsDialog] = useState<Boolean>(false)

	const [activeTab, setActiveTab] = useState(
		selectedFigure !== FIGURES.Polygon ? 1 : 2
	)

	/// Render

	return (
		<>
			<div className={styles.container}>
				<div className={styles.tabs}>
					<div className={styles.figureButtons}>
						<button
							className={activeTab === 1 ? styles.active : ''}
							onClick={e => {
								setActiveTab(1)
							}}
						>
							By sides
						</button>
					</div>
					<div className={styles.figureButtons}>
						<button
							className={activeTab === 2 ? styles.active : ''}
							onClick={() => {
								setActiveTab(2)
							}}
						>
							By points
						</button>
					</div>
				</div>
				{activeTab === 1 && <FiguresInputs />}

				{activeTab === 2 && (
					<>
						<AddPointsDialog />
					</>
				)}
			</div>
		</>
	)
}

export default FigureActions
