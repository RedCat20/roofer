import { FIGURES } from './enums/figure.enum'

export const scalesConfig = {
	'1': 1,
	'2': 0.9,
	'3': 0.8,
}

type gridParamsOptions = {
	[key: string]: any
}

interface IGridParams {
	size1: gridParamsOptions
	size2: gridParamsOptions
	size3: gridParamsOptions
	size4: gridParamsOptions
}

export const gridParams: any = {

// export const gridParams: IGridParams = {
	// size1: {
	// 	// 1920 x 1080
	// 	scale1: {
	// 		width: 1200,
	// 		height: 800,
	// 		startCoords: { x: 100, y: 100 },
	// 		cellSize: 100,
	// 		gridHorizontalNumbers: 50,
	// 		gridVerticalNumbers: 50,
	// 	},
	// 	scale2: {
	// 		width: 1200,
	// 		height: 800,
	// 		startCoords: { x: 100, y: 100 },
	// 		cellSize: 100,
	// 		gridHorizontalNumbers: 50,
	// 		gridVerticalNumbers: 50,
	// 	},
	// 	scale3: {
	// 		width: 1200,
	// 		height: 800,
	// 		startCoords: { x: 100, y: 100 },
	// 		cellSize: 100,
	// 		gridHorizontalNumbers: 50,
	// 		gridVerticalNumbers: 50,
	// 	},
	// },
	// size2: {
	// 	// 1440 x 900, 1366 x 768
	// 	scale1: {
	// 		width: 1080,
	// 		height: 660,
	// 		startCoords: { x: 90, y: 90 },
	// 		cellSize: 90,
	// 		gridHorizontalNumbers: 10,
	// 		gridVerticalNumbers: 5,
	// 	},
	// 	scale2: {
	// 		width: 1080,
	// 		height: 660,
	// 		startCoords: { x: 75, y: 75 },
	// 		cellSize: 75,
	// 		gridHorizontalNumbers: 14,
	// 		gridVerticalNumbers: 8,
	// 	},
	// 	scale3: {
	// 		width: 1080,
	// 		height: 660,
	// 		startCoords: { x: 50, y: 50 },
	// 		cellSize: 50,
	// 		gridHorizontalNumbers: 22,
	// 		gridVerticalNumbers: 12,
	// 	},
	// },
	// size3: {
	// 	// 1280 x 720
	// 	scale1: {
	// 		width: 960,
	// 		height: 590,
	// 		startCoords: { x: 80, y: 80 },
	// 		cellSize: 80,
	// 		gridHorizontalNumbers: 10,
	// 		gridVerticalNumbers: 5,
	// 	},
	// 	scale2: {
	// 		width: 960,
	// 		height: 590,
	// 		startCoords: { x: 50, y: 50 },
	// 		cellSize: 50,
	// 		gridHorizontalNumbers: 16,
	// 		gridVerticalNumbers: 9,
	// 	},
	// 	scale3: {
	// 		width: 960,
	// 		height: 590,
	// 		startCoords: { x: 25, y: 25 },
	// 		cellSize: 25,
	// 		gridHorizontalNumbers: 34,
	// 		gridVerticalNumbers: 19,
	// 	},
	// },
	// size4: {
	// 	// < 1280 x 720
	// 	scale1: {
	// 		width: 720,
	// 		height: 450,
	// 		startCoords: { x: 60, y: 60 },
	// 		cellSize: 60,
	// 		gridHorizontalNumbers: 10,
	// 		gridVerticalNumbers: 5,
	// 	},
	// 	scale2: {
	// 		width: 720,
	// 		height: 450,
	// 		startCoords: { x: 50, y: 50 },
	// 		cellSize: 50,
	// 		gridHorizontalNumbers: 16,
	// 		gridVerticalNumbers: 9,
	// 	},
	// 	scale3: {
	// 		width: 720,
	// 		height: 450,
	// 		startCoords: { x: 25, y: 25 },
	// 		cellSize: 25,
	// 		gridHorizontalNumbers: 34,
	// 		gridVerticalNumbers: 19,
	// 	},
	// },
}

export const initialState: any = {
	rectangleStartPoint: { x: 0, y: 0 },
	gridConfig: {
		width: 0,
		height: 0,
		startCoords: { x: 0, y: 0 },
		cellSize: 0,
		gridHorizontalNumbers: 0,
		gridVerticalNumbers: 0,
	},
	selectedScale: 0,
	gridSizes: {
		width: 0,
		height: 0,
	},
	cellSize: 0,
	gridHorizontalNumbers: 0,
	gridVerticalNumbers: 0,
	startCoords: {
		x: 0,
		y: 0,
	},
	selectedFigure: FIGURES.None,
	figureSides: {
		figureASide: 0,
		figureBSide: 0,
		figureCSide: 0,
		figureDSide: 0,
	},
	editedMode: 0,
	isEditedMode: false,
	isBuildMode: false,
	clickedCoords: null,
	polygonCoords: [],
	dictionary: [],
}

export const defaultPointedFigures = {
	isSquire: false,
	isRectangle: false,
	isTrapeze: false,
	isTriangular: false,
	isCurrentFigure: false,
}

export const defaultFullFigures = {
	isFullSquire: false,
	isFullRectangle: false,
	isFullTrapezoid: false,
	isFullTriangle: false,
	isFullFigure: false,
}

export const defaultFigureSides = {
	figureASide: 0,
	figureBSide: 0,
	figureCSide: 0,
	figureDSide: 0,
}
