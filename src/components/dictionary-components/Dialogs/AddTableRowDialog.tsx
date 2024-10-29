import React, { FC, useState } from 'react'

interface IAddTableRowDialogProps {
	modalLength: any
	setModalLength: any

	exception: any
	setException: any

	recommended: any
	setRecommended: any

	made: any
	setMade: any

	onCreateLengthCallback: any
}

const AddTableRowDialog: FC<IAddTableRowDialogProps> = ({
	modalLength,
	setModalLength,
	exception,
	setException,
	recommended,
	setRecommended,
	made,
	setMade,
	onCreateLengthCallback,
}) => {
	function onCreateLength() {
		onCreateLengthCallback()
	}

	{
		/* Модалка для додавання довжин блоків певної категорії */
	}

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
									<div>Додати рядок</div>
									<div
										style={{
											fontSize: '12px',
											color: 'darkgray',
											fontWeight: 400,
										}}
									>
										Введіть одне значення або проміжок значень через дефіс
									</div>
								</div>
								<div>
									<div className='label'>Не виготовляється</div>
									<input
										type='text'
										value={exception}
										onChange={e => {
											setException(e.target.value)
										}}
									/>
								</div>

								<div>
									<div className='label'>Рекомендована довжина</div>
									<input
										value={recommended}
										type='text'
										onChange={e => {
											setRecommended(e.target.value)
										}}
									/>
								</div>

								<div>
									<div className='label'>Виготовляється</div>
									<input
										type='text'
										value={made}
										onChange={e => {
											setMade(e.target.value)
										}}
									/>
								</div>

								<button
									className='save'
									onClick={e => {
										// onCreateLength()
									}}
								>
									Створити
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
