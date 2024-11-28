const AddTableRowDialog = ({
	modalLength,
	setModalLength,
	exception,
	setException,
	recommended,
	setRecommended,
	made,
	setMade,
}) => {
	return (
		<>
			{modalLength && (
				<div className='add-table-row-modal-wrapper'>
					<div className='modal'>
						<div className='form'>
							<button
								className='pop-up-close'
								onClick={e => {
									setModalLength(false)
								}}
							>
								X
							</button>
							<div className='right'>
								<div className='header'>
									<div>Add row</div>
									<div
										style={{
											fontSize: '12px',
											color: 'darkgray',
											fontWeight: 400,
										}}
									>
										Enter value (such as 1500) or a set of values (such as
										1200-2200)
									</div>
								</div>
								<div>
									<div className='label'>Exceptions</div>
									<input
										type='text'
										value={exception}
										onChange={e => {
											setException(e.target.value)
										}}
									/>
								</div>

								<div>
									<div className='label'>Recommended</div>
									<input
										value={recommended}
										type='text'
										onChange={e => {
											setRecommended(e.target.value)
										}}
									/>
								</div>

								<div>
									<div className='label'>Made</div>
									<input
										type='text'
										value={made}
										onChange={e => {
											setMade(e.target.value)
										}}
									/>
								</div>

								<button className='save' disabled>
									Create
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default AddTableRowDialog
