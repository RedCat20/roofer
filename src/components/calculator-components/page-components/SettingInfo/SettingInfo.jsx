import { useSelector } from 'react-redux'

export const SettingInfo = () => {
	const { selectedScale } = useSelector(state => state.settings)

	const config = {
		squareS: { value: 1, unit: 'm2' },
		overlap: { value: 150, unit: 'mm' },
		blockWidth: { value: 420, unit: 'mm' },
		scale: selectedScale,
	}

	return (
		<>
			<div>
				Cell square: {config.squareS.value} {config.squareS.unit}
			</div>
			<div>
				Overlap: {config.overlap.value} {config.overlap.unit}
			</div>
			<div>
				Sheet width: {config.blockWidth.value} {config.blockWidth.unit}
			</div>
			<div>
				<b>Scale: {config.scale}:100</b>
			</div>
		</>
	)
}
