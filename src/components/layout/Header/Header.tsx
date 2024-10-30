import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Header.module.scss'

export const Header = () => {
	let location = useLocation()

	return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<Link to='/' className={styles.mainLink}>
					<div className={styles.imgWrapper}>
						<img
							src='/logo.png'
							alt='Tile.ua'
							data-pagespeed-url-hash='2528759146'
						/>
					</div>
					<div className={styles.title}>Roofer</div>
				</Link>
			</div>

			<div className={styles.types}>
				<Link to='/'>
					<button
						className={clsx(
							styles.linkBtn,
							location?.pathname === '/' ? styles.active : ''
						)}
					>
						Home
					</button>
				</Link>
				<Link to='/dictionary'>
					<button
						className={clsx(
							styles.linkBtn,
							location?.pathname === '/dictionary' ? styles.active : ''
						)}
					>
						Dictionary
					</button>
				</Link>
				<Link to='/calculator'>
					<button
						className={clsx(
							styles.linkBtn,
							location?.pathname === '/calculator' ? styles.active : ''
						)}
					>
						Calculator
					</button>
				</Link>
			</div>
		</div>
	)
}
