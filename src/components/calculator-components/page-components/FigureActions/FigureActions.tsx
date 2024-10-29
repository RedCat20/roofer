import React, { FC, useContext, useEffect, useState } from 'react'

import styles from './FigureActions.module.scss'
import { AppContext } from '../../../../context/AppContext'
import { FIGURES } from '../../../../enums/figure.enum'
import { IGridConfig } from '../../../../interfaces/grid-config-interface'
import { gridParams, scalesConfig } from '../../../../data'
import AddPointsDialog from '../../../dictionary-components/Dialogs/AddPointsDialog'
import { FiguresInputs } from './FiguresInputs/FiguresInputs'
import { useSelector, useDispatch } from 'react-redux'

interface Props {}

const FigureActions: FC<Props> = ({}) => {
	const appContext = useContext(AppContext)
	const dispatch = useDispatch()
	const { selectedFigure } = useSelector((state: any) => state.settings)

	const { figureSides } = useSelector((state: any) => state.figureParams)
	const { editedMode } = useSelector((state: any) => state.settings)

	// function onChangeFigureASideHandler(e: any) {
	// 	dispatch(
	// 		changeFigureSides({
	// 			figureASide: e.target.value,
	// 		})
	// 	)
	// }

	// function onChangeFigureBSideHandler(e: any) {
	// 	changeFigureSides({
	// 		figureBSide: e.target.value,
	// 	})
	// }

	// function onChangeFigureCSideHandler(e: any) {
	// 	changeFigureSides({
	// 		figureCSide: e.target.value,
	// 	})
	// }

	// function onChangeFigureDSideHandler(e: any) {
	// 	changeFigureSides({
	// 		figureDSide: e.target.value,
	// 	})
	// }

	/// Functional buttons

	function calcFigureBtnHandler(e: any) {
		if (e.target.value > 200) return

		if (
			e.target.value >=
			Math.floor(
				appContext?.state?.gridConfig?.height /
					appContext?.state?.gridConfig?.cellSize
			)
		) {
			const width = window.innerWidth

			let defaultGridConfig: IGridConfig | null = null

			let createdScale = `scale${appContext.state.selectedScale + 1}`

			appContext.dispatch({
				type: 'set-selected-scale',
				payload: { selectedScale: appContext.state.selectedScale + 1 },
			})

			if (width >= 1920) {
				defaultGridConfig = gridParams.size1[createdScale]
			} else if (width < 1920 && width >= 1366) {
				defaultGridConfig = gridParams.size2[createdScale]
			} else if (width < 1366 && width >= 1000) {
				defaultGridConfig = gridParams.size3[createdScale]
			} else if (width < 999) {
				defaultGridConfig = gridParams.size4[createdScale]
			}

			appContext.dispatch({
				type: 'set-default-grid-config',
				payload: { gridConfig: defaultGridConfig },
			})
		}

		// dispatch(
		// 	changeFigureSides({
		// 		figureASide: figureASide,
		// 		figureBSide: figureBSide,
		// 		figureCSide: figureCSide,
		// 		figureDSide: figureDSide,
		// 	})
		// )

		// appContext.dispatch({
		// 	type: 'change-figure-sides',
		// 	payload: {
		// 		...appContext.state.figureSides,
		// 		figureASide: figureASide,
		// 		figureBSide: figureBSide,
		// 		figureCSide: figureCSide,
		// 		figureDSide: figureDSide,
		// 	},
		// })
	}

	const [isAddPointsDialog, setIsAddPointsDialog] = useState<Boolean>(false)

	let buildFigureByPointsBtnHandler = () => {
		setIsAddPointsDialog(true)
	}

	let setPointsToBuildPolygon = (points: any[]) => {
		console.log('points: ', points)
		setIsAddPointsDialog(false)
		//alert(points)
		if (points?.length > 0) {
			appContext.dispatch({
				type: 'set-clicked-coords',
				payload: { clickedCoords: null },
			})
			appContext.dispatch({
				type: 'set-polygon-coords-from-dialog',
				payload: { polygonCoords: points },
			})
		}
	}

	let pointsToBuildPolygonClose = () => {
		setIsAddPointsDialog(false)
	}

	const [activeTab, setActiveTab] = useState(
		selectedFigure !== FIGURES.Polygon ? 1 : 2
	)

	/// Render

	console.log('figureSides', figureSides)

	return (
		<>
			<div className={styles.container}>
				<div className={styles.message}>
					Введіть сторони для базових фігур або проставте точки для довільної
					фігури
				</div>
				<div className={styles.tabs}>
					<button
						className={activeTab === 1 ? styles.active : ''}
						onClick={e => {
							setActiveTab(1)
						}}
					>
						За сторонами
					</button>

					<div className='figures-buttons'>
						<button
							className={activeTab === 2 ? styles.active : ''}
							onClick={() => {
								setActiveTab(2)
								buildFigureByPointsBtnHandler()
							}}
						>
							За точками
						</button>
					</div>
				</div>
				{activeTab === 1 && <FiguresInputs />}

				{activeTab === 2 && isAddPointsDialog && (
					<>
						<AddPointsDialog
							setPointsCallback={setPointsToBuildPolygon}
							onCloseCallback={pointsToBuildPolygonClose}
						/>
					</>
				)}
			</div>
		</>
	)
}

export default FigureActions
