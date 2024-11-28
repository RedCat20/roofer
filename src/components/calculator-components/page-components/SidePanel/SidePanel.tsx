// @ts-nocheck

import React, { FC, useContext } from 'react'
import styles from './SidePanel.module.scss'
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
	const { selectedFigure } = useSelector((state: any) => state.settings)

	const dispatch = useDispatch()

	function onChooseFigure(e: any) {
		let figureBtnId = e.target.id
		let re = new RegExp('(?<=_).*')
		if (!figureBtnId.match(re)) {
			return
		}
		let subStrId = figureBtnId.match(re)[0]
		let figureId = Number(subStrId)

		dispatch(setSelectedFigure(figureId))
		dispatch(setEditedMode(1))
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
