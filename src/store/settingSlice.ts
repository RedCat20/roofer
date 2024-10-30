import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FIGURES, EDITED_MODE } from '../enums/figure.enum'

export interface SettingsState {
	selectedFigure: number
	editedMode: number
	isBuildMode: boolean
	selectedScale: number
}

const initialState: SettingsState = {
	selectedFigure: FIGURES.None,
	editedMode: 0,
	isBuildMode: false,
	selectedScale: 1,
}

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSelectedFigure: (state, action: PayloadAction<FIGURES>) => {
			state.selectedFigure = action.payload
		},
		setEditedMode: (state, action: PayloadAction<EDITED_MODE>) => {
			state.editedMode = action.payload
		},
		setIsBuildMode: (state, action: PayloadAction<boolean>) => {
			state.isBuildMode = action.payload
		},
		setSelectedScale: (state, action: PayloadAction<number>) => {
			state.selectedScale = action.payload
		},
	},
})

export const { setSelectedFigure } = settingsSlice.actions
export const { setEditedMode } = settingsSlice.actions
export const { setIsBuildMode } = settingsSlice.actions
export const { setSelectedScale } = settingsSlice.actions

export default settingsSlice.reducer
