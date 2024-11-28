import { FC } from 'react'

import EditedPointedPolygon from './EditedPointedPolygon'
import CreativePointedPolygon from './CreativePointedPolygon'
import CoveredPolygon from './CoveredPolygon'
import { useSelector } from 'react-redux'

interface Props {
	clickedCoords: any
	polygonCoords: any[] | null
	setSelectedPolygonId: (id: any) => void
	setNewSidesCallback: (points: any) => void
	calcPolygonPointsCallback: (points: any[]) => void
	selectedPolygonId: any
	selectedPolygonShapeName: any
	setCalcResult: any
}

const PolygonContainer: FC<Props> = ({ setCalcResult }) => {
	const { dictionaries } = useSelector((state: any) => state.dictionaries)
	const { customPoints } = useSelector((state: any) => state.figureParams)

	const { editedMode } = useSelector((state: any) => state.settings)

	return (
		<>
			{editedMode === 1 && (
				<CreativePointedPolygon customPoints={customPoints} />
			)}

			{editedMode === 3 && <EditedPointedPolygon customPoints={customPoints} />}

			{editedMode === 4 && (
				<CoveredPolygon
					dictionaryItem={dictionaries?.[0]}
					setCalcResult={setCalcResult}
				/>
			)}
		</>
	)
}

export default PolygonContainer
