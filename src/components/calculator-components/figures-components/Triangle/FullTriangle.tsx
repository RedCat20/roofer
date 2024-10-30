// @ts-nocheck

import React, { FC, useContext, useEffect } from 'react'
import { Layer, Shape } from 'react-konva'
import { ICoords } from '../../../../interfaces/coords'
import { scalesConfig } from '../../../../data'
import { AppContext } from '../../../../context/AppContext'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
	figureASide: number
	figureBSide: number
	figureCSide: number
	startCoords: ICoords
	cellSize: number
	gridHeight: number
	calcTrianglePointsCallback: (points: any[]) => void
}

const FullTriangle: FC<Props> = ({
	figureASide,
	figureBSide,
	figureCSide,
	startCoords,
	cellSize,
	gridHeight,
	calcTrianglePointsCallback,
}) => {
	const appContext = useContext(AppContext)
	const { selectedScale } = useSelector((state: any) => state.settings)

	useEffect(() => {
		// calcCoords();
	}, [figureASide, figureBSide, figureCSide, startCoords])

	let calcCoords = () => {
		if (
			figureASide > figureBSide + figureCSide ||
			figureBSide > figureASide + figureCSide ||
			figureCSide > figureASide + figureBSide
		) {
			return
		}

		let baseLength: number = figureASide * cellSize
		let side1: number = figureBSide * cellSize
		let side2: number = 0

		if (figureBSide === figureCSide) {
			side2 = side1
		} else {
			side2 = figureCSide * cellSize
		}

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
			-gridHeight / scalesConfig[`${selectedScale}`] + cellSize

		let Ox = 0
		// y основи відповідно до холста (зараз full size3 scale 1)
		let Oy = figureBottomLine - cellSize

		calcTrianglePointsCallback([
			{ x: Ox + Ax + cellSize, y: Oy - Ay + cellSize },
			{ x: Ox + Bx + cellSize, y: Oy - By + cellSize },
			{ x: Ox + Cx + cellSize, y: Oy - Cy + cellSize },
		])
	}

	let sceneFunc = function (ctx: any, shape: any) {
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
			Ay = -0

		let Bx = R3,
			By = -0

		let Cx = (R2 * R2 + R3 * R3 - R1 * R1) / (2 * R3)

		let Cy = -Math.sqrt(R2 * R2 - Cx * Cx)

		let figureBottomLine =
			-gridHeight / scalesConfig[`${selectedScale}`] + cellSize

		let Ox = 0
		// y основи відповідно до холста (зараз full size3 scale 1)
		let Oy = figureBottomLine - cellSize

		ctx.font = '32px serif'
		ctx.fillStyle = 'darkgreen'
		ctx.beginPath()

		ctx.moveTo(Ox + Ax, Oy - Ay) // x = 0, y = bottom figure line coord

		ctx.lineTo(Ox + Bx, Oy - By) // x = r3, y = 0 (base side length coord)

		ctx.fillText('C', (Ox + Bx + Ox + Cx) / 2 + 7, (Oy - By + Oy - Cy) / 2)

		ctx.lineTo(Ox + Cx, Oy - Cy)

		ctx.fillText('B', (Ox + Cx + Ox + Ax) / 2 - 30, (Oy - Cy + Oy - Ay) / 2)

		ctx.save()

		ctx.translate((Ox + Ax + Ox + Bx) / 2, Oy - By)

		ctx.rotate(-3.15)

		ctx.textAlign = 'left'

		ctx.fillText('A', 0, 0)

		ctx.restore()

		ctx.fillStyle = 'red'

		ctx.closePath()

		ctx.lineWidth = 2
		ctx.stroke()

		calcTrianglePointsCallback([
			{ x: Ox + Ax + cellSize, y: Oy - Ay + cellSize },
			{ x: Ox + Bx + cellSize, y: Oy - By + cellSize },
			{ x: Ox + Cx + cellSize, y: Oy - Cy + cellSize },
		])
	}

	return (
		<Layer>
			<Shape
				x={startCoords.x}
				y={startCoords.y}
				// fill={'orange'}
				sceneFunc={sceneFunc.bind(this)}
				opacity={1}
			/>
		</Layer>
	)
}

export default FullTriangle
