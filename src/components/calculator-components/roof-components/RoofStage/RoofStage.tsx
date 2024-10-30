// @ts-nocheck

import React, { FC, useEffect, useContext, useState } from 'react'
import { Stage } from 'react-konva'

import { AppContext } from '../../../../context/AppContext'
import { FIGURES } from '../../../../enums/figure.enum'
import { changeFigureSides } from '../../../../store/figureParamsSlice'

import styles from './RoofStage.module.scss'
import InfoImg from '../../../../images/info.png'
import MainActions from '../../page-components/MainActions/MainActions'

import { useGridConfig } from '../../../../hooks/useGridConfig'
import { StageConsumer } from '../../../../context/StageConsumer'

import CanvasGridContainer from '../CanvasGrid/CanvasGridContainer'

import SquareContainer from '../../figures-components/Square/SquareContainer'
import RectangleContainer from '../../figures-components/Rectangle/RectangleContainer'
import TrapezoidContainer from '../../figures-components/Trapezoid/TrapezoidContainer'
import TriangleContainer from '../../figures-components/Triangle/TriangleContainer'
import PolygonContainer from '../../figures-components/Polygon/PolygonContainer'
import { scalesConfig } from '../../../../data'
import plusImg from '../../../../images/plus.png'
import { useWindowSize } from '../../../../hooks/useWindowSize'

import { useSelector, useDispatch } from 'react-redux'
import {
	setEditedMode,
	setIsBuildMode,
	setSelectedScale,
} from '../../../../store/settingSlice'

interface Props {}

const RoofStage: FC<Props> = () => {
	const { selectedFigure } = useSelector((state: any) => state.settings)

	const [width, height] = useWindowSize()

	const [clickedCoordsView, setClickedCoordsView] = useState({ x: 0, y: 0 })

	const [calcResult, setCalcResult] = useState(null)

	const appContext = useContext(AppContext)

	const gridConfig = useGridConfig(window, 1)

	const [trapezoidPoints, setTrapezoidPoints] = useState<any[]>([])
	const [trianglePoints, setTrianglePoints] = useState<any[]>([])
	const [polygonPoints, setPolygonPoints] = useState<any[]>([])

	const [selectedRectangleId, selectRectangleShape] = React.useState(null)
	const [selectedTrapezoidId, selectTrapezoidShape] = React.useState(null)
	const [selectedTriangleId, selectTriangleShape] = React.useState(null)
	const [selectedPolygonId, selectPolygonShape] = React.useState(null)

	const [clickedCoords, setClickedCoords] = React.useState(null)
	const [polygonCoords, setPolygonCoords] = React.useState(null)

	const { dictionaries } = useSelector((state: any) => state.dictionaries)
	const { figureSides } = useSelector((state: any) => state.figureParams)
	const { editedMode, isBuildMode, selectedScale } = useSelector(
		(state: any) => state.settings
	)

	const dispatch = useDispatch()

	useEffect(() => {
		if (isBuildMode && [1, 2, 3].includes(editedMode)) {
			dispatch(setIsBuildMode(false))
		}
	}, [isBuildMode, editedMode])

	useEffect(() => {
		setClickedCoords(null)
	}, [selectedFigure])

	useEffect(() => {
		setPolygonCoords(appContext.state.polygonCoords)
	}, [appContext.state.polygonCoords])

	useEffect(() => {
		/// розібрати чому повернене кастомним хуком значення конфігурації не працює, а тільки засечене там же у appContext
		// console.log("grid-config in roof stage: ", gridConfig)
	}, [gridConfig])

	const setSelectedSquareId = (id: any) => {
		selectRectangleShape(null)
		selectTriangleShape(null)
		selectTrapezoidShape(null)
		selectPolygonShape(null)
		selectSquareShape(id)
	}

	const setSelectedRectangleId = (id: any) => {
		selectSquareShape(null)
		selectTriangleShape(null)
		selectTrapezoidShape(null)
		selectPolygonShape(null)
		selectRectangleShape(id)
	}

	const setSelectedTrapezoidId = (id: any) => {
		selectSquareShape(null)
		selectRectangleShape(null)
		selectTriangleShape(null)
		selectPolygonShape(null)
		selectTrapezoidShape(id)
	}

	const setSelectedTriangleId = (id: any) => {
		selectSquareShape(null)
		selectRectangleShape(null)
		selectTrapezoidShape(null)
		selectPolygonShape(null)
		selectTriangleShape(id)
	}

	const setSelectedPolygonId = (id: any) => {
		selectSquareShape(null)
		selectRectangleShape(null)
		selectTrapezoidShape(null)
		selectTriangleShape(null)
		selectPolygonShape(id)
	}

	const [selectedTrapezoidShapeName, setSelectedTrapezoidShapeName] =
		useState('')
	const [selectedTriangleShapeName, setSelectedTriangleShapeName] = useState('')
	const [selectedPolygonShapeName, setSelectedPolygonShapeName] = useState('')

	const checkDeselect = (e: any) => {
		const clickedOnEmpty = e.target === e.target.getStage()

		if (clickedOnEmpty) {
			if (selectedFigure === 1) {
				selectSquareShape(null)
			} else if (selectedFigure === 2) {
				selectRectangleShape(null)
			} else if (selectedFigure === 3) {
				selectTriangleShape(null)
			} else if (selectedFigure === 4) {
				selectTrapezoidShape(null)
			} else if (selectedFigure === 5) {
				selectPolygonShape(null)
			}
		}

		if (selectedFigure === 3) {
			// clicked on stage - cler selection
			if (e.target === e.target.getStage()) {
				setSelectedTrapezoidShapeName('')
				return
			}
			// clicked on transformer - do nothing
			const clickedOnTransformer =
				e.target.getParent().className === 'Transformer'
			if (clickedOnTransformer) {
				return
			}
			// find clicked rect by its name
			const name = e.target.name()
			setSelectedTrapezoidShapeName(name)
		} else if (selectedFigure === 4) {
			// clicked on stage - cler selection
			if (e.target === e.target.getStage()) {
				setSelectedTriangleShapeName('')
				return
			}
			// clicked on transformer - do nothing
			const clickedOnTransformer =
				e.target.getParent().className === 'Transformer'
			if (clickedOnTransformer) {
				return
			}
			const name = e.target.name()
			setSelectedTriangleShapeName(name)
		} else if (selectedFigure === 5) {
			// clicked on stage - cler selection
			if (e.target === e.target.getStage()) {
				setSelectedPolygonShapeName('')
				return
			}
			// clicked on transformer - do nothing
			const clickedOnTransformer =
				e.target.getParent().className === 'Transformer'
			if (clickedOnTransformer) {
				return
			}
			// find clicked rect by its name
			const name = e.target.name()
			setSelectedPolygonShapeName(name)
		}
	}

	/// To transformation saving
	function setNewSides(sides: { width: number; height: number }) {
		let side1 = (sides.width / appContext.state.gridConfig.cellSize).toFixed(2)
		let side2 = (sides.height / appContext.state.gridConfig.cellSize).toFixed(2)

		if (selectedFigure === FIGURES.Square) {
			dispatch(
				changeFigureSides({
					figureASide: side1,
				})
			)
		} else if (selectedFigure === FIGURES.Rectangle) {
			dispatch(
				changeFigureSides({
					figureASide: side1,
					figureBSide: side2,
				})
			)
		}
	}

	/// Click and tap on stage
	function onStageClickHandler(e: any) {
		// if (appContext.state.selectedFigure !== FIGURES.Polygon) return;

		let stage = e.target.getStage()
		const pointerPosition = stage.getPointerPosition()

		// if (pointerPosition.x < appContext.state.gridConfig.cellSize || pointerPosition.y < appContext.state.gridConfig.cellSize)
		//     return;

		// if (pointerPosition.x < appContext.state.gridConfig.cellSize)
		//     pointerPosition.x = appContext.state.gridConfig.cellSize;
		// if (pointerPosition.y < appContext.state.gridConfig.cellSize)
		//     pointerPosition.y = appContext.state.gridConfig.cellSize;

		let cellSize = appContext.state.gridConfig.cellSize
		let gridHeight = appContext.state.gridSizes.height
		//let figureBottomLine = Math.floor(gridHeight / cellSize) * cellSize;

		let figureBottomLine =
			-gridHeight / scalesConfig[`${selectedScale}`] + cellSize

		// if (pointerPosition.y > figureBottomLine)
		//     pointerPosition.y = figureBottomLine;

		// let zoomKoef = cellSize / 100;

		if (selectedFigure === FIGURES.Polygon) {
			appContext.dispatch({
				type: 'set-clicked-coords',
				payload: {
					clickedCoords: {
						x: pointerPosition.x / scalesConfig[`${selectedScale}`],
						y: -pointerPosition.y / scalesConfig[`${selectedScale}`],
					},
				},
			})

			setClickedCoords({
				x: pointerPosition.x / scalesConfig[`${selectedScale}`],
				y: -pointerPosition.y / scalesConfig[`${selectedScale}`],
			})
		}

		setClickedCoordsView({
			x: Math.round(pointerPosition.x),
			y: Math.round(pointerPosition.y),
		})
	}
	/// Click and tap on stage
	function onStageTapHandler(e: any) {
		let stage = e.target.getStage()

		const pointerPosition = stage.getPointerPosition()

		appContext.dispatch({
			type: 'set-clicked-coords',
			payload: { clickedCoords: pointerPosition },
		})
		setClickedCoords(pointerPosition)
	}

	function calcFigurePoints(points: any[]) {
		if (selectedFigure === FIGURES.Triangular) {
			setTrianglePoints(points)
		} else if (selectedFigure === FIGURES.Trapezoid) {
			setTrapezoidPoints(points)
		} else if (selectedFigure === FIGURES.Polygon) {
			setPolygonPoints(points)
		}
	}

	function calcPolygonPoints(points: any[]) {
		setPolygonPoints(points)
	}

	let handleStageMouseDown = (e: any) => {
		// if (e.target === e.target.getStage()) {
		//     setSelectedTrapezoidShapeName("");
		//     return;
		// }
		// // clicked on transformer - do nothing
		// const clickedOnTransformer =
		//     e.target.getParent().className === "Transformer";
		// if (clickedOnTransformer) {
		//     return;
		// }

		// find clicked rect by its name
		const name = e.target.name()
		setSelectedTrapezoidShapeName(name)
	}

	const [selectedSquareId, selectSquareShape] = React.useState(null)

	function calcTrapezoidPoints(points: any[]) {
		setTrapezoidPoints(points)
	}

	function buildButtonHandler(e: any) {
		dispatch(setEditedMode(4))
		dispatch(setIsBuildMode(true))
		setClickedCoords(null)
	}

	function onMouseMoveHandler(e: any) {
		let stage = e.target.getStage()
		const pointerPosition = stage.getPointerPosition()

		setClickedCoordsView({
			x: Math.round(pointerPosition.x),
			y: Math.round(pointerPosition.y),
		})
	}

	function getTrs() {
		let trs = []
		for (
			let i = 0;
			i < dictionaries?.[0]?.exceptions.length &&
			dictionaries?.[0]?.recommended.length &&
			dictionaries?.[0]?.made.length;
			i++
		) {
			trs.push(
				<tr key={'table_tr' + i} className=''>
					<td>{dictionaries?.[0]?.exceptions[i] || '-'}</td>
					<td>{dictionaries?.[0]?.recommended[i] || '-'}</td>
					<td>{dictionaries?.[0]?.made[i] || '-'}</td>
				</tr>
			)
		}
		return trs
	}

	return (
		<>
			<div className={styles.stageContainer}>
				{/* Edited panel */}

				<div className={styles.editBtnWrapper}>
					<MainActions />

					<div className={styles.buttons}>
						<button
							style={{
								background: editedMode === 1 ? 'lightgreen' : '',
							}}
							onClick={() => {
								dispatch(setEditedMode(1))

								appContext.dispatch({
									type: 'set-clicked-coords',
									payload: { clickedCoords: null },
								})
								setClickedCoords(null)
							}}
						>
							Побудова фігури
						</button>

						<button
							style={{
								background: editedMode === 2 ? 'lightgreen' : '',
							}}
							onClick={() => {
								dispatch(setEditedMode(2))
							}}
							disabled={[
								FIGURES.Trapezoid,
								FIGURES.Triangular,
								FIGURES.Polygon,
							].includes(selectedFigure)}
						>
							Пропорційна трансформація
						</button>

						<button
							style={{
								background: editedMode === 3 ? 'lightgreen' : '',
							}}
							disabled={[FIGURES.Rectangle, FIGURES.Square].includes(
								selectedFigure
							)}
							onClick={() => {
								dispatch(setEditedMode(3))
							}}
						>
							Трансформація за точками
						</button>

						<button
							style={{
								background: editedMode === 4 ? 'lightgreen' : '',
							}}
							onClick={buildButtonHandler.bind(this)}
						>
							Накладання блоків
						</button>
					</div>

					<div
						style={{
							marginRight: '5px',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						x:{' '}
						{
							+(
								clickedCoordsView.x / scalesConfig[`${selectedScale}`] -
								appContext.state.gridConfig.cellSize
							).toFixed(0)
						}
						<br />
						y:{' '}
						{+(
							-appContext.state.gridConfig.height /
								scalesConfig[`${selectedScale}`] +
							appContext.state.gridConfig.cellSize +
							clickedCoordsView.y / scalesConfig[`${selectedScale}`]
						).toFixed(0) * -1}
					</div>
				</div>

				{/* Grid wrapper */}

				<div className={styles.gridWrapper} id='grid'>
					{selectedScale && (
						<StageConsumer>
							{({ state, dispatch }: { state: any; dispatch: any }) => (
								<Stage
									scaleX={+scalesConfig[`${selectedScale}`]}
									scaleY={-scalesConfig[`${selectedScale}`]}
									width={width - 300 - 80 - 20}
									// width={gridConfig ? gridConfig.width : 100}
									height={gridConfig ? gridConfig.height : 100}
									onMouseDown={checkDeselect}
									onMouseMove={onMouseMoveHandler}
									onTouchStart={checkDeselect}
									onClick={onStageClickHandler}
									onTap={onStageTapHandler}
								>
									{/* Сітки /*/}
									<AppContext.Provider value={{ state, dispatch }}>
										<CanvasGridContainer />
									</AppContext.Provider>

									{/* Квадрат /*/}
									{selectedFigure === 1 && (
										<AppContext.Provider value={{ state, dispatch }}>
											<SquareContainer
												setSelectedRectangleIdCallback={setSelectedSquareId}
												// setNewSidesCallback={setNewSides}
												selectedSquareId={selectedSquareId}
												setCalcResult={setCalcResult}
											/>
										</AppContext.Provider>
									)}

									{/* Прямокутник /*/}
									{selectedFigure === 2 && (
										<AppContext.Provider value={{ state, dispatch }}>
											<RectangleContainer
												setSelectedRectangleIdCallback={setSelectedRectangleId}
												setNewSidesCallback={setNewSides}
												selectedRectangleId={selectedRectangleId}
												setCalcResult={setCalcResult}
											/>
										</AppContext.Provider>
									)}

									{/* Трапеція /*/}
									{selectedFigure === 3 && (
										<AppContext.Provider value={{ state, dispatch }}>
											<TrapezoidContainer
												Container
												setSelectedTrapezoidIdCallback={setSelectedTrapezoidId}
												setNewSidesCallback={setNewSides}
												selectedTrapezoidId={selectedTrapezoidId}
												calcTrapezoidPointsCallback={calcFigurePoints}
												setSelectedTrapezoidId={setSelectedTrapezoidId}
												selectedTrapezoidShapeName={selectedTrapezoidShapeName}
												setCalcResult={setCalcResult}
											/>
										</AppContext.Provider>
									)}

									{/* Трикутник /*/}
									{selectedFigure === 4 && (
										<AppContext.Provider value={{ state, dispatch }}>
											<TriangleContainer
												setCalcResult={setCalcResult}
												setSelectedTriangleIdCallback={setSelectedTriangleId}
												setNewSidesCallback={setNewSides}
												selectedTriangleId={selectedRectangleId}
												calcTrianglePointsCallback={calcFigurePoints}
												setSelectedTriangleId={setSelectedTriangleId}
												selectedTriangleShapeName={selectedTriangleShapeName}
											/>
										</AppContext.Provider>
									)}

									{/* Кастомна фігура /*/}
									{selectedFigure === 5 && (
										<AppContext.Provider value={{ state, dispatch }}>
											<PolygonContainer
												setCalcResult={setCalcResult}
												clickedCoords={clickedCoords}
												polygonCoords={polygonCoords}
												setSelectedPolygonId={setSelectedPolygonId}
												setNewSidesCallback={setNewSides}
												calcPolygonPointsCallback={calcFigurePoints}
												selectedPolygonShapeName={selectedPolygonShapeName}
												selectedPolygonId={selectedPolygonId}
											/>
										</AppContext.Provider>
									)}
								</Stage>
							)}
						</StageConsumer>
					)}
				</div>

				{editedMode === 4 && isBuildMode && selectedFigure > 0 && (
					<div
						className='calc-result'
						style={{ display: 'flex', flexDirection: 'column' }}
					>
						<div dangerouslySetInnerHTML={{ __html: calcResult }} />
						<table>
							<thead>
								<tr>
									<th>Не виготовляється</th>
									<th>Рекомендовані довжини</th>
									<th
										style={{
											border: '1px solid silver',
											textAlign: 'center',
											padding: '10px 20px',
										}}
									>
										Виготовляється
									</th>
								</tr>
							</thead>
							<tbody>{getTrs()}</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	)
}

export default RoofStage
