import { FC, useContext } from 'react'
import { AppContext } from '../../../../../context/AppContext'
import { FIGURES } from '../../../../../enums/figure.enum'
import styles from './FiguresInputs.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { changeFigureSides } from '../../../../../store/figureParamsSlice'

interface Props {}

export const FiguresInputs: FC<Props> = ({}) => {
	const dispatch = useDispatch()

	const appContext = useContext(AppContext)
	const { figureSides } = useSelector((state: any) => state.figureParams)
	const { editedMode, selectedFigure } = useSelector(
		(state: any) => state.settings
	)

	function onChangeFigureASideHandler(e: any) {
		dispatch(
			changeFigureSides({
				figureASide: e.target.value,
			})
		)
	}

	function onChangeFigureBSideHandler(e: any) {
		dispatch(
			changeFigureSides({
				figureBSide: e.target.value,
			})
		)
	}

	function onChangeFigureCSideHandler(e: any) {
		dispatch(
			changeFigureSides({
				figureCSide: e.target.value,
			})
		)
	}

	function onChangeFigureDSideHandler(e: any) {
		dispatch(
			changeFigureSides({
				figureDSide: e.target.value,
			})
		)
	}

	function onChangeFigureHSideHandler(e: any) {
		dispatch(
			changeFigureSides({
				figureHSide: e.target.value,
			})
		)
	}
	return (
		<div className={styles.container}>
			<div className={styles.label}>
				<span>A:</span>
				<input
					className={styles.input}
					id='figure-a-side-input'
					type='number'
					value={figureSides.figureASide}
					disabled={
						selectedFigure === FIGURES.None ||
						selectedFigure === FIGURES.None ||
						selectedFigure === FIGURES.Polygon
					}
					onChange={onChangeFigureASideHandler.bind(this)}
				/>
				<span>m</span>
			</div>

			<div className={styles.label}>
				<span>B:</span>
				<input
					className={styles.input}
					id='figure-b-side-input'
					type='number'
					value={figureSides.figureBSide}
					onChange={onChangeFigureBSideHandler.bind(this)}
					disabled={
						selectedFigure === FIGURES.None ||
						selectedFigure === FIGURES.Square ||
						selectedFigure === FIGURES.Polygon
					}
				/>
				<span>m</span>
			</div>

			<div className={styles.label}>
				<span>C:</span>
				<input
					className={styles.input}
					id='figure-c-side-input'
					type='number'
					value={figureSides.figureCSide}
					onChange={onChangeFigureCSideHandler.bind(this)}
					disabled={
						selectedFigure === FIGURES.None ||
						selectedFigure === FIGURES.Square ||
						selectedFigure === FIGURES.Rectangle ||
						selectedFigure == FIGURES.Polygon ||
						selectedFigure == FIGURES.Trapezoid
					}
				/>
				<span>m</span>
			</div>

			<div className={styles.label}>
				<span>D:</span>
				<input
					className={styles.input}
					id='figure-d-side-input'
					type='number'
					value={figureSides.figureDSide}
					onChange={onChangeFigureDSideHandler.bind(this)}
					disabled={
						appContext.state.selectedFigure === FIGURES.None ||
						appContext.state.selectedFigure === FIGURES.Square ||
						appContext.state.selectedFigure === FIGURES.Rectangle ||
						appContext.state.selectedFigure === FIGURES.Triangular ||
						appContext.state.selectedFigure === FIGURES.Trapezoid ||
						appContext.state.selectedFigure === FIGURES.Polygon
					}
				/>
				<span>m</span>
			</div>

			<div className={styles.label}>
				<span>H:</span>
				<input
					className={styles.input}
					id='figure-d-side-input'
					type='number'
					value={figureSides.figureHSide}
					onChange={onChangeFigureHSideHandler.bind(this)}
					disabled={
						editedMode > 1 ||
						selectedFigure !== FIGURES.Trapezoid
					}
				/>
				<span>m</span>
			</div>
		</div>
	)
}
