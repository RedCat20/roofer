import { FC, useContext } from 'react'

import styles from './MainActions.module.scss'

import ZoomInImg from '../../../../images/zoom-in.png'
import ZoomOutImg from '../../../../images/zoom-out.png'
import RemoveImg from '../../../../images/remove.png'
import { setSelectedScale } from '../../../../store/settingSlice'
import { useSelector, useDispatch } from 'react-redux'

const MainActions: FC = () => {
	const dispatch = useDispatch()
	const { selectedScale } = useSelector((state: any) => state.settings)

	function zoomInBtnHandler(e: any) {
		if (selectedScale >= 1.2) {
			return
		}
		dispatch(setSelectedScale(selectedScale + 0.1))
	}

	function zoomOutBtnHandler(e: any) {
		if (selectedScale <= 0.4) {
			return
		}

		dispatch(setSelectedScale(selectedScale - 0.1))
	}

	return (
		<>
			<div className={styles.mainActions}>
				<button
					className={styles.userActionButton}
					disabled={false}
					onClick={zoomInBtnHandler.bind(this)}
				>
					<img src={ZoomInImg} alt='zoom-in' />
				</button>
				<button
					className={styles.userActionButton}
					disabled={false}
					onClick={zoomOutBtnHandler.bind(this)}
				>
					<img src={ZoomOutImg} alt='zoom-out' />
				</button>
			</div>
		</>
	)
}

export default MainActions
