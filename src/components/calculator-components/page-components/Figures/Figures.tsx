// @ts-nocheck

import React, { FC, useContext } from 'react'
import { AppContext } from '../../../../context/AppContext'
import clsx from 'clsx'
import { FIGURES } from '../../../../enums/figure.enum'
import styles from './Figures.module.scss'

import squareIcon from '../../../../images/square_icon.png'
import rectangleIcon from '../../../../images/rectangle_icon.png'
import trapezoidIcon from '../../../../images/trapezoid_icon.png'
import triangleIcon from '../../../../images/triangle_icon.png'
import polygonIcon from '../../../../images/polygon_icon.png'
import { scalesConfig } from '../../../../data'

import { useSelector, useDispatch } from 'react-redux'
import { setSelectedFigure } from '../../../store/settingSlice'

interface Props {
	onChooseFigure: () => void
}

export const Figures: FC<Props> = ({ onChooseFigure }) => {
	const appContext = useContext(AppContext)

	const { selectedFigure } = useSelector((state: any) => state.settings)

	return (
		<div className={styles.infoBlock}>
			<div className={styles.container}>
				<div className={styles.figureButtons}>
					<button
						className={clsx(
							styles.figureButton,
							selectedFigure === FIGURES.Square ? styles.activeFigure : ''
						)}
						id='figure_1'
						onClick={onChooseFigure.bind(this)}
					>
						<img
							className={styles.img}
							onClick={e => {
								e.target.parentElement.click()
							}}
							src={squareIcon}
							alt='Квадрат'
						/>
					</button>
					<button
						className={clsx(
							styles.figureButton,
							selectedFigure === FIGURES.Rectangle ? styles.activeFigure : ''
						)}
						id='figure_2'
						onClick={onChooseFigure.bind(this)}
					>
						<img
							className={styles.img}
							onClick={e => {
								e.target.parentElement.click()
							}}
							src={rectangleIcon}
							alt='Прямокутник'
						/>
					</button>
					<button
						className={clsx(
							styles.figureButton,
							selectedFigure === FIGURES.Trapezoid ? styles.activeFigure : ''
						)}
						id='figure_3'
						onClick={onChooseFigure.bind(this)}
					>
						<img
							className={styles.img}
							onClick={e => {
								e.target.parentElement.click()
							}}
							src={trapezoidIcon}
							alt='Трапеція'
						/>
					</button>
					<button
						className={clsx(
							styles.figureButton,
							selectedFigure === FIGURES.Triangular ? styles.activeFigure : ''
						)}
						id='figure_4'
						onClick={onChooseFigure.bind(this)}
					>
						<img
							className={styles.img}
							onClick={e => {
								e.target.parentElement.click()
							}}
							src={triangleIcon}
							alt='Трикутник'
						/>
					</button>
					<button
						className={clsx(
							styles.figureButton,
							selectedFigure === FIGURES.Polygon ? styles.activeFigure : ''
						)}
						id='figure_5'
						onClick={onChooseFigure.bind(this)}
					>
						<img
							className={styles.img}
							onClick={e => {
								e.target.parentElement.click()
							}}
							src={polygonIcon}
							alt='Довільна фігура'
						/>
					</button>
					<button
						className={clsx(
							styles.figureButton,
							!selectedFigure ? styles.activeFigure : ''
						)}
						id='figure_0'
						onClick={onChooseFigure.bind(this)}
					>
						Не вибрано
					</button>
				</div>
			</div>
		</div>
	)
}
