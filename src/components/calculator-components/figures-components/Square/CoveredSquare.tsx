// @ts-nocheck

import React, { FC, useContext } from 'react'

import { Layer, Line, Rect } from 'react-konva'
import { AppContext } from '../../../../context/AppContext'
import { scalesConfig } from '../../../../data'

interface Props {
	width: number
	height: number
	cellSize: number
	gridHeight: number
	dictionaryItem: any
	setCalcResult: any

	startCoords: any
}

const CoveredSquare: FC<Props> = ({
	width,
	height,
	cellSize,
	gridHeight,
	dictionaryItem,
	setCalcResult,
	startCoords,
}) => {
	const appContext = useContext(AppContext)

	function createCellRows() {
		let figureBottomLine =
			-gridHeight / scalesConfig[`${appContext.state.selectedScale}`] +
			cellSize +
			height * cellSize

		let convertedWidth = width * cellSize

		let step1 = 420 / 10

		let arr = []

		let overlap = 150 / 10

		let counter = 0

		let halfOfHeight = (height / 2) * 1000

		const closestLeft = Math.max(
			...dictionaryItem.recommended.filter((v: number) => v < halfOfHeight)
		)

		// ----

		let first_row_blocks_count = 0
		let second_row_blocks_count = 0
		let top_row_blocks_count = 0

		// ----

		for (let j = 0; j < 2; j++) {
			for (
				let i = cellSize;
				i < convertedWidth + cellSize;
				i += (step1 * cellSize) / 100
			) {
				arr.push(
					<Rect
						key={`rectangle-${Math.random()}`}
						x={i}
						y={
							figureBottomLine -
							height * cellSize +
							(closestLeft / 1000) * cellSize * counter
						}
						width={(step1 * cellSize) / 100}
						height={(closestLeft / 1000) * cellSize}
						fill='transparent'
						opacity={1}
						strokeWidth={2}
						stroke={'black'}
						radius={20}
						draggable
						zIndex={7}
					/>
				)
				arr.push(
					<Line
						key={`covered-rectangle-horizontal-overlap-${Math.random()}`}
						x={i}
						y={
							figureBottomLine -
							height * cellSize +
							(closestLeft / 1000) * cellSize * (counter + 1) -
							overlap
						}
						width={1}
						points={[0, 0, (step1 * cellSize) / 100, 0, 0]}
						stroke='darkbrown'
					/>
				)

				if (i > cellSize) {
					arr.push(
						<Line
							key={`covered-rectangle-vertical-overlap-${Math.random()}`}
							x={i + (overlap * cellSize) / 100}
							y={
								figureBottomLine -
								height * cellSize +
								(closestLeft / 1000) * cellSize * counter
							}
							width={1}
							points={[0, 0, 0, (closestLeft / 1000) * cellSize, 0]}
							stroke='darkbrown'
						/>
					)
				}

				if (j === 0) first_row_blocks_count++
				if (j === 1) second_row_blocks_count++
			}
			counter++
		}

		let leave = height * 1000 - closestLeft * 2

		let value = 0

		dictionaryItem.made.forEach((item: any) => {
			let arrSplit = item.split('-')
			if (
				(leave >= Number(arrSplit[0]) && leave <= Number(arrSplit[1])) ||
				leave < Number(arrSplit[0])
			) {
				value = leave
			}
		})

		for (
			let i = cellSize;
			i < convertedWidth + cellSize;
			i += (step1 * cellSize) / 100
		) {
			arr.push(
				<Rect
					key={`rectangle-${Math.random()}`}
					x={i}
					y={
						figureBottomLine -
						height * cellSize +
						(closestLeft / 1000) * cellSize * counter
					}
					width={(step1 * cellSize) / 100}
					height={(value / 1000) * cellSize}
					fill='transparent'
					opacity={1}
					strokeWidth={2}
					stroke={'darkbrown'}
					radius={20}
					draggable
					zIndex={7}
				/>
			)

			if (i > cellSize) {
				arr.push(
					<Line
						key={`covered-rectangle-vertical-overlap-${Math.random()}`}
						x={i + (overlap * cellSize) / 100}
						y={
							figureBottomLine -
							height * cellSize +
							(closestLeft / 1000) * cellSize * counter
						}
						width={1}
						points={[0, 0, 0, (value * cellSize) / 100 / 10, 0]}
						stroke='darkbrown'
					/>
				)
			}

			top_row_blocks_count++
		}

		let square_s = (width * height).toFixed(2)

		let blocks_general = (
			((first_row_blocks_count * step1 * closestLeft) / 100 +
				(second_row_blocks_count * step1 * closestLeft) / 100 +
				(top_row_blocks_count * step1 * value) / 100) /
			1000
		).toFixed(2)

		let leave_waste = (blocks_general - square_s).toFixed(2)
		let useful_square = (blocks_general - leave_waste).toFixed(2)

		setCalcResult(`
            <div>
               <br/>
                Площа фігури прямокутника ${square_s} м2.
               <br/>
                Загальна площа листів ${blocks_general} м2.
               <br/>
                Корисна площа листів ${useful_square} м2.
                 <br/>
                Відходи ${leave_waste} м2 - ${(
			(leave_waste / blocks_general) *
			100
		).toFixed(2)}%.
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
                Листи верхнього ряду: ${top_row_blocks_count} шт - ${
			step1 / 100
		} м x ${value / 1000} м;
                 <br/>
                 <br/>
             
            </div>
        `)

		return arr
	}

	return (
		<>
			<Layer>{createCellRows()}</Layer>
			<Layer>
				<Rect
					x={startCoords.x}
					y={
						-gridHeight / scalesConfig[`${appContext.state.selectedScale}`] +
						cellSize
					}
					width={width * cellSize}
					height={height * cellSize}
					fill='gold'
					opacity={0.25}
				/>
			</Layer>
		</>
	)
}

export default CoveredSquare
