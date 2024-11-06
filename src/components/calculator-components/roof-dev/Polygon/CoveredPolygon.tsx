// @ts-nocheck

import { FC, useContext, useEffect, useState } from 'react'
// import { ICoords } from '../../../../interfaces/coords'
// import { scalesConfig } from '../../../../data'
// import { AppContext } from '../../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'
import { Layer, Line, Rect, Shape } from 'react-konva'
import { useGridConfig } from '../../../../hooks/useGridConfig'
import { start } from 'repl'

// В метрах
const BLOCK_WIDTH = 420 / 1000
const OVERLAP = 150 / 1000

const m_to_mm = value => {
	return value * 1000
}

const mm_to_m = value => {
	return value / 1000
}

interface Props {
	// cellSize: number
	// gridHeight: number
	// coords: any[]
	// startCoords: ICoords
	dictionaryItem: any
	setCalcResult: any
}

const CoveredPolygon: FC<Props> = ({
	// cellSize,
	// coords,
	// gridHeight,
	// startCoords,
	dictionaryItem,
	setCalcResult,
}) => {
	const gridConfig = useGridConfig()
	const { selectedScale } = useSelector((state: any) => state.settings)
	const { customPoints: _customPoints } = useSelector(
		(state: any) => state.figureParams
	)

	const [_mainBlockHeight, setMainBlockHeight] = useState(0)
	const [_topBlockHeight, setTopBlockHeight] = useState(0)

	// useEffect(() => {
	// 	if (_figureASide && _figureBSide && dictionaryItem) {
	// 		calcBlockHeights()
	// 	}
	// }, [_figureASide, _figureBSide, dictionaryItem])

	////////////////
	// const appContext = useContext(AppContext)
	const [scaledCoords, setScaledCoords] = useState([])
	// const [scaledCoords, setScaledCoords] = useState()

	useEffect(() => {
		if (_customPoints?.length && gridConfig) {
			const { startCoords, cellSize } = gridConfig
			const arr = _customPoints.map(item => {
				return [
					startCoords[0] + item[0] * cellSize,
					startCoords[1] - item[1] * cellSize,
				]
			})
			setScaledCoords([...arr])
		}
	}, [_customPoints, gridConfig])

	const [cellRows, setCellRows] = useState<any[]>([])

	// function recalcCoords() {
	// 	if (scaledCoords?.length !== coords.length) return

	// 	let figureBottomLine =
	// 		-gridHeight / scalesConfig[`${selectedScale}`] + cellSize
	// 	const result = scaledCoords.reduce((a, b) => {
	// 		return a.y < b.y ? a : b
	// 	})
	// 	let diff = -1 * figureBottomLine - -1 * result.y

	// 	let newCoords = []

	// 	for (let i = 0; i < scaledCoords.length; i++) {
	// 		newCoords.push({ x: scaledCoords[i].x, y: scaledCoords[i].y - diff })
	// 	}

	// 	setScaledCoords(newCoords)

	// 	// саме виклик функції. яка ретурнить координати. дозволяє прижати редаговувану-трансформовану фігуру до низу холста
	// 	return newCoords
	// }

	// useEffect(() => {
	// 	recalcCoords()
	// }, [selectedScale])

	useEffect(() => {
		if (_customPoints?.length && dictionaryItem) {
			calcBlockHeights()
		}
	}, [_customPoints, dictionaryItem])

	let getHeight = () => {
		const result_bottom = _customPoints.reduce((a, b) => {
			return a[1] < b[1] ? a : b
		})
		const result_top = _customPoints.reduce((a, b) => {
			return a[1] > b[1] ? a : b
		})

		let height = result_top[1] - result_bottom[1]

		// height = +height.toFixed(2)
		// height = height / 100
		// height = +height.toFixed(2)

		return height
	}

	const calcBlockHeights = () => {
		const _height = getHeight()

		const _mainBlock = mm_to_m(
			Math.max(
				...dictionaryItem.recommended.filter(
					(v: number) => v <= m_to_mm(_height / 2)
				)
			)
		)
		setMainBlockHeight(_mainBlock)

		let _leaveHeight = _height - _mainBlock * 2 + OVERLAP * 2

		for (let i = 0; i < dictionaryItem.made.length; i++) {
			let arrSplit = dictionaryItem.made[i].split('-')
			if (
				m_to_mm(_leaveHeight) > 0 &&
				m_to_mm(_leaveHeight) <= Number(arrSplit[0])
			) {
				const _topBlock = mm_to_m(arrSplit[0])
				console.log('_topBlock 1', _topBlock)
				return setTopBlockHeight(_topBlock)
			} else if (
				m_to_mm(_leaveHeight) >= Number(arrSplit[0]) &&
				m_to_mm(_leaveHeight) <= Number(arrSplit[1])
			) {
				const _topBlock = mm_to_m(arrSplit[1])
				console.log('_topBlock 2', _topBlock)
				return setTopBlockHeight(_topBlock)
			}
		}
	}

	// useEffect(() => {
	// 	setScaledCoords(coords)
	// }, [coords])

	// let getTileBottomSheetRecommend = () => {
	// 	let _triangle_h = getTriangleHeight()

	// 	let halfOfHeight = (_triangle_h / 2) * 1000

	// 	return Math.max(
	// 		...dictionaryItem.recommended.filter((v: number) => v < halfOfHeight)
	// 	)
	// }

	let sceneFunc = function (ctx: any, shape: any) {
		if (!gridConfig) return

		const { startCoords, cellSize, height, width } = gridConfig

		if (scaledCoords?.length > 1) {
			// let coords = recalcCoords().slice()

			let coords = [...scaledCoords]

			// let zoomKoef = 1

			// let step1 = (420 * zoomKoef) / 10

			// let step2 = (1195 * zoomKoef) / 10 // минуле захардкоджене
			// let overlap = (150 * zoomKoef) / 10

			const blockWidth = gridConfig?.blockWidth
			const mainBlockHeight = _mainBlockHeight * cellSize
			const topBlockHeight = _topBlockHeight * cellSize

			let step1 = blockWidth
			let step2 = mainBlockHeight

			const overlap = gridConfig?.overlap

			/// ----------------------------------
			/// Draw figure

			ctx.beginPath()

			console.log('coords', coords)

			ctx.moveTo(coords[0][0], coords[0][1])

			for (let i = 0; i < coords.length; i++) {
				ctx.lineTo(coords[i][0], coords[i][1])
			}

			ctx.closePath()

			ctx.fillStyle = 'gold'
			ctx.lineWidth = 2
			ctx.stroke()
			ctx.fill()

			ctx.fillStrokeShape(shape)

			// -----
			let arr = []
			let counter = 0
			// -----

			// let closestLeft = getTileBottomSheetRecommend()

			// let _triangle_h = getTriangleHeight()

			// step2 = (closestLeft * zoomKoef) / 10

			// // ----

			let first_row_blocks_count = 0
			let second_row_blocks_count = 0
			let top_row_blocks_count = 0

			let cyrcle_counter = 0

			let figureBottomLine = startCoords[1]

			// let value = 0

			// let leave = _triangle_h * 1000 - closestLeft * 2

			// dictionaryItem.made.forEach((item: any) => {
			// 	let arrSplit = item.split('-')
			// 	if (
			// 		(leave >= Number(arrSplit[0]) && leave <= Number(arrSplit[1])) ||
			// 		leave < Number(arrSplit[0])
			// 	) {
			// 		value = ((leave / 10) * cellSize) / 100
			// 		//  line = leave * cellSize / 100;
			// 	} else {
			// 		// value = 0;
			// 	}
			// })

			// /// -----------------------------------------
			// /// Start Cyrcle
			// /// -----------------------------------------

			console.log('figureBottomLine: ', figureBottomLine)

			console.log('startCoords[1]: ', startCoords[1])
			console.log('width: ', width)
			console.log('step1: ', step1)
			console.log('step2: ', step2)

			let x_counter = 0

			for (
				let j = startCoords[1];
				j >= startCoords[1] - mainBlockHeight * 3;
				j -= mainBlockHeight
			) {
				cyrcle_counter++

				for (
					let i = startCoords[0];
					i < startCoords[0] + mainBlockHeight * 3;
					i += blockWidth - overlap
				) {
					/// Проходимся по фігурі
					for (let a = 0; a <= blockWidth; a++) {
						let flag = false
						for (let b: number = 0; b <= mainBlockHeight; b++) {
							let isPointInPath = ctx.isPointInPath(i + a, j - b)
							// if (b < 10) console.log('(i + a)', i + a)
							// if (b < 10) console.log('-((j + b)', j - b)
							if (isPointInPath) {
								console.log('= = = = = =  = = = == ===== = = ==')
								console.log('isPointInPath')
								console.log('j: ', j)
								console.log('i: ', i)
							}
							if (isPointInPath) {
								if (cyrcle_counter === 1) {
									first_row_blocks_count += 1
								} else if (cyrcle_counter === 2) {
									second_row_blocks_count += 1
								} else if (cyrcle_counter === 3) {
									top_row_blocks_count += 1
								}
								if (cyrcle_counter === 1) {
									arr.push(
										<Rect
											key={`polygon-${Math.random()}`}
											x={i}
											y={startCoords[1] - mainBlockHeight}
											width={blockWidth}
											height={mainBlockHeight}
											fill='white'
											opacity={1}
											strokeWidth={2}
											// stroke={'black'}
											radius={20}
											zIndex={7}
											fill='rgba(205, 129, 6, 0.3)'
										/>
									)
									// arr.push(
									// 	<Line
									// 		key={`covered-rectangle-horizontal-overlap-${Math.random()}`}
									// 		x={i + a}
									// 		y={j - b}
									// 		width={2}
									// 		points={[0, 0, blockWidth, 0, 0]}
									// 		stroke='red'
									// 		zIndex={12}
									// 	/>
									// )
									// arr.push(
									// 	<Line
									// 		key={`covered-rectangle-vertical-overlap-${Math.random()}`}
									// 		x={i + blockWidth - overlap}
									// 		y={startCoords[1] - mainBlockHeight}
									// 		width={1}
									// 		points={[0, 0, 0, mainBlockHeight, 0]}
									// 		stroke='darkbrown'
									// 		zIndex={8}
									// 	/>
									// )
									flag = true
									break
								}
								if (cyrcle_counter === 2) {
									arr.push(
										<Rect
											key={`polygon-${Math.random()}`}
											x={i}
											y={startCoords[1] - mainBlockHeight * 2 + overlap}
											width={blockWidth}
											height={mainBlockHeight}
											// fill='white'
											opacity={1}
											strokeWidth={2}
											// stroke={'black'}
											radius={20}
											zIndex={7}
											fill='rgba(205, 129, 6, 0.3)'
										/>
									)
									// arr.push(
									// 	<Line
									// 		key={`covered-rectangle-horizontal-overlap-${Math.random()}`}
									// 		x={i}
									// 		y={startCoords[1] - mainBlockHeight * 2 + overlap}
									// 		width={1}
									// 		points={[0, 0, blockWidth, 0, 0]}
									// 		stroke='darkbrown'
									// 		zIndex={8}
									// 	/>
									// )
									// arr.push(
									// 	<Line
									// 		key={`covered-rectangle-vertical-overlap-${Math.random()}`}
									// 		x={i + blockWidth - overlap}
									// 		y={startCoords[1] - mainBlockHeight * 2 + overlap}
									// 		width={1}
									// 		points={[0, 0, 0, mainBlockHeight, 0]}
									// 		stroke='darkbrown'
									// 		zIndex={8}
									// 	/>
									// )
									flag = true
									break
								}
								if (cyrcle_counter === 3) {
									//// Top row
									arr.push(
										<Rect
											key={`polygon-${Math.random()}`}
											x={i > 0 ? i : i - overlap}
											y={
												startCoords[1] -
												mainBlockHeight * 2 -
												topBlockHeight +
												overlap * 2
											}
											width={blockWidth}
											height={topBlockHeight}
											fill='rgba(205, 129, 6, 0.3)'
											opacity={1}
											strokeWidth={2}
											// stroke={'black'}
											radius={20}
											//draggable
											zIndex={7}
										/>
									)
									// arr.push(
									// 	<Line
									// 		key={`covered-rectangle-vertical-overlap-${Math.random()}`}
									// 		x={i + blockWidth - overlap}
									// 		y={
									// 			startCoords[1] -
									// 			mainBlockHeight * 2 -
									// 			topBlockHeight +
									// 			overlap * 2
									// 		}
									// 		width={1}
									// 		points={[0, 0, 0, topBlockHeight, 0]}
									// 		stroke='darkbrown'
									// 		zIndex={8}
									// 	/>
									// )
									flag = true
									break
								}
							}
						}
						if (flag) break
					}
					x_counter++
				}
				counter++
			}

			// let figure_square = 0

			// setCalcResult(`
			//     <div>
			//        <br/>
			//         Площа фігури трапеції ${figure_square} м2.
			//          <br/>
			//          <br/>
			//         Листи 1 ряду: ${first_row_blocks_count} шт - ${
			// 	step1 / 100
			// } м x ${closestLeft / 1000} м;
			//          <br/>
			//         Листи 2 ряду: ${second_row_blocks_count} шт - ${
			// 	step1 / 100
			// } м x ${closestLeft / 1000} м;
			//         <br/>
			//         Листи 3 ряду: ${top_row_blocks_count} шт - ${
			// 	step1 / 100
			// } м x ${value / 1000} м;
			//          <br/>
			//      </div>
			//      <br/>
			//      <br/>
			// `)

			console.log('ARRAY: ', arr)

			setCellRows(arr)
		}
	}

	return (
		<>
			<Layer>{cellRows}</Layer>
			<Layer>
				<Shape
					x={0}
					y={0}
					strokeWidth={2}
					stroke={'black'}
					sceneFunc={sceneFunc.bind(this)}
					opacity={0.2}
				/>
			</Layer>
		</>
	)
}

export default CoveredPolygon