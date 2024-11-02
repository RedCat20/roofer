// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'

import { Layer, Line, Rect, Shape } from 'react-konva'
import { ICoords } from '../../../../interfaces/coords'
import { scalesConfig } from '../../../../data'
import { AppContext } from '../../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
	cellSize: number
	gridHeight: number
	coords: any[]
	startCoords: ICoords
	dictionaryItem: any
	setCalcResult: any
}

const CoveredPolygon: FC<Props> = ({
	cellSize,
	coords,
	gridHeight,
	startCoords,
	dictionaryItem,
	setCalcResult,
}) => {
	const appContext = useContext(AppContext)

	const [scaledCoords, setScaledCoords] = useState()
	const { selectedScale } = useSelector((state: any) => state.settings)

	const [cellRows, setCellRows] = useState<any[]>([])

	function recalcCoords() {
		if (scaledCoords?.length !== coords.length) return

		let figureBottomLine =
			-gridHeight / scalesConfig[`${selectedScale}`] + cellSize
		const result = scaledCoords.reduce((a, b) => {
			return a.y < b.y ? a : b
		})
		let diff = -1 * figureBottomLine - -1 * result.y

		let newCoords = []

		for (let i = 0; i < scaledCoords.length; i++) {
			newCoords.push({ x: scaledCoords[i].x, y: scaledCoords[i].y - diff })
		}

		setScaledCoords(newCoords)

		// саме виклик функції. яка ретурнить координати. дозволяє прижати редаговувану-трансформовану фігуру до низу холста
		return newCoords
	}

	useEffect(() => {
		recalcCoords()
	}, [selectedScale])

	useEffect(() => {
		setScaledCoords(coords)
	}, [coords])

	let getTileBottomSheetRecommend = () => {
		let _triangle_h = getTriangleHeight()

		let halfOfHeight = (_triangle_h / 2) * 1000

		return Math.max(
			...dictionaryItem.recommended.filter((v: number) => v < halfOfHeight)
		)
	}

	let getTriangleHeight = () => {
		const result_bottom = scaledCoords.reduce((a, b) => {
			return a.y < b.y ? a : b
		})
		const result_top = scaledCoords.reduce((a, b) => {
			return a.y > b.y ? a : b
		})

		let height = result_top.y - result_bottom.y

		height = +height.toFixed(2)
		height = height / 100
		height = +height.toFixed(2)

		return height
	}

	let sceneFunc = function (ctx: any, shape: any) {
		if (scaledCoords?.length > 1) {
			let coords = recalcCoords().slice()

			let zoomKoef = 1

			let step1 = (420 * zoomKoef) / 10

			let step2 = (1195 * zoomKoef) / 10 // минуле захардкоджене
			let overlap = (150 * zoomKoef) / 10

			/// ----------------------------------
			/// Draw figure

			ctx.beginPath()

			ctx.moveTo(coords[0].x, coords[0].y)

			for (let i = 0; i < coords.length; i++) {
				ctx.lineTo(coords[i].x, coords[i].y)
			}

			ctx.closePath()
			ctx.fillStyle = 'gold'
			ctx.lineWidth = 2
			ctx.stroke()
			ctx.fill()

			ctx.closePath()
			ctx.stroke()
			ctx.fillStrokeShape(shape)

			// -----
			let arr = []
			let counter = 0
			// -----

			// ----

			let closestLeft = getTileBottomSheetRecommend()

			let _triangle_h = getTriangleHeight()

			step2 = (closestLeft * zoomKoef) / 10

			// ----

			let first_row_blocks_count = 0
			let second_row_blocks_count = 0
			let top_row_blocks_count = 0

			let cyrcle_counter = 0

			let figureBottomLine =
				-gridHeight / scalesConfig[`${selectedScale}`] + cellSize

			let value = 0

			let leave = _triangle_h * 1000 - closestLeft * 2

			dictionaryItem.made.forEach((item: any) => {
				let arrSplit = item.split('-')
				if (
					(leave >= Number(arrSplit[0]) && leave <= Number(arrSplit[1])) ||
					leave < Number(arrSplit[0])
				) {
					value = ((leave / 10) * cellSize) / 100
					//  line = leave * cellSize / 100;
				} else {
					// value = 0;
				}
			})

			/// -----------------------------------------
			/// Start Cyrcle
			/// -----------------------------------------

			for (let j = figureBottomLine; j <= cellSize; j += step2) {
				cyrcle_counter = cyrcle_counter + 1

				for (let i = cellSize; i < 1100; i += step1) {
					/// Проходимся по фігурі
					for (let a = 0; a < step1; a++) {
						let flag = false

						for (let b: number = 0; b < step2; b++) {
							let isPointInPath = ctx.isPointInPath(
								(i + a) * scalesConfig[`${selectedScale}`],
								-((j + b) * scalesConfig[`${selectedScale}`])
							)

							if (isPointInPath) {
								if (cyrcle_counter === 1) {
									first_row_blocks_count += 1
								} else if (cyrcle_counter === 2) {
									second_row_blocks_count += 1
								} else if (cyrcle_counter === 3) {
									top_row_blocks_count += 1
								}

								if (cyrcle_counter < 3) {
									arr.push(
										<Rect
											key={`polygon-${Math.random()}`}
											x={i}
											y={figureBottomLine + step2 * counter}
											width={step1}
											height={step2}
											fill='white'
											opacity={1}
											strokeWidth={2}
											stroke={'black'}
											radius={20}
											zIndex={7}
										/>
									)

									arr.push(
										<Line
											key={`covered-rectangle-horizontal-overlap-${Math.random()}`}
											x={i}
											//y={figureBottomLine - step2 * counter + overlap}
											y={figureBottomLine + step2 * (counter + 1) - overlap}
											width={1}
											points={[0, 0, step1, 0, 0]}
											stroke='darkbrown'
										/>
									)
									arr.push(
										<Line
											key={`covered-rectangle-vertical-overlap-${Math.random()}`}
											x={i + overlap}
											//y={figureBottomLine - step2 * counter}
											y={figureBottomLine + step2 * counter}
											width={1}
											points={[0, 0, 0, step2, 0]}
											stroke='darkbrown'
										/>
									)
									flag = true
									break
								}

								if (cyrcle_counter === 3) {
									//// Top row

									arr.push(
										<Rect
											key={`polygon-${Math.random()}`}
											x={i}
											// y={figureBottomLine + step2 * counter}
											y={figureBottomLine + step2 * counter}
											width={step1}
											height={value}
											// height={step2 + (j + b)}
											fill='white'
											opacity={1}
											strokeWidth={2}
											stroke={'black'}
											radius={20}
											//draggable
											zIndex={7}
										/>
									)

									arr.push(
										<Line
											key={`covered-rectangle-vertical-overlap-${Math.random()}`}
											x={i + overlap}
											y={figureBottomLine + step2 * counter}
											width={1}
											points={[0, 0, 0, value, 0]}
											stroke='darkbrown'
										/>
									)

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

			let figure_square = 0

			setCalcResult(`
                <div>
                   <br/>
                    Площа фігури трапеції ${figure_square} м2.
                     <br/>
                     <br/>
                    Листи 1 ряду: ${first_row_blocks_count} шт - ${
				step1 / 100
			} м x ${closestLeft / 1000} м;
                     <br/>
                    Листи 2 ряду: ${second_row_blocks_count} шт - ${
				step1 / 100
			} м x ${closestLeft / 1000} м;
                    <br/>
                    Листи 3 ряду: ${top_row_blocks_count} шт - ${
				step1 / 100
			} м x ${value / 1000} м;
                     <br/>
                 </div>
                 <br/>
                 <br/>
            `)

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
