// @ts-nocheck
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FIGURES } from '../../../../enums/figure.enum'
import {
	setEditedMode,
	setIsBuildMode,
	setSelectedScale,
} from '../../../../store/settingSlice'
import MainActions from '../../page-components/MainActions/MainActions'
import styles from './EditedPanel.module.scss'

const EditedPanel = () => {
	const dispatch = useDispatch()
	const [clickedCoords, setClickedCoords] = useState(null)

	const { editedMode, isBuildMode, selectedScale, selectedFigure } =
		useSelector((state: any) => state.settings)

	function buildButtonHandler(e: any) {
		dispatch(setEditedMode(4))
		dispatch(setIsBuildMode(true))
		setClickedCoords(null)
	}

	return (
		<div className={styles.editBtnWrapper}>
			<MainActions />

			<div className={styles.buttons}>
				<button
					style={{
						background: editedMode === 1 ? 'lightgreen' : '',
					}}
					disabled={!selectedFigure}
					onClick={() => {
						dispatch(setEditedMode(1))
					}}
				>
					Figure building
				</button>

				<button
					style={{
						background: editedMode === 2 ? 'lightgreen' : '',
					}}
					onClick={() => {
						dispatch(setEditedMode(2))
					}}
					disabled={
						!selectedFigure ||
						[FIGURES.Trapezoid, FIGURES.Triangular, FIGURES.Polygon].includes(
							selectedFigure
						)
					}
				>
					Auto transformation
				</button>

				<button
					style={{
						background: editedMode === 3 ? 'lightgreen' : '',
					}}
					disabled={
						!selectedFigure ||
						[FIGURES.Rectangle, FIGURES.Square].includes(selectedFigure)
					}
					onClick={() => {
						dispatch(setEditedMode(3))
					}}
				>
					Transformation by points
				</button>

				<button
					style={{
						background: editedMode === 4 ? 'lightgreen' : '',
					}}
					disabled={!selectedFigure}
					onClick={buildButtonHandler.bind(this)}
				>
					Block covering
				</button>
			</div>
		</div>
	)
}

export default EditedPanel
