import { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
	setSelectedFigure,
	setEditedMode,
	setIsBuildMode,
} from '../../../store/settingSlice'
import {
	changeCustomPoints,
	changeFigurePoints,
	changeFigureSides,
} from '../../../store/figureParamsSlice'

import RoofStage from '../roof-components/RoofStage/RoofStage'
import StageDev from '../roof-dev/StageDev/StageDev'

import SidePanel from '../page-components/SidePanel/SidePanel'
import BuildPanel from '../page-components/BuildPanel/BuildPanel'

import { FIGURES } from '../../../enums/figure.enum'
import styles from './Calculator.module.scss'

const Calculator: FC = () => {
	const dispatch = useDispatch()
	const { selectedFigure } = useSelector((state: any) => state.settings)
	const { dictionaries } = useSelector((state: any) => state.dictionaries)

	const clearData = () => {
		Promise.all([
			// dispatch(setEditedMode(0)),
			// dispatch(setIsBuildMode(false)),
			// dispatch(setSelectedFigure(FIGURES.None)),
			dispatch(
				changeFigureSides({
					figureASide: 0,
					figureBSide: 0,
					figureCSide: 0,
					figureDSide: 0,
					figureHSide: 0,
				})
			),
			dispatch(
				changeFigurePoints([
					[0, 0],
					[0, 0],
					[0, 0],
					[0, 0],
				])
			),
			dispatch(changeCustomPoints([])),
		])
	}

	useEffect(() => {
		clearData()

		if (selectedFigure === FIGURES.Square) {
			const defaultFigureASide = 4
			Promise.all([
				dispatch(
					changeFigureSides({
						figureASide: Number(defaultFigureASide),
						figureBSide: Number(0),
						figureCSide: Number(0),
						figureDSide: Number(0),
						figureHSide: Number(0),
					})
				),
				dispatch(
					changeFigurePoints([
						[0, 0],
						[defaultFigureASide, 0],
						[defaultFigureASide, defaultFigureASide],
						[0, defaultFigureASide],
					])
				),
			])
		} else if (selectedFigure === FIGURES.Rectangle) {
			const defaultFigureASide = 6
			const defaultFigureBSide = 4
			Promise.all([
				dispatch(
					changeFigureSides({
						figureASide: Number(defaultFigureASide),
						figureBSide: Number(defaultFigureBSide),
						figureCSide: Number(0),
						figureDSide: Number(0),
						figureHSide: Number(0),
					})
				),
				dispatch(
					changeFigurePoints([
						[0, 0],
						[defaultFigureASide, 0],
						[defaultFigureASide, defaultFigureBSide],
						[0, defaultFigureBSide],
					])
				),
			])
		} else if (selectedFigure === FIGURES.Trapezoid) {
			dispatch(
				changeFigureSides({
					figureASide: Number(10),
					figureBSide: Number(6),
					figureCSide: Number(0),
					figureDSide: Number(0),
					figureHSide: Number(4),
					// figureCSide: Number(13),
					// figureDSide: Number(5),
					// figureHSide: Number(14),
				})

				// changeFigureSides({
				// 	figureASide: Number(10),
				// 	figureBSide: Number(3),
				// 	figureCSide: Number(6),
				// 	// figureDSide: Number(5),
				// 	figureDSide: Number(0),
				// })
			)
		} else if (selectedFigure === FIGURES.Triangular) {
			dispatch(
				changeFigureSides({
					figureASide: Number(10),
					//figureBSide: Number(6.6555),
					figureBSide: Number(6),
					//figureCSide: Number(6.6555),
					figureCSide: Number(6),
					figureDSide: Number(0),
					figureHSide: Number(0),
				})
			)
		} else if ([FIGURES.Polygon].includes(selectedFigure)) {
			Promise.all([
				dispatch(
					changeFigureSides({
						figureASide: Number(0),
						figureBSide: Number(0),
						figureCSide: Number(0),
						figureDSide: Number(0),
						figureHSide: Number(0),
					})
				),
				changeCustomPoints([
					[0, 0],
					[1, 0],
					[0, 1],
				]),
			])
		} else if ([FIGURES.None].includes(selectedFigure)) {
			Promise.all([
				dispatch(
					changeFigureSides({
						figureASide: Number(0),
						figureBSide: Number(0),
						figureCSide: Number(0),
						figureDSide: Number(0),
						figureHSide: Number(0),
					})
				),
				changeFigurePoints([
					[0, 0],
					[0, 0],
					[0, 0],
					[0, 0],
				]),
			])
		} else {
			Promise.all([
				dispatch(setEditedMode(0)),
				dispatch(setIsBuildMode(false)),
				dispatch(setSelectedFigure(FIGURES.None)),
			])
		}
	}, [selectedFigure])

	return (
		<div className={styles.calculatorContainer}>
			<div className={styles.mainContainer}>
				<div className={styles.aside}>
					<BuildPanel />
					<div className={styles.selectWrapper}>
						<select id='dictionaries'>
							{dictionaries.map((item: any) => {
								return <option value={item.id}>{item.name}</option>
							})}
						</select>
					</div>
					<SidePanel />
				</div>
				<div className={styles.main}>
					{/* <RoofStage /> */}
					<StageDev />
				</div>
			</div>
		</div>
	)
}

export default Calculator
