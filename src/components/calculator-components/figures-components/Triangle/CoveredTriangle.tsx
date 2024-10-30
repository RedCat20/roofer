// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'

import { Layer, Shape } from 'react-konva'
import { scalesConfig } from '../../../../data'
import { AppContext } from '../../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'

import {
	getNewScaledCoords,
	getRecalcTriangleSides,
	getFigureHeight,
	setRecalcSidesToInputs,
	setRecalcTriangleSidesToInputs,
} from '../../../../helpers/scale.helper'
import {
	getTileBottomSheetRecommend,
	getTileTopSheetMade,
} from '../../../../helpers/dictionary.helper'

import VerticalLine from '../../covered-items-components/VerticalLine'
import SheetRectangle from '../../covered-items-components/SheetRectangle'
import HorizontalLine from '../../covered-items-components/HorizontalLine'

interface Props {
	cellSize: number
	gridHeight: number
	coords: any[]
	dictionaryItem: any

	figureASide: number
	figureBSide: number
	figureCSide: number

	setCalcResult: any
	startCoords: any
}

const CoveredTriangle: FC<Props> = ({
	cellSize,
	coords,
	gridHeight,
	dictionaryItem,
	figureASide,
	figureBSide,
	figureCSide,
	setCalcResult,
	startCoords,
}) => {
	const appContext = useContext(AppContext)
	const { selectedScale } = useSelector((state: any) => state.settings)

	const [scaledCoords, setScaledCoords] = useState(null)
	const [cellRows, setCellRows] = useState<any[]>([])
	const [sides, setSides] = useState({ a: 0, b: 0, c: 0 })

	// --------------------------------------------------------
	// Настройки компоненти

	function getRecalcCoords() {
		if (scaledCoords?.length !== 3) return

		let figureBottomLine =
			-gridHeight / scalesConfig[`${selectedScale}`] + cellSize
		return getNewScaledCoords(scaledCoords, figureBottomLine)
	}

	useEffect(() => {
		// подальше масштабування не викликає цей метод, повернення на цю вкладку викликає
		// console.log('ПО відрендерилося вперше!, ');
	}, [])

	useEffect(() => {
		// при першому рендерингу теж відбувається, але поле не порожнє, а з цифрою
		if (scaledCoords?.length > 0) {
			setSides(getRecalcTriangleSides(scaledCoords))
			setRecalcTriangleSidesToInputs(scaledCoords)
		} else if (coords.length === 3) {
			setScaledCoords(coords)
		}
	}, [scaledCoords])

	useEffect(() => {
		// при першому рендерингу теж відбувається, але поле не порожнє, а з цифрою
		setScaledCoords(scaledCoords?.length === 3 ? getRecalcCoords() : coords)
	}, [selectedScale])

	// --------------------------------------------------------
	// Витягування параметрів для блоків по довіднику

	let getLeaveTileSheet = (tileBottomSheetHeightInMm, croossY, bottomLine) => {
		// приходить все плюсове

		let lessValue = bottomLine - croossY

		lessValue *= 10

		let _triangle_h = getFigureHeight(scaledCoords)

		let halfOfHeight = (_triangle_h / 2) * 1000

		let res = Math.max(
			...dictionaryItem.recommended.filter((v: number) => v < halfOfHeight)
		)

		let index = dictionaryItem.recommended.indexOf(res.toString())

		let item = res

		if (index > 0) {
			item = dictionaryItem.made[index - 1]
		}

		let arrSplit = item?.split('-')

		if (!arrSplit && arrSplit.length === 0) {
			return tileBottomSheetHeightInMm * 10
		}

		let value = tileBottomSheetHeightInMm * 10

		for (let n = 0; n < dictionaryItem.made.length; n++) {
			if (!dictionaryItem.made[index - 1 - n]) {
				// коли вже далі немає куди йти в циклі, бо значень в виготовляється вже немає
				break
			}

			item = dictionaryItem.made[index - 1 - n]
			let arrSplit2 = item?.split('-')

			if (
				!arrSplit2 ||
				arrSplit2.length === 0 ||
				arrSplit2[0].length === 0 ||
				arrSplit2[1].length === 0
			) {
				// коли строка не поділилася по тире, або коли по ліву чи по праву сторону тире немає значення
				break
			}

			if (
				lessValue >= Number(arrSplit2[0]) &&
				lessValue <= Number(arrSplit2[1])
			) {
				value = lessValue // коли між 2 підходящими значеннями в довіднику, підставляємо ідентичну цифру +
				// тут супер, тютінька в тютіньку, виходимо з циклу
				break
			} else if (lessValue <= Number(arrSplit2[0])) {
				// число менше нижнього значення в довіднику, ідемо далі, може є ще менші...
				value = arrSplit2[0]
				continue
			} else {
				//   value = tileBottomSheetHeightInMm * 10;
			}
		}

		return value
	}

	// --------------------------------------------------------
	// Функція побудови канвас фігур

	let sceneFunc = function (ctx: any, shape: any) {
		if (scaledCoords?.length === 3) {
			let coords = getRecalcCoords().slice()

			let tileWidthInMm = 420 / 10

			let step2 = 1195 / 10 // минуле захардкоджене

			let overlap = 150 / 10

			let newSides = getRecalcTriangleSides(coords)

			/// ----------------------------------

			ctx.beginPath()

			let baseLength: number = newSides.a * cellSize
			let side1: number = newSides.c * cellSize
			let side2: number = newSides.b * cellSize

			let R1 = side2,
				R2 = side1,
				R3 = baseLength

			let Ax = 0,
				Ay = -0

			let Bx = R3,
				By = -0

			let Cx = (R2 * R2 + R3 * R3 - R1 * R1) / (2 * R3)

			let Cy = -Math.sqrt(R2 * R2 - Cx * Cx)

			let figureBottomLine =
				-gridHeight / scalesConfig[`${selectedScale}`] +
				cellSize

			let Ox = 0
			// y основи відповідно до холста (зараз full size3 scale 1)
			let Oy = figureBottomLine - cellSize

			ctx.font = '32px serif'
			ctx.fillStyle = 'darkgreen'
			ctx.beginPath()

			ctx.moveTo(Ox + Ax, Oy - Ay) // x = 0, y = bottom figure line coord

			ctx.lineTo(Ox + Bx, Oy - By) // x = r3, y = 0 (base side length coord)

			ctx.lineTo(Ox + Cx, Oy - Cy)

			ctx.closePath()

			ctx.fillStyle = 'gold'
			ctx.lineWidth = 2
			ctx.stroke()
			ctx.fill()
			ctx.fillStrokeShape(shape)

			/// ----------------------------------

			let arr = []
			let counter = 0
			let rowSheetsHeight = { 1: [], 2: [], 3: [] }

			// ----

			let _triangle_h = getFigureHeight(scaledCoords)

			let tileBottomSheetHeightInMm = getTileBottomSheetRecommend(
				_triangle_h,
				dictionaryItem
			)

			step2 = tileBottomSheetHeightInMm / 10

			// ----

			let cyrcle_counter = 0 /// ряди черепиці
			const rowsBlockCounting = { 1: 0, 2: 0, 3: 0 } // кількість блоків в кожному ряді

			// звідки в нас фігура починає будуватися, нижня дотична лінія, її y координата (відповідає 0 по вьюшці)

			let p = figureASide + figureBSide + figureCSide // периметр
			let _half_p = p / 2 // півпериметр в см - на основі значень ( введених в інпутах в м )

			let value = getTileTopSheetMade(
				_triangle_h,
				dictionaryItem,
				tileBottomSheetHeightInMm
			)

			// ----

			for (let j = figureBottomLine; j <= cellSize; j += step2) {
				cyrcle_counter = cyrcle_counter + 1

				for (let i = cellSize; i < 1100; i += tileWidthInMm) {
					/// Проходимся по трикутнику
					for (let a = 0; a < tileWidthInMm; a++) {
						let flag = false

						for (let b: number = 0; b < step2; b++) {
							// якщо координата на даній комірці сітки лежить всередині фігури, ми ставимо блок
							let isPointInPath = ctx.isPointInPath(
								(i + a) * scalesConfig[`${selectedScale}`],
								-((j + b) * scalesConfig[`${selectedScale}`])
							)

							if (isPointInPath) {
								rowsBlockCounting[cyrcle_counter] += 1

								if (cyrcle_counter < 3) {
									let resultmy = step2
									let pointed = false

									let lostPointed = -figureBottomLine - step2

									for (let s = 0; s <= step2; s++) {
										// йдемо по блоку вертикально знизу вверх

										pointed = false

										for (let k = 0; k <= tileWidthInMm; k++) {
											// йдемо по блоку горизонтально зліва вправо

											let isPoint = ctx.isPointInPath(
												(i + k) *
													scalesConfig[`${selectedScale}`],
												(-figureBottomLine - step2 * counter - s) *
													scalesConfig[`${selectedScale}`]
											)

											if (isPoint) {
												pointed = true
											}
										}

										if (!pointed) {
											// якщо на цій горизонталі не було ні 1 точки, ставимо
											lostPointed = -figureBottomLine - s
											break
										}

										// if (s === step2 && k === tileWidthInMm) { }
									}

									resultmy = getLeaveTileSheet(
										step2,
										lostPointed,
										-figureBottomLine
									)

									rowSheetsHeight[cyrcle_counter].push(resultmy / 1000)

									/// Silver sheet rectangle
									arr.push(
										<SheetRectangle
											figureName={'triangle'}
											xCoord={i}
											yCoord={figureBottomLine + step2 * counter}
											width={tileWidthInMm}
											height={step2}
											color='silver'
										/>
									)
									/// Black sheet rectangle
									arr.push(
										<SheetRectangle
											figureName={'triangle'}
											xCoord={i}
											yCoord={figureBottomLine + step2 * counter}
											width={tileWidthInMm}
											height={resultmy / 10}
											color='black'
										/>
									)

									/// Silver horizontal line
									arr.push(
										<HorizontalLine
											figureName={'triangle'}
											leaveCrossCoord={tileWidthInMm}
											xCoord={i}
											yCoord={
												figureBottomLine + step2 * (counter + 1) - overlap
											}
											color={'silver'}
										/>
									)
									/// Black horizontal line
									arr.push(
										<HorizontalLine
											figureName={'triangle'}
											leaveCrossCoord={tileWidthInMm}
											xCoord={i}
											yCoord={
												figureBottomLine +
												step2 * counter +
												resultmy / 10 -
												overlap
											}
											color={'black'}
										/>
									)

									if (i > cellSize) {
										/// Silver vertical line
										arr.push(
											<VerticalLine
												figureName={'triangle'}
												leaveCrossCoord={step2}
												xCoord={i + overlap}
												yCoord={figureBottomLine + step2 * counter}
												color={'silver'}
											/>
										)
										/// Black vertical line
										arr.push(
											<VerticalLine
												figureName={'triangle'}
												leaveCrossCoord={resultmy / 10}
												xCoord={i + overlap}
												yCoord={figureBottomLine + step2 * counter}
												color={'black'}
											/>
										)
									}

									flag = true
									break
								}

								if (cyrcle_counter === 3) {
									//// Top row

									arr.push(
										<SheetRectangle
											figureName={'triangle'}
											xCoord={i}
											yCoord={figureBottomLine + step2 * counter}
											width={tileWidthInMm}
											height={value}
											color='silver'
										/>
									)

									arr.push(
										<SheetRectangle
											figureName={'triangle'}
											xCoord={i}
											yCoord={figureBottomLine + step2 * counter}
											width={tileWidthInMm}
											height={value}
											color='black'
										/>
									)

									if (
										cyrcle_counter === 3 &&
										rowsBlockCounting[cyrcle_counter] === 1
									) {
										flag = true
										break
									}

									// домальовує сіреньке, якщо блок чи нахльост норм не наклався
									arr.push(
										<VerticalLine
											figureName={'triangle'}
											leaveCrossCoord={value}
											xCoord={i + overlap}
											yCoord={figureBottomLine + step2 * counter}
											color='silver'
										/>
									)

									arr.push(
										<VerticalLine
											figureName={'triangle'}
											leaveCrossCoord={value}
											xCoord={i + overlap}
											yCoord={figureBottomLine + step2 * counter}
											color='black'
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

			//// Calc TRIANGLE params

			let triangular_s = Math.sqrt(
				_half_p *
					(_half_p - figureASide) *
					(_half_p - figureBSide) *
					(_half_p - figureCSide)
			)
			let s_rounded = +triangular_s.toFixed(2)

			let s_sheets = 0

			rowSheetsHeight[1].forEach(item => {
				s_sheets += (tileWidthInMm / 100) * item
			})
			rowSheetsHeight[2].forEach(item => {
				s_sheets += <div>tileWidthInMm / 100 * (item)</div>
			})
			rowSheetsHeight[3].forEach(item => {
				s_sheets += (tileWidthInMm / 100) * item
			})

			s_sheets = +(Number(s_sheets) ? s_sheets.toFixed(2) : 0)

			let s_waste = +(s_sheets - s_rounded).toFixed(2)

			let s_sheets_useful = +(s_sheets - s_waste).toFixed(2)

			setCalcResult(`
                <div style="max-width: 1200px">
                  <br/>
                  Площа фігури трикутника ${s_rounded} м2.
                  <br/>
                  <br/>
                  Загальна площа листів ${s_sheets} м2.
                  <br/>
                  Корисна площа листів ${s_sheets_useful} м2.
                  <br/>
                  Відходи ${s_waste} м2 - ${+(s_waste / s_sheets).toFixed(2)}%.
                  <br/>
                  <br/>
                  Листи 1 ряду: ${rowsBlockCounting[1]} шт - шириною ${
				tileWidthInMm / 100
			} м;
                  <br/> 
                  та висотою ${rowSheetsHeight[1]} м
                  <br/> 
                  <br/>
                  Листи 2 ряду: ${rowsBlockCounting[2]} шт шириною x ${
				tileWidthInMm / 100
			} м;
                  <br/> 
                  та висотою ${rowSheetsHeight[2]} м
                  <br/> 
                  <br/>
                  Листи 3 ряду: ${rowsBlockCounting[3]} шт - шириною ${
				tileWidthInMm / 100
			} м;
                  <br/>
                  та висотою ${value / 100} м;
                  <br/>
                  <br/>
                  <br/>
                </div>
            `)

			setCellRows(arr)
		}
	}

	return (
		<>
			<Layer>{cellRows}</Layer>
			<Layer>
				<Shape
					x={startCoords.x}
					y={startCoords.y}
					strokeWidth={2}
					stroke={'black'}
					sceneFunc={sceneFunc.bind(this)}
					opacity={0.2}
				/>
			</Layer>
		</>
	)
}

export default CoveredTriangle
