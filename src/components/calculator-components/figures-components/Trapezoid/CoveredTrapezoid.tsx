// @ts-nocheck

import React, { FC, useContext, useEffect, useState } from 'react'

import { Layer, Line, Rect, Shape } from 'react-konva'
import { AppContext } from '../../../../context/AppContext'
import { scalesConfig } from '../../../../data'
import {
	getNewScaledCoords,
	getRecalcTrapezoidSides,
	setRecalcTrapezoidSidesToInputs,
	getFigureHeight,
} from '../../../../helpers/scale.helper'

import {
	getTileBottomSheetRecommend,
	getTileTopSheetMade,
} from '../../../../helpers/dictionary.helper'
import SheetRectangle from '../../covered-items-components/SheetRectangle'
import HorizontalLine from '../../covered-items-components/HorizontalLine'
import VerticalLine from '../../covered-items-components/VerticalLine'

interface Props {
	cellSize: number
	gridHeight: number
	coords: any[]
	dictionaryItem: any

	figureASide: number
	figureBSide: number
	figureCSide: number
	figureDSide: number

	setCalcResult: any
}

const CoveredTrapezoid: FC<Props> = ({
	cellSize,
	coords,
	gridHeight,
	dictionaryItem,
	figureASide,
	figureBSide,
	figureCSide,
	figureDSide,

	setCalcResult,
}) => {
	const appContext = useContext(AppContext)

	const [scaledCoords, setScaledCoords] = useState(null)
	const [cellRows, setCellRows] = useState<any[]>([])
	const [sides, setSides] = useState({ a: 0, b: 0, c: 0 })

	// --------------------------------------------------------
	// Настройки компоненти

	function getRecalcCoords() {
		if (scaledCoords?.length !== 4) return

		let figureBottomLine =
			-gridHeight / scalesConfig[`${appContext.state.selectedScale}`] + cellSize
		return getNewScaledCoords(scaledCoords, figureBottomLine)
	}

	useEffect(() => {
		// подальше масштабування не викликає цей метод, повернення на цю вкладку викликає
		console.log('ПО відрендерилося вперше!, ')
	}, [])

	useEffect(() => {
		// при першому рендерингу теж відбувається, але поле не порожнє, а з цифрою
		if (scaledCoords?.length > 0) {
			setSides(getRecalcTrapezoidSides(scaledCoords))
			setRecalcTrapezoidSidesToInputs(scaledCoords)
		} else if (coords.length === 4) {
			setScaledCoords(coords)
		}
	}, [scaledCoords])

	useEffect(() => {
		// при першому рендерингу теж відбувається, але поле не порожнє, а з цифрою
		setScaledCoords(scaledCoords?.length === 4 ? getRecalcCoords() : coords)
	}, [appContext.state.selectedScale])

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

	let sceneFunc = function (ctx: any, shape: any) {
		if (scaledCoords?.length === 4) {
			let coords = getRecalcCoords().slice()

			let tileWidthInMm = 420 / 10

			let step2 = 1195 / 10 // минуле захардкоджене
			let overlap = 150 / 10

			/// ----------------------------------
			/// Draw figure

			ctx.beginPath()

			ctx.moveTo(coords[0].x, coords[0].y)

			for (let i = 1; i < coords.length; i++) {
				ctx.lineTo(coords[i].x, coords[i].y)
			}

			ctx.closePath()

			ctx.fillStyle = 'gold'
			ctx.lineWidth = 2
			ctx.stroke()
			ctx.fill()
			ctx.fillStrokeShape(shape)

			/// end Draw figure
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

			let cyrcle_counter = 0
			const rowsBlockCounting = { 1: 0, 2: 0, 3: 0 } // кількість блоків в кожному ряді

			let figureBottomLine =
				-gridHeight / scalesConfig[`${appContext.state.selectedScale}`] +
				cellSize

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
								(i + a) * scalesConfig[`${appContext.state.selectedScale}`],
								-((j + b) * scalesConfig[`${appContext.state.selectedScale}`])
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
													scalesConfig[`${appContext.state.selectedScale}`],
												(-figureBottomLine - step2 * counter - s) *
													scalesConfig[`${appContext.state.selectedScale}`]
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

			let trapezoid_s = 0.5 * (figureASide + figureBSide) * _triangle_h
			let s_rounded = trapezoid_s.toFixed(2)

			let s_sheets = 0

			rowSheetsHeight[1].forEach(item => {
				s_sheets += (tileWidthInMm / 100) * item
			})
			rowSheetsHeight[2].forEach(item => {
				s_sheets += (tileWidthInMm / 100) * item
			})
			rowSheetsHeight[3].forEach(item => {
				s_sheets += (tileWidthInMm / 100) * item
			})

			s_sheets = +s_sheets.toFixed(2)

			let s_waste = +(s_sheets - s_rounded).toFixed(2)

			let s_sheets_useful = +(s_sheets - s_waste).toFixed(2)

			let made_items = dictionaryItem.made.join('; ')
			let recommended_items = dictionaryItem.recommended.join('; ')
			let exceptions_items = dictionaryItem.exceptions.join('; ')

			setCalcResult(`
              <div style="max-width: 1200px">
                   <!-- Висота ${_triangle_h}-->
                   <br/>
                    Площа фігури трапеції ${s_rounded} м2.
                    <br/>
                      <br/>
                      Загальна площа листів ${s_sheets} м2.
                      <br/>
                      Корисна площа листів ${s_sheets_useful} м2.
                      <br/>
                      Відходи ${s_waste} м2 - ${+(s_waste / s_sheets).toFixed(
				2
			)}%.
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
                  
                 </div>
            `)

			setCellRows(arr)
		}
	}

	//   <div class="darkgray-text">
	//                   <hr/>
	//                   Рекомендовані розміри: <br/> ${recommended_items}
	//                   <br/>
	//                   <br/>
	//                   Виготовляються: <br/> ${made_items}
	//                   <br/>
	//                   <br/>
	//                   Виключення: <br/> ${exceptions_items}
	//                 </div>

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

export default CoveredTrapezoid
