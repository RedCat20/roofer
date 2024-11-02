import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
	result: any
}

const CalcResult: FC<Props> = ({ result }) => {
	const { dictionaries } = useSelector((state: any) => state.dictionaries)
	const { editedMode, isBuildMode, selectedFigure } = useSelector(
		(state: any) => state.settings
	)

	function getTrs() {
		let trs = []
		for (
			let i = 0;
			i < dictionaries?.[0]?.exceptions.length &&
			dictionaries?.[0]?.recommended.length &&
			dictionaries?.[0]?.made.length;
			i++
		) {
			trs.push(
				<tr key={'table_tr' + i} className=''>
					<td>{dictionaries?.[0]?.exceptions[i] || '-'}</td>
					<td>{dictionaries?.[0]?.recommended[i] || '-'}</td>
					<td>{dictionaries?.[0]?.made[i] || '-'}</td>
				</tr>
			)
		}
		return trs
	}
	return (
		<>
			{editedMode === 4 && isBuildMode && selectedFigure > 0 && (
				<div
					className='calc-result'
					style={{ display: 'flex', flexDirection: 'column' }}
				>
					<div dangerouslySetInnerHTML={{ __html: result }} />
					<table>
						<thead>
							<tr>
								<th>Не виготовляється</th>
								<th>Рекомендовані довжини</th>
								<th
									style={{
										border: '1px solid silver',
										textAlign: 'center',
										padding: '10px 20px',
									}}
								>
									Виготовляється
								</th>
							</tr>
						</thead>
						<tbody>{getTrs()}</tbody>
					</table>
				</div>
			)}
		</>
	)
}

export default CalcResult
