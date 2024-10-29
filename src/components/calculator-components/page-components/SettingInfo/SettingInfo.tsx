// @ts-nocheck
import { useContext } from 'react'
import { AppContext } from '../../../../context/AppContext'
import { scalesConfig } from '../../../../data'

export const SettingInfo = () => {
	const appContext = useContext(AppContext)

	const config = {
		squareS: { value: 1, unit: 'м2' },
		overlap: { value: 150, unit: 'мм' },
		blockWidth: { value: 420, unit: 'мм' },
		scale: scalesConfig?.[`${appContext?.state?.selectedScale}`],
	}

	return (
		<>
			<div>
				Площа квадрата: {config.squareS.value} {config.squareS.unit}
			</div>
			<div>
				Дефолтний нахльост: {config.overlap.value} {config.overlap.unit}
			</div>
			<div>
				Ширина блока: {config.blockWidth.value} {config.blockWidth.unit}
			</div>
			<div>
				<b>Масштаб: {config.scale}:100</b>
			</div>
		</>
	)
}
