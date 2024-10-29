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

	return (
		<div className={styles.container}>
			<div className={styles.fields}>
				<span>A:</span>
				<input
					className={styles.input}
					id='figure-a-side-input'
					type='number'
					value={figureSides.figureASide}
					disabled={
						editedMode > 1 ||
						selectedFigure === FIGURES.None ||
						selectedFigure === FIGURES.None ||
						selectedFigure === FIGURES.Polygon
					}
					onChange={onChangeFigureASideHandler.bind(this)}
				/>
				<span>м</span>
			</div>

			<div className={styles.fields}>
				<span>B:</span>
				<input
					className={styles.input}
					id='figure-b-side-input'
					type='number'
					value={figureSides.figureBSide}
					onChange={onChangeFigureBSideHandler.bind(this)}
					disabled={
						editedMode > 1 ||
						selectedFigure === FIGURES.None ||
						selectedFigure === FIGURES.Square || 
						selectedFigure === FIGURES.Polygon 
					}
				/>
				<span>м</span>
			</div>

			<div className={styles.fields}>
				<span>C:</span>
				<input
					className={styles.input}
					id='figure-c-side-input'
					type='number'
					value={figureSides.figureCSide}
					onChange={onChangeFigureCSideHandler.bind(this)}
					disabled={
						editedMode > 1 ||
						selectedFigure === FIGURES.None ||
						selectedFigure === FIGURES.Square ||
						selectedFigure === FIGURES.Rectangle ||
						selectedFigure == FIGURES.Polygon
					}
				/>
				<span>м</span>
			</div>

			<div className={styles.fields}>
				<span>D:</span>
				<input
					className={styles.input}
					id='figure-d-side-input'
					type='number'
					value={figureSides.figureDSide}
					onChange={onChangeFigureDSideHandler.bind(this)}
					disabled={
						editedMode > 1 ||
						appContext.state.selectedFigure === FIGURES.None ||
						appContext.state.selectedFigure === FIGURES.Square ||
						appContext.state.selectedFigure === FIGURES.Rectangle ||
						appContext.state.selectedFigure === FIGURES.Triangular ||
						appContext.state.selectedFigure === FIGURES.Trapezoid ||
						appContext.state.selectedFigure === FIGURES.Polygon
					}
				/>
				<span>м</span>
			</div>
		</div>
	)
}
