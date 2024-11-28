import { FC, useState } from 'react'
import styles from './AddCategoryDialog.module.scss'

interface IAddTableRowDialogProps {
	modalCategory: any
	setModalCategory: any
	onCreateCategoryCallback: any
}

const AddCategoryDialog: FC<IAddTableRowDialogProps> = ({
	modalCategory,
	setModalCategory,
}) => {
	const [name, setName] = useState('')

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
								<div className={styles.header}>Create a category</div>
								<div className={styles.warning}>Its not possible right now</div>
								<div className={styles.fieldset}>
									<div className={styles.label}>Name</div>
									<input
										type='text'
										onChange={e => setName(e.target.value)}
										value={name}
									/>
								</div>

								<div className={styles.fieldset}>
									<div className={styles.label}>Image</div>
									<input type='file' title='FIle' accept='image/*' />
								</div>

								<button className={styles.save} disabled>
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

export default AddCategoryDialog
