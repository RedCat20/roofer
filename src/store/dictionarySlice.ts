import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { dictionariesApi } from './api/dictionary'

export interface DictionaryState {
	dictionaries: any[]
	extraLoading: boolean
	extraError: string | null
}

const initialState: DictionaryState = {
	dictionaries: [],
	extraLoading: false,
	extraError: null,
}

export const dictionarySlice = createSlice({
	name: 'dictionary',
	initialState,
	reducers: {
		// setNewList: (state, action: PayloadAction<any[]>) => {
		// 	state.dictionaries = action.payload
		// },
		// increment: state => {
		// 	state.selectedFigure += 1
		// },
		// decrement: state => {
		// 	state.selectedFigure -= 1
		// },
		// incrementByAmount: (state, action: PayloadAction<number>) => {
		// 	state.selectedFigure += action.payload
		// },
	},
	extraReducers: builder => {
		// builder.addMatcher(
		// 	isAnyOf(dictionariesApi.endpoints.getDictionaries.matchFulfilled), //updated
		// 	(state, action): void => {
		// 		console.log('state, action: ', state, action.payload)
		// 		return void (state.dictionaries = action.payload)
		// 	}
		// )
		builder
			.addMatcher(
				dictionariesApi.endpoints.getDictionaries.matchPending,
				state => {
					state.extraLoading = true
					state.extraError = null
				}
			)
			.addMatcher(
				dictionariesApi.endpoints.getDictionaries.matchFulfilled,
				(state, action) => {
					state.extraLoading = false
					state.dictionaries = action.payload
				}
			)
			.addMatcher(
				dictionariesApi.endpoints.getDictionaries.matchRejected,
				(state, action: any) => {
					state.extraLoading = false
					state.extraError = action.error.message
				}
			)
	},
})

// export const { setNewList } = dictionarySlice.actions

export default dictionarySlice.reducer
