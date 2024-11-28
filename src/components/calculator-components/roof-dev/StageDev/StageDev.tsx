// @ts-nocheck

import { FC, useEffect, useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Stage } from 'react-konva'

import { setSelectedScale } from '../../../../store/settingSlice'
import { useGridConfig } from '../../../../hooks/useGridConfig'

import CanvasGridContainer from '../Grid/CanvasGridContainer'
import styles from './StageDev.module.scss'

import SquareContainer from '../Square/SquareContainer'
import RectangleContainer from '../Rectangle/SquareContainer'
import PolygonContainer from '../Polygon/PolygonContainer'
import TriangleContainer from '../Triangle/TriangleContainer'

import EditedPanel from '../EditedPanel/EditedPanel'
import CalcResult from '../CalcResult/CalcResult'
import { FIGURES } from '../../../../enums/figure.enum'

import { changeCustomPoints } from '../../../../store/figureParamsSlice'

interface Props {}

const StageDev: FC<Props> = () => {
	const gridConfig = useGridConfig()

	const dispatch = useDispatch()

	const { editedMode, isBuildMode, selectedScale, selectedFigure } =
		useSelector((state: any) => state.settings)

	const { customPoints } = useSelector((state: any) => state.figureParams)

	const onMouseDownHandler = (e: any) => {}

	const onMouseMoveHandler = (e: any) => {}

	const onTouchStartHandler = (e: any) => {}

	const onStageClickHandler = (e: any) => {
		// Click and tap on stage
		let stage = e.target.getStage()
		const pointerPosition = stage.getPointerPosition()

		const { cellSize, height, startCoords } = gridConfig
		let arr = [...customPoints]
		let figureBottomLine = startCoords[1]

		console.log('!!! pointerPosition: ', pointerPosition)

		if (selectedFigure === FIGURES.Polygon && editedMode === 1) {
			arr.push([
				(pointerPosition.x - startCoords[0]) / cellSize,
				(-1 * (pointerPosition.y - startCoords[1])) / cellSize,
			])
			console.log('new array: ', [...arr])
			dispatch(changeCustomPoints([...arr]))
		}

		// dispatch(
		// 	changeCustomPoints([
		// 		[1, 1],
		// 		[2, 2],
		// 		[2, 1],
		// 	])
		// )
	}

	const onStageTapHandler = (e: any) => {
		/// Click and tap on stage
		let stage = e.target.getStage()
		const pointerPosition = stage.getPointerPosition()

		const { cellSize, height, startCoords } = gridConfig
		let arr = [...customPoints]
		let figureBottomLine = startCoords[1]
		console.log('pointerPosition: ', pointerPosition)

		if (selectedFigure === FIGURES.Polygon) {
			arr.push([
				startCoords[0] + pointerPosition.x / (cellSize * cellSize),
				startCoords[1] - pointerPosition.y / (cellSize * cellSize),
			])
			dispatch(changeCustomPoints([...arr]))
		}
	}

	const [selectedSquareId, setSelectedSquareId] = useState(null)
	const [selectedRectangleId, setSelectedRectangleId] = useState(null)

	const [calcResult, setCalcResult] = useState(null)

	const setSelectedSquareIdHandler = (id: any) => {
		setSelectedSquareId(id)
		setSelectedRectangleId(null)
	}

	const setSelectedRectangleIdHandler = (id: any) => {
		setSelectedSquareId(null)
		setSelectedRectangleId(id)
	}

	useEffect(() => {
		if (selectedFigure === FIGURES.Square) setSelectedSquareId('square1')
		if (selectedFigure === FIGURES.Rectangle)
			setSelectedRectangleId('rectangle1')
	}, [selectedFigure])

	const { figureSides } = useSelector((state: any) => state.figureParams)

	console.log('selectedScale: ', selectedScale)

	return (
		<>
			{gridConfig ? (
				<div className={styles.stageContainer}>
					<EditedPanel />

					<div className={styles.gridWrapper} id='grid'>
						{selectedScale && (
							<Stage
								scaleX={+1}
								scaleY={+1}
								width={gridConfig?.width}
								height={gridConfig?.height}
								onClick={onStageClickHandler}
								onTap={onStageTapHandler}
							>
								{/* Сітка /*/}
								<CanvasGridContainer />

								{/* Квадрат /*/}
								{selectedFigure === 1 && (
									<SquareContainer
										setSelectedSquareIdCallback={setSelectedSquareIdHandler}
										selectedSquareId={selectedSquareId}
										setCalcResult={setCalcResult}
									/>
								)}

								{/* Прямокутник /*/}
								{selectedFigure === 2 && (
									<RectangleContainer
										setSelectedRectangleIdCallback={
											setSelectedRectangleIdHandler
										}
										selectedRectangleId={selectedRectangleId}
										setCalcResult={setCalcResult}
									/>
								)}

								{/* Трикутник /*/}
								{selectedFigure === 4 && (
									<TriangleContainer setCalcResult={setCalcResult} />
								)}

								{/* Кастомна фігура /*/}
								{selectedFigure === 5 && (
									<PolygonContainer setCalcResult={setCalcResult} />
								)}
							</Stage>
						)}
					</div>

					<CalcResult result={calcResult} />
				</div>
			) : (
				<>Loading...</>
			)}
		</>
	)
}

export default StageDev
