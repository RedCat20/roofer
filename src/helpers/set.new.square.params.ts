import { calcSideLengthByPoints } from './calc.sides.helper'

export const setNewSquareParamsByPoints = ({
	newData: { axis, point, value },
	storeData: { dispatch, figureSides, changeFigureSides, changeFigurePoints },
}: any) => {
	console.log('setNewSquareParams', axis, point)
	if (
		(axis === 'x' && ['1', '2', '3'].includes(point)) ||
		(axis === 'y' && ['2', '3'].includes(point))
	) {
		const newPoints = [
			[0, 0],
			[value, 0],
			[value, value],
			[0, value],
		]
		const newASide = calcSideLengthByPoints([...newPoints])
		console.log('newASide: ', typeof newASide, newASide)
		Promise.all([
			dispatch(
				changeFigureSides({
					...figureSides,
					figureASide: value,
				})
			),
			dispatch(changeFigurePoints([...newPoints])),
		])
	}
}

export const setNewSquareParamsBySides = ({
	newData: { value },
	storeData: { dispatch, figureSides, changeFigureSides, changeFigurePoints },
}: any) => {
	if (value) {
		const newPoints = [
			[0, 0],
			[value, 0],
			[value, value],
			[0, value],
		]
		const newASide = calcSideLengthByPoints([...newPoints])
		console.log('newASide: ', typeof newASide, newASide)
		Promise.all([
			dispatch(
				changeFigureSides({
					...figureSides,
					figureASide: value,
				})
			),
			dispatch(changeFigurePoints([...newPoints])),
		])
	}
}
