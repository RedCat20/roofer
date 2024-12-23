import { FC } from 'react'
import clsx from 'clsx'
import styles from './DataError.module.scss'

type Props = {
	errorText?: string
}

export const DataError: FC<Props> = ({
	errorText = 'Дані не завантажено, сталася помилка',
}) => {
	return (
		<div className={clsx(styles.container)}>
			<div className={styles.error}>{errorText}</div>
		</div>
	)
}
