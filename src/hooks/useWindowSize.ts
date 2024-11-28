import { useLayoutEffect, useState } from 'react'

type Size = [number, number]

export function useWindowSize(): Size {
	const [size, setSize] = useState<Size>([0, 0])
	useLayoutEffect(() => {
		function updateSize() {
			setSize([
				document.documentElement.clientWidth ||
					window.document.body.clientWidth ||
					window.innerWidth,
				window.innerHeight,
			])
		}
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	}, [])
	return size
}
