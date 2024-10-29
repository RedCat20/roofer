// @ts-nocheck

import React, { FC, useContext } from 'react'
import styles from './SidePanel.module.scss'
import { AppContext } from '../../../../context/AppContext'
import { FIGURES } from '../../../../enums/figure.enum'

import squareIcon from '../../../../images/square_icon.png'
import rectangleIcon from '../../../../images/rectangle_icon.png'
import trapezoidIcon from '../../../../images/trapezoid_icon.png'
import triangleIcon from '../../../../images/triangle_icon.png'
import polygonIcon from '../../../../images/polygon_icon.png'
import { scalesConfig } from '../../../../data'

import { Figures } from '../Figures/Figures'
import { SettingInfo } from '../SettingInfo/SettingInfo'

import { useSelector, useDispatch } from 'react-redux'
import {
	setSelectedFigure,
	setEditedMode,
} from '../../../../store/settingSlice'

interface Props {}

const SidePanel: FC<Props> = () => {
	const appContext = useContext(AppContext)

	const { selectedFigure } = useSelector((state: any) => state.settings)

	const dispatch = useDispatch()

	function onChooseFigure(e: any) {
		let figureBtnId = e.target.id
		console.log('figureBtnId', e.target)
		let re = new RegExp('(?<=_).*')
		if (!figureBtnId.match(re)) {
			console.log('!figureBtnId.match(re)', !figureBtnId.match(re))
			return
		}
		let subStrId = figureBtnId.match(re)[0]
		let figureId = Number(subStrId)

		// To switch case
		// appContext.dispatch({
		// 	type: 'set-selected-figure',
		// 	payload: { selectedFigure: figureId },
		// })

		dispatch(setSelectedFigure(figureId))
		dispatch(setEditedMode(1))

		// appContext.dispatch({
		// 	type: 'set-edited-mode',
		// 	payload: { editedMode: 1, isEditedMode: true },
		// })

		// appContext.dispatch({
		// 	type: 'set-build-mode',
		// 	payload: { isBuildMode: false },
		// })

		// appContext.dispatch({
		// 	type: 'set-clicked-coords',
		// 	payload: { clickedCoords: null },
		// })
		// appContext.dispatch({
		// 	type: 'set-polygon-coords-from-dialog',
		// 	payload: { polygonCoords: [] },
		// })

		// To switch case
		// switch (figureId) {
		// 	case FIGURES.Square: {
		// 		appContext.dispatch({
		// 			type: 'change-figure-sides',
		// 			payload: {
		// 				figureASide: Number(5),
		// 				figureBSide: Number(0),
		// 				figureCSide: Number(0),
		// 				figureDSide: Number(0),
		// 			},
		// 		})
		// 		break
		// 	}
		// 	case FIGURES.Rectangle: {
		// 		appContext.dispatch({
		// 			type: 'change-figure-sides',
		// 			payload: {
		// 				// figureASide: Number(10),
		// 				figureASide: Number(9),
		// 				figureBSide: Number(5),
		// 				figureCSide: Number(0),
		// 				figureDSide: Number(0),
		// 			},
		// 		})
		// 		break
		// 	}
		// 	case FIGURES.Trapezoid: {
		// 		appContext.dispatch({
		// 			type: 'change-figure-sides',
		// 			payload: {
		// 				figureASide: Number(10),
		// 				figureBSide: Number(3),

		// 				figureCSide: Number(6),
		// 				//figureDSide: Number(5),
		// 				figureDSide: Number(0),

		// 				//figureDSide: 'auto',

		// 				//figureCSide: Number(5),
		// 				//figureDSide: Number(8),

		// 				// figureASide: Number(10),
		// 				// figureBSide: Number(3),
		// 				// figureCSide: Number(6),
		// 				// figureDSide: Number(8),
		// 			},
		// 		})
		// 		break
		// 	}
		// 	case FIGURES.Triangular: {
		// 		appContext.dispatch({
		// 			type: 'change-figure-sides',
		// 			payload: {
		// 				figureASide: Number(10),
		// 				//figureBSide: Number(6.6555),
		// 				figureBSide: Number(6),
		// 				//figureCSide: Number(6.6555),
		// 				figureCSide: Number(6),
		// 				figureDSide: Number(0),
		// 			},
		// 		})
		// 		break
		// 	}
		// 	case FIGURES.Polygon: {
		// 		appContext.dispatch({
		// 			type: 'change-figure-sides',
		// 			payload: {
		// 				figureASide: Number(0),
		// 				figureBSide: Number(0),
		// 				figureCSide: Number(0),
		// 				figureDSide: Number(0),
		// 			},
		// 		})
		// 		break
		// 	}
		// 	default: {
		// 		break
		// 	}
		// }
	}

	return (
		<div className={styles.container}>
			<div className={styles.templates}>
				<div className={styles.infoBlock}>
					<SettingInfo />
				</div>

				<div className={styles.infoBlock}>
					<Figures onChooseFigure={onChooseFigure} />
				</div>
			</div>
		</div>
	)
}

export default SidePanel
