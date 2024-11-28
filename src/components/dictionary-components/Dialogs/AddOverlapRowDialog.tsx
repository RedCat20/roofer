// @ts-nocheck

import React, { FC, useEffect, useState } from 'react'

interface IAddTableRowDialogProps {
	onCreateOverlapCallback: any
	onCloseOverlapCallback: any
}

const AddOverlapRowDialog: FC<IAddTableRowDialogProps> = ({
	onCreateOverlapCallback,
	onCloseOverlapCallback,
}) => {
	function onCreateOverlap() {
		onCreateOverlapCallback({
			general: generalOverlap,
			useful: usefulOverlap,
			overlap: overlap,
		})
	}

	const [generalOverlap, setGeneralOverlap] = useState(0)
	const [usefulOverlap, setUsefulOverlap] = useState(0)
	const [overlap, setOverlap] = useState(0)

	useEffect(() => {
		if (generalOverlap > 0 && usefulOverlap > 0)
			setOverlap(generalOverlap - usefulOverlap)
	}, [generalOverlap, usefulOverlap])

	{
		/* Модалка для додавання довжин блоків певної категорії */
	}

	return (
		<>
			<div className='add-table-row-modal-wrapper'>
				<div className='modal'>
					<div className='form'>
						<button
							className='pop-up-close'
							onClick={e => {
								onCloseOverlapCallback(false)
							}}
						>
							X
						</button>
						<div className='right'>
							<div className='header'>
								<div>Add overlap row (mm)</div>
							</div>
							<div>
								<div className='label'>General overlap width</div>
								<input
									type='number'
									value={generalOverlap}
									onChange={e => {
										setGeneralOverlap(e.target.value)
									}}
								/>
							</div>

							<div>
								<div className='label'>Useful overlap width</div>
								<input
									value={usefulOverlap}
									type='number'
									onChange={e => {
										setUsefulOverlap(e.target.value)
									}}
								/>
							</div>

							<div>
								<div className='label'>Overlap</div>
								<input
									style={{ background: '#efefef' }}
									type='number'
									disabled={true}
									value={overlap}
								/>
							</div>

							<button className='save' disabled>`Create`</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddOverlapRowDialog
