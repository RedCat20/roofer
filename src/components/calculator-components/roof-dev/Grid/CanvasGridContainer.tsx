// @ts-nocheck
import { FC, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useGridConfig } from '../../../../hooks/useGridConfig'
import CanvasSimpleGrid from './CanvasSimpleGrid'

interface Props {}

const CanvasGridContainer: FC<Props> = ({}) => {
	const gridConfig = useGridConfig()
	const { selectedScale } = useSelector((state: any) => state.settings)

	if (!gridConfig) return

	return (
		<>
			<CanvasSimpleGrid
				startCoords={gridConfig?.startCoords}
				cellSize={gridConfig?.cellSize}
				scale={selectedScale}
			/>
		</>
	)
}

export default CanvasGridContainer
