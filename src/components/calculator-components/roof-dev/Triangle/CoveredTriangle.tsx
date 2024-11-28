// @ts-nocheck

import { FC, useContext, useEffect, useState } from 'react'
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
	dictionaryItem: any
	setCalcResult: any
}

const CoveredPolygon: FC<Props> = ({ dictionaryItem, setCalcResult }) => {
	const gridConfig = useGridConfig()
	const { selectedScale } = useSelector((state: any) => state.settings)
	const { figurePoints: _customPoints } = useSelector(
		(state: any) => state.figureParams
	)
	const dispatch = useDispatch()

	const [_mainBlockHeight, setMainBlockHeight] = useState(0)
	const [_topBlockHeight, setTopBlockHeight] = useState(0)

	const [scaledCoords, setScaledCoords] = useState([])

	useEffect(() => {
		if (_customPoints?.length && gridConfig) {
			const { startCoords, cellSize } = gridConfig

			const diffX =
				_customPoints.reduce((a, b) => {
					return a[0] - startCoords[0] < b[0] - startCoords[0] ? a : b
				})?.[0] || 0

			const diffY =
				_customPoints.reduce((a, b) => {
					return a[1] < b[1] ? a : b
				})?.[1] || 0

			let newArr = _customPoints.map((item, idx) => {
				return [item[0] - diffX, item[1] - diffY]
			})

			let arr = [...newArr].map(item => {
				return [
					startCoords[0] + item[0] * cellSize,
					startCoords[1] - item[1] * cellSize,
				]
			})

			setScaledCoords([...arr])
		}
	}, [_customPoints, gridConfig])

	const [cellRows, setCellRows] = useState<any[]>([])

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

	const getRoofWidth = () => {
		const minX =
			scaledCoords.reduce((a, b) => {
				return a[0] < b[0] ? a : b
			})?.[0] || 0
		const maxX =
			scaledCoords.reduce((a, b) => {
				return a[0] > b[0] ? a : b
			})?.[0] || 0

		return maxX - minX
	}

	let sceneFunc = function (ctx: any, shape: any) {
		if (!gridConfig) return

		const { startCoords, cellSize, height, width } = gridConfig

		if (scaledCoords?.length > 1) {
			let coords = [...scaledCoords]

			const blockWidth = gridConfig?.blockWidth
			const mainBlockHeight = _mainBlockHeight * cellSize
			const topBlockHeight = _topBlockHeight * cellSize

			let step1 = blockWidth
			let step2 = mainBlockHeight

			const overlap = gridConfig?.overlap

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

			let arr = []
			let counter = 0

			let first_row_blocks_count = 0
			let second_row_blocks_count = 0
			let top_row_blocks_count = 0

			let cyrcle_counter = 0

			let figureBottomLine = startCoords[1]

			/// Start Cyrcle

			const width = getRoofWidth()

			for (
				let j = startCoords[1];
				j >= startCoords[1] - mainBlockHeight * 2;
				j -= mainBlockHeight - overlap
			) {
				cyrcle_counter++

				for (
					let i = startCoords[0];
					i < startCoords[0] + width;
					// i < startCoords[0] + mainBlockHeight * 2;
					i += blockWidth - overlap
				) {
					/// Проходимся по фігурі
					for (let a = 0; a <= blockWidth; a++) {
						let flag = false

						for (let b: number = 0; b <= mainBlockHeight; b++) {
							let isPointInPath = ctx.isPointInPath(i + a, j - b)
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
											// y={startCoords[1] - mainBlockHeight}
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
									// 		stroke={'black'}
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
									// 		x={i + a}
									// 		y={j - b}
									// 		width={2}
									// 		points={[0, 0, blockWidth, 0, 0]}
									// 		stroke={'black'}
									// 		zIndex={12}
									// 	/>
									// )
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
									// 		key={`covered-rectangle-horizontal-overlap-${Math.random()}`}
									// 		x={i + a}
									// 		y={j - b}
									// 		width={2}
									// 		points={[0, 0, blockWidth, 0, 0]}
									// 		stroke={'black'}
									// 		zIndex={12}
									// 	/>
									// )

									// arr.push(
									// 	<Line
									// 		key={`covered-rectangle-horizontal-overlap-${Math.random()}`}
									// 		x={i + a}
									// 		y={j - b - topBlockHeight}
									// 		width={2}
									// 		points={[0, 0, blockWidth, 0, 0]}
									// 		stroke={'black'}
									// 		zIndex={12}
									// 	/>
									// )

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
					fill='olive'
					opacity={0.2}
				/>
			</Layer>
		</>
	)
}

export default CoveredPolygon
