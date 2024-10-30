import { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
	setSelectedFigure,
	setEditedMode,
	setIsBuildMode,
} from '../../../store/settingSlice'
import { changeFigureSides } from '../../../store/figureParamsSlice'

import RoofStage from '../roof-components/RoofStage/RoofStage'
import SidePanel from '../page-components/SidePanel/SidePanel'
import BuildPanel from '../page-components/BuildPanel/BuildPanel'

import { FIGURES } from '../../../enums/figure.enum'
import styles from './Calculator.module.scss'

const Calculator: FC = () => {
	const dispatch = useDispatch()
	const { selectedFigure } = useSelector((state: any) => state.settings)
	const { dictionaries } = useSelector((state: any) => state.dictionaries)

	useEffect(() => {
		dispatch(setEditedMode(0))
		dispatch(setIsBuildMode(false))
		dispatch(setSelectedFigure(FIGURES.None))
	}, [])

	useEffect(() => {
		console.log('selectedFigure', selectedFigure)
		if (selectedFigure === FIGURES.Square) {
			dispatch(
				changeFigureSides({
					figureASide: Number(5),
					figureBSide: Number(0),
					figureCSide: Number(0),
					figureDSide: Number(0),
				})
			)
		} else if (selectedFigure === FIGURES.Rectangle) {
			dispatch(
				changeFigureSides({
					figureASide: Number(9),
					figureBSide: Number(5),
					figureCSide: Number(0),
					figureDSide: Number(0),
				})
			)
		} else if (selectedFigure === FIGURES.Trapezoid) {
			dispatch(
				changeFigureSides({
					figureASide: Number(10),
					figureBSide: Number(3),
					figureCSide: Number(6),
					// figureDSide: Number(5),
					figureDSide: Number(0),
				})
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
				})
			)
		} else if (selectedFigure === FIGURES.Polygon) {
			dispatch(
				changeFigureSides({
					figureASide: Number(0),
					figureBSide: Number(0),
					figureCSide: Number(0),
					figureDSide: Number(0),
				})
			)
		} else if (selectedFigure === FIGURES.None) {
			dispatch(
				changeFigureSides({
					figureASide: Number(0),
					figureBSide: Number(0),
					figureCSide: Number(0),
					figureDSide: Number(0),
				})
			)
			dispatch(setEditedMode(0))
			dispatch(setIsBuildMode(false))
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

				<RoofStage />
			</div>
		</div>
	)
}

export default Calculator
