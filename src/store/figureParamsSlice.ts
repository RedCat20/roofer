import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DictionaryState {
	figureSides: any
	figurePoints: any
	customPoints: any
}

const initialState: DictionaryState = {
	figureSides: {
		figureASide: 0,
		figureBSide: 0,
		figureCSide: 0,
		figureDSide: 0,
		figureHSide: 0,
	},
	figurePoints: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		// { x0: 0, y0: 0 },
		// { x1: 0, y1: 0 },
		// { x2: 0, y2: 0 },
		// { x3: 0, y3: 0 },
	],
	customPoints: [],
}

export const figureParamsSlice = createSlice({
	name: 'figureParams',
	initialState,
	reducers: {
		changeFigureSides: (state, action: PayloadAction<any>) => {
			// console.log('action', action)
			state.figureSides = {
				figureASide:
					action.payload.figureASide >= 0
						? Number(action.payload.figureASide)
						: state.figureSides.figureASide,
				figureBSide:
					action.payload.figureBSide >= 0
						? Number(action.payload.figureBSide)
						: state.figureSides.figureBSide,
				figureCSide:
					action.payload.figureCSide >= 0
						? Number(action.payload.figureCSide)
						: state.figureSides.figureCSide,
				figureDSide:
					action.payload.figureDSide >= 0
						? Number(action.payload.figureDSide)
						: state.figureSides.figureDSide,
				figureHSide:
					action.payload.figureHSide >= 0
						? Number(action.payload.figureHSide)
						: state.figureSides.figureHSide,
			}
		},
		changeFigurePoints: (state, action: PayloadAction<any>) => {
			state.figurePoints = action.payload

			// state.figurePoints = [
			// 	{ x1: 0, y1: 0 },
			// 	{ x2: 0, y2: 0 },
			// 	{ x3: 0, y3: 0 },
			// 	{ x4: 0, y4: 0 },
			// 	{ x5: 0, y5: 0 },
			// 	{ x6: 0, y6: 0 },
			// ]
		},
		changeCustomPoints: (state, action: PayloadAction<any>) => {
			state.customPoints = action.payload
		},
	},
})

export const { changeFigureSides, changeFigurePoints, changeCustomPoints } =
	figureParamsSlice.actions

export default figureParamsSlice.reducer
