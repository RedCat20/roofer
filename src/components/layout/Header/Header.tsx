import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Header.module.scss'

export const Header = () => {
	const [isActive, setIsActive] = useState(false)
	let location = useLocation()

	// useEffect(() => {
	// 	console.log('location', location)
	// }, [location])

	return (
		<div className={styles.header}>
			<div className={clsx('flex', 'justify-start', styles.logo)}>
				<Link to='/'>
					<div className='flex flex-row items-center'>
						<div className={clsx(styles.imgWrapper)}>
							<img
								className='block w-[30px]'
								src='/logo.png'
								alt='Tile.ua'
								data-pagespeed-url-hash='2528759146'
							/>
						</div>
						<div className={styles.title}>Roofer</div>
					</div>
				</Link>
			</div>

			<div className={styles.types}>
				<Link to='/'>
					<button
						className={clsx(
							'mr-[5px]',
							location?.pathname === '/' ? styles.active : ''
						)}
					>
						Home
					</button>
				</Link>
				<Link to='/dictionary'>
					<button
						className={clsx(
							'mr-[5px] ml-[5px]',
							location?.pathname === '/dictionary' ? styles.active : ''
						)}
					>
						Dictionary
					</button>
				</Link>
				<Link to='/calculator'>
					<button
						className={clsx(
							'ml-[5px]',
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
