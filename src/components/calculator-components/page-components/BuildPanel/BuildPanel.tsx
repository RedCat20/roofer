import { FC } from 'react'
import FigureActions from '../FigureActions/FigureActions'
import styles from './BuildPanel.module.scss'

interface Props {}

const BuildPanel: FC<Props> = ({}) => {
	return (
		<>
			<div className={styles.content}>
				<div className={styles.panel}>
					<FigureActions />
				</div>
			</div>
		</>
	)
}

export default BuildPanel
