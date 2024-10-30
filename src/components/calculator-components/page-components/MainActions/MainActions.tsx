import { FC, useContext } from 'react'

import styles from './MainActions.module.scss'

import ZoomInImg from '../../../../images/zoom-in.png'
import ZoomOutImg from '../../../../images/zoom-out.png'
import RemoveImg from '../../../../images/remove.png'
import { AppContext } from '../../../../context/AppContext'
import { gridParams } from '../../../../data'
import { IGridConfig } from '../../../../interfaces/grid-config-interface'
import { setSelectedScale } from '../../../../store/settingSlice'
import { useSelector, useDispatch } from 'react-redux'

const MainActions: FC = () => {
	const appContext = useContext(AppContext)
	const dispatch = useDispatch()
	const { selectedScale } = useSelector((state: any) => state.settings)

	function zoomInBtnHandler(e: any) {
		if (selectedScale <= 1) {
			return
		}

		const width = window.innerWidth
		let defaultGridConfig: IGridConfig | null = null
		let createdScale = `scale${selectedScale - 1}`

		dispatch(setSelectedScale(selectedScale - 1))

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

	function zoomOutBtnHandler(e: any) {
		const width = window.innerWidth

		if (selectedScale >= 3) {
			return
		}

		let defaultGridConfig: IGridConfig | null = null

		let createdScale = `scale${selectedScale + 1}`

		dispatch(setSelectedScale(selectedScale + 1))

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

	function removeActionsBtnHandler(e: any) {
		// appContext.dispatch({ type: 'remove-all' })
	}

	return (
		<>
			<div className={styles.mainActions}>
				<button
					className={styles.userActionButton}
					disabled={
						false
						// appContext.state.editedMode === 2
						// || appContext.state.editedMode === 3
						// appContext.state.selectedFigure === 3
						// || appContext.state.selectedFigure === 4
						// || appContext.state.selectedFigure === 5
					}
					onClick={zoomInBtnHandler.bind(this)}
				>
					<img src={ZoomInImg} alt='zoom-in' />
				</button>
				<button
					className={styles.userActionButton}
					disabled={
						false
						// appContext.state.editedMode === 2
						// || appContext.state.editedMode === 3
						// appContext.state.selectedFigure === 3
						// || appContext.state.selectedFigure === 4
						// || appContext.state.selectedFigure === 5
					}
					onClick={zoomOutBtnHandler.bind(this)}
				>
					<img src={ZoomOutImg} alt='zoom-out' />
				</button>
				<button
					className={styles.userActionButton}
					onClick={removeActionsBtnHandler.bind(this)}
				>
					<img src={RemoveImg} alt='remove' />
				</button>
			</div>
		</>
	)
}

export default MainActions
