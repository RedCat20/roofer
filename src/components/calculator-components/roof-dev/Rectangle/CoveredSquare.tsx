// @ts-nocheck

import { FC, useContext, useEffect, useState } from 'react'
import { Layer, Line, Rect } from 'react-konva'
import { scalesConfig } from '../../../../data'
import { useSelector, useDispatch } from 'react-redux'
import { useGridConfig } from '../../../../hooks/useGridConfig'

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

const CoveredSquare: FC<Props> = ({ dictionaryItem, setCalcResult }) => {
	const gridConfig = useGridConfig()
	const { selectedScale } = useSelector((state: any) => state.settings)

	const {
		figureSides: { figureASide: _figureASide, figureBSide: _figureBSide },
	} = useSelector((state: any) => state.figureParams)

	const [_mainBlockHeight, setMainBlockHeight] = useState(0)
	const [_topBlockHeight, setTopBlockHeight] = useState(0)

	useEffect(() => {
		if (_figureASide && _figureBSide && dictionaryItem) {
			calcBlockHeights()
		}
	}, [_figureASide, _figureBSide, dictionaryItem])

	const calcBlockHeights = () => {
		const _mainBlock = mm_to_m(
			Math.max(
				...dictionaryItem.recommended.filter(
					(v: number) => v <= m_to_mm(_figureBSide / 2)
				)
			)
		)
		setMainBlockHeight(_mainBlock)

		let _leaveHeight = _figureBSide - _mainBlock * 2 + OVERLAP * 2
		console.log('_leaveHeight', _leaveHeight)

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

	function createCellRows() {
		const { startCoords, cellSize } = gridConfig

		let arr = []
		let counter = 0

		const width = _figureASide * cellSize
		const blockWidth = gridConfig?.blockWidth
		const overlap = gridConfig?.overlap

		const mainBlockHeight = _mainBlockHeight * cellSize
		const topBlockHeight = _topBlockHeight * cellSize

		const y1 = startCoords[1] - mainBlockHeight
		const y2 = startCoords[1] - mainBlockHeight * 2

		// - - - - - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -

		for (
			let i = startCoords?.[0];
			i < startCoords?.[0] + width - overlap;
			i += blockWidth - overlap
		) {
			arr.push(
				<Rect
					key={`rectangle-${Math.random()}`}
					x={i}
					y={y1}
					width={blockWidth}
					fill='rgba(205, 129, 6, 0.3)'
					height={mainBlockHeight}
					strokeWidth={1}
					stroke={'black'}
					radius={20}
					draggable
					zIndex={7}
				/>
			)
			arr.push(
				<Line
					key={`covered-rectangle-vertical-overlap-${Math.random()}`}
					x={i}
					y={y1}
					width={1}
					points={[0, 0, 0, mainBlockHeight, 0]}
					stroke='brown'
				/>
			)
			arr.push(
				<Rect
					key={`rectangle-${Math.random()}`}
					x={i}
					y={y2 + overlap}
					width={blockWidth}
					fill='rgba(205, 129, 6, 0.3)'
					height={mainBlockHeight}
					strokeWidth={1}
					stroke={'black'}
					radius={20}
					draggable
					zIndex={7}
				/>
			)
			arr.push(
				<Line
					key={`covered-rectangle-vertical-overlap-${Math.random()}`}
					x={i}
					y={y2 + overlap}
					width={1}
					points={[0, 0, 0, mainBlockHeight, 0]}
					stroke='brown'
				/>
			)
			arr.push(
				<Rect
					key={`rectangle-${Math.random()}`}
					x={i}
					y={
						startCoords[1] -
						(mainBlockHeight - overlap) -
						(mainBlockHeight - overlap) -
						topBlockHeight
					}
					width={blockWidth}
					height={topBlockHeight}
					fill='rgba(205, 129, 6, 0.3)'
					opacity={1}
					strokeWidth={1}
					stroke={'black'}
					radius={20}
					draggable
					zIndex={7}
				/>
			)
			arr.push(
				<Line
					key={`covered-rectangle-vertical-overlap-${Math.random()}`}
					x={i}
					y={
						startCoords[1] -
						(mainBlockHeight - overlap) -
						(mainBlockHeight - overlap) -
						topBlockHeight
					}
					width={1}
					points={[0, 0, 0, topBlockHeight, 0]}
					stroke='brown'
				/>
			)
			counter++
		}

		// - - - - - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -

		let square_s = (_figureASide * _figureBSide).toFixed(2)

		let blocks_general = (
			counter * (_mainBlockHeight * BLOCK_WIDTH) +
			counter * (_mainBlockHeight * BLOCK_WIDTH) +
			counter * (_topBlockHeight * BLOCK_WIDTH)
		).toFixed(2)

		let leave_waste = (blocks_general - square_s).toFixed(2)
		let useful_square = (blocks_general - leave_waste).toFixed(2)

		setCalcResult(`
			    <div style="padding: 15px 30px">
			        Площа фігури прямокутника ${square_s} м2
			       <br/>
				   <br/>
				   Загальна площа листів ${blocks_general} м2.
			       <br/>
			       <br/>
		 	        Корисна площа листів ${0} м2.
			         <br/>
					  <br/>
			        Відходи ${0} м2 - ${(0 * 100).toFixed(2)}%.
		 <br/>
		   <br/>
		 <hr/>
		  <br/>
		    
			        Листи нижнього ряду: ${counter} шт - ${BLOCK_WIDTH} м x ${_mainBlockHeight} м
					<br/>
					 <br/>
					Листи середнього ряду: ${counter} шт - ${BLOCK_WIDTH} м x ${_mainBlockHeight} м
			        <br/>
			       <br/>
				   Листи верхнього ряду: ${counter} шт - ${BLOCK_WIDTH} м x ${_topBlockHeight} м
				   
			    </div>
			`)

		return arr
	}

	return (
		<>
			{gridConfig && (
				<>
					<Layer>{createCellRows()}</Layer>
					<Layer>
						<Rect
							x={gridConfig?.startCoords?.[0]}
							y={
								gridConfig?.startCoords?.[1] -
								_figureBSide * gridConfig?.cellSize
							}
							width={_figureASide * gridConfig?.cellSize}
							height={_figureBSide * gridConfig?.cellSize}
							// fill='gold'
							// opacity={0.5}
							strokeWidth={3}
							stroke={'black'}
							opacity={1}
							zIndex={9}
						/>
					</Layer>
				</>
			)}
		</>
	)
}

export default CoveredSquare
