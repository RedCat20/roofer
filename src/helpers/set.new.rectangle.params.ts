import { calcSideLengthByPoints } from './calc.sides.helper'

export const setNewRectangleParamsByPoints = ({
	newData: { axis, point, value },
	storeData: {
		dispatch,
		figureSides,
		figurePoints,
		changeFigureSides,
		changeFigurePoints,
	},
}: any) => {
	// console.log('setNewRectangleParams', axis, point)
	if (axis === 'x' && !['0', '3'].includes(point)) {
		const newPoints = [
			[0, 0],
			[value, 0],
			[value, figurePoints[2][1]],
			[0, figurePoints[3][1]],
		]
		// const newASide = calcSideLengthByPoints([newPoints[0], newPoints[1]])
		// console.log('newASide: ', typeof newASide, newASide)
		Promise.all([
			dispatch(
				changeFigureSides({
					...figureSides,
					figureASide: value,
					figureBSide: figureSides.figureBSide,
				})
			),
			dispatch(changeFigurePoints([...newPoints])),
		])
	} else if (axis === 'y' && !['0', '1'].includes(point)) {
		const newPoints = [
			[0, 0],
			[figurePoints[1][0], 0],
			[figurePoints[2][0], value],
			[0, value],
		]
		// const newASide = calcSideLengthByPoints([newPoints[0], newPoints[1]])
		// console.log('newASide: ', typeof newASide, newASide)
		Promise.all([
			dispatch(
				changeFigureSides({
					...figureSides,
					figureASide: figureSides.figureASide,
					figureBSide: value,
				})
			),
			dispatch(changeFigurePoints([...newPoints])),
		])
	}
}

export const setNewRectangleParamsBySides = ({
	newData: { sideA, sideB },
	storeData: { dispatch, figureSides, changeFigureSides, changeFigurePoints },
}: any) => {
	if (sideA || sideB) {
		const newPoints = [
			[0, 0],
			[sideA, 0],
			[sideA, sideB],
			[0, sideB],
		]
		// const newASide = calcSideLengthByPoints([newPoints[0], newPoints[1]])
		// const newBSide = calcSideLengthByPoints([newPoints[1], newPoints[2]])
		// console.log('newASide: ', typeof newASide, newASide)
		// console.log('newBSide: ', typeof newBSide, newBSide)

		Promise.all([
			dispatch(
				changeFigureSides({
					...figureSides,
					figureASide: sideA,
					figureBSide: sideB,
				})
			),
			dispatch(changeFigurePoints([...newPoints])),
		])
	}
}
