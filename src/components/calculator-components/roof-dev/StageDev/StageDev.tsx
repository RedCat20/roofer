// @ts-nocheck

import { FC, useEffect, useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Stage } from 'react-konva'

import { setSelectedScale } from '../../../../store/settingSlice'
import { useGridConfig } from '../../../../hooks/useGridConfig'

import { AppContext } from '../../../../context/AppContext'
import { StageConsumer } from '../../../../context/StageConsumer'

import CanvasGridContainer from '../Grid/CanvasGridContainer'
import styles from './StageDev.module.scss'

import SquareContainer from '../Square/SquareContainer'
import RectangleContainer from '../Rectangle/SquareContainer'

import EditedPanel from '../EditedPanel/EditedPanel'
import CalcResult from '../CalcResult/CalcResult'
import { FIGURES } from '../../../../enums/figure.enum'

interface Props {}

const StageDev: FC<Props> = () => {
	const gridConfig = useGridConfig()
	const appContext = useContext(AppContext)

	const { editedMode, isBuildMode, selectedScale, selectedFigure } =
		useSelector((state: any) => state.settings)

	const onMouseDownHandler = (e: any) => {}
	const onMouseMoveHandler = (e: any) => {}
	const onTouchStartHandler = (e: any) => {}
	const onStageClickHandler = (e: any) => {}
	const onStageTapHandler = (e: any) => {}

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

	return (
		<>
			{gridConfig ? (
				<div className={styles.stageContainer}>
					<EditedPanel />

					<div className={styles.gridWrapper} id='grid'>
						{selectedScale && (
							<StageConsumer>
								{({ state, dispatch }: { state: any; dispatch: any }) => (
									<Stage
										scaleX={+1}
										scaleY={+1}
										width={gridConfig?.width}
										height={gridConfig?.height}
										// onMouseDown={onMouseDownHandler}
										// onMouseMove={onMouseMoveHandler}
										// onTouchStart={onTouchStartHandler}
										// onClick={onStageClickHandler}
										// onTap={onStageTapHandler}
									>
										{/* Сітка /*/}
										<AppContext.Provider value={{ state, dispatch }}>
											<CanvasGridContainer />
										</AppContext.Provider>

										{/* Квадрат /*/}
										{selectedFigure === 1 && (
											<AppContext.Provider value={{ state, dispatch }}>
												<SquareContainer
													setSelectedSquareIdCallback={
														setSelectedSquareIdHandler
													}
													selectedSquareId={selectedSquareId}
													setCalcResult={setCalcResult}
												/>
											</AppContext.Provider>
										)}

										{/* Квадрат /*/}
										{selectedFigure === 2 && (
											<AppContext.Provider value={{ state, dispatch }}>
												<RectangleContainer
													setSelectedRectangleIdCallback={
														setSelectedRectangleIdHandler
													}
													selectedRectangleId={selectedRectangleId}
													setCalcResult={setCalcResult}
												/>
											</AppContext.Provider>
										)}
									</Stage>
								)}
							</StageConsumer>
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
