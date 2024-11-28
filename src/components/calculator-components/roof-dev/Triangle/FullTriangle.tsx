// @ts-nocheck

import React, { FC, useContext, useEffect } from 'react'
import { Layer, Shape } from 'react-konva'
import { ICoords } from '../../../../interfaces/coords'
import { scalesConfig } from '../../../../data'
import { useSelector, useDispatch } from 'react-redux'
import { useGridConfig } from '../../../../hooks/useGridConfig'
import {
	changeCustomPoints,
	changeFigurePoints,
	changeFigureSides,
} from '../../../../store/figureParamsSlice'
interface Props {
	calcFigurePoints: any
}

const FullTriangle: FC<Props> = ({
	figureASide,
	figureBSide,
	figureCSide,
	calcFigurePoints,
}) => {
	const { selectedScale } = useSelector((state: any) => state.settings)

	const gridConfig = useGridConfig()
	const dispatch = useDispatch()

	let sceneFunc = function (ctx: any, shape: any) {
		if (!gridConfig) return

		const { startCoords, cellSize, height } = gridConfig

		if (figureASide >= figureASide + figureCSide) {
			// alert(`Таку фігуру неможливо побудувати: основа більша чи рівна сумі сторін `)
			return
		}

		ctx.beginPath()

		let baseLength: number = figureASide * cellSize
		let side1: number = figureBSide * cellSize
		let side2: number = figureCSide * cellSize

		let R1 = side2,
			R2 = side1,
			R3 = baseLength

		let Ax = 0,
			Ay = startCoords[1]

		let Bx = R3,
			By = startCoords[1]

		let Cx = (R2 * R2 + R3 * R3 - R1 * R1) / (2 * R3)

		let Cy = Math.sqrt(R2 * R2 - Cx * Cx)

		console.log('Cy', Cy)

		let Ox = 0
		let Oy = startCoords[1]

		ctx.font = '32px serif'
		ctx.fillStyle = 'darkgreen'
		ctx.beginPath()

		ctx.moveTo(Ox + Ax, Oy - Ay) // x = 0, y = bottom figure line coord

		ctx.lineTo(Ox + Bx, Oy - By) // x = r3, y = 0 (base side length coord)

		ctx.fillText(
			'C',
			(Ox + Bx + Ox + Cx) / 2 + 7,
			(Oy - By + startCoords[1] - Oy - Cy) / 2
		)

		ctx.lineTo(Ox + Cx, startCoords[1] - Oy - Cy)

		ctx.fillText(
			'B',
			(Ox + Cx + Ox + Ax) / 2 - 30,
			(startCoords[1] - Oy - Cy + Oy - Ay) / 2
		)

		ctx.save()

		ctx.translate((Ox + Ax + Ox + Bx) / 2, Oy - By)

		ctx.textAlign = 'left'

		ctx.fillText('A', 0, 0)

		ctx.restore()

		ctx.fillStyle = 'red'

		ctx.closePath()

		ctx.lineWidth = 2
		ctx.stroke()

		const pointsArray = [
			[[(Ox + Ax) / cellSize], [(Oy - Ay) / cellSize]],
			[[(Ox + Bx) / cellSize], [(Oy - By) / cellSize]],
			[[(Ox + Cx) / cellSize], [Cy / cellSize]],
			// [Ax / cellSize, (startCoords[1] - Ay) / cellSize],
			// [Bx / cellSize, (startCoords[1] - By) / cellSize],
			// [Cx / cellSize, (startCoords[1] - Cy) / cellSize],
		]

		calcFigurePoints(pointsArray)
	}

	return (
		<Layer>
			<Shape
				x={gridConfig?.startCoords[0]}
				y={gridConfig?.startCoords[1]}
				// fill={'orange'}
				sceneFunc={sceneFunc.bind(this)}
				opacity={1}
			/>
		</Layer>
	)
}

export default FullTriangle
