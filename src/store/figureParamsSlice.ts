import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DictionaryState {
	figureSides: any
	figurePoints: any
}

const initialState: DictionaryState = {
	figureSides: {
		figureASide: 0,
		figureBSide: 0,
		figureCSide: 0,
		figureDSide: 0,
	},
	figurePoints: [
		{ x0: 0, y0: 0 },
		{ x1: 0, y1: 0 },
		{ x2: 0, y2: 0 },
		{ x3: 0, y3: 0 },
	],
}

export const figureParamsSlice = createSlice({
	name: 'figureParams',
	initialState,
	reducers: {
		changeFigureSides: (state, action: PayloadAction<any>) => {
			console.log('action', action)
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
			}
		},
		changeFigurePoints: (state, action: PayloadAction<any>) => {
			state.figurePoints = [
				{ x0: 0, y0: 0 },
				{ x1: 0, y1: 0 },
				{ x2: 0, y2: 0 },
				{ x3: 0, y3: 0 },
			]
		},
	},
})

export const { changeFigureSides, changeFigurePoints } =
	figureParamsSlice.actions

export default figureParamsSlice.reducer
