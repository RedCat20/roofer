import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settingSlice'
import dictionaryReduces from './dictionarySlice'
import figureParamsReduces from './figureParamsSlice'

import { dictionariesApi } from './api/dictionary'

export const store = configureStore({
	reducer: {
		settings: settingsReducer,
		dictionaries: dictionaryReduces,
		figureParams: figureParamsReduces,

		[dictionariesApi.reducerPath]: dictionariesApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(dictionariesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
