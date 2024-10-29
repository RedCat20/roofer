import React, { FC, useState } from 'react'
import styles from './AddCategoryDialog.module.scss'

interface IAddTableRowDialogProps {
	modalCategory: any
	setModalCategory: any
	onCreateCategoryCallback: any
}

const AddCategoryDialog: FC<IAddTableRowDialogProps> = ({
	modalCategory,
	setModalCategory,
	onCreateCategoryCallback,
}) => {
	const [selectedFile, setSelectedFile] = useState(undefined)
	const [name, setName] = useState('')

	function onCreateCategory() {
		let obj = {
			selectedFile: selectedFile,
			name: name,
		}
		onCreateCategoryCallback(obj)
	}

	const onSelectFile = (e: any) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined)
			return
		}

		var binaryData = []
		binaryData.push(selectedFile)
		// @ts-ignore
		let objectUrl = window.URL.createObjectURL(
			// @ts-ignore
			new Blob(binaryData, { type: 'image' })
		)

		console.log('e.target.files[0]: ', e.target.files[0])
		setSelectedFile(e.target.files[0])
	}

	return (
		<>
			{modalCategory && (
				<div className={styles.modalWrapper}>
					<div className={styles.modal}>
						<div className={styles.form}>
							<button
								className={styles.close}
								onClick={e => {
									setModalCategory(false)
								}}
							>
								X
							</button>

							<div className={styles.right}>
								<div className={styles.header}>Створити категорію</div>

								<div className={styles.fieldset}>
									<div className={styles.label}>Назва</div>
									<input
										type='text'
										onChange={e => setName(e.target.value)}
										value={name}
									/>
								</div>

								<div className={styles.fieldset}>
									<div className={styles.label}>Фото</div>
									<input type='file' accept='image/*' onChange={onSelectFile} />
								</div>

								<button
									className={styles.save}
									// onClick={e => onCreateCategory()}
									onClick={e => {}}
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

export default AddCategoryDialog
