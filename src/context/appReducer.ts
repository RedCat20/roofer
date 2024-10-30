// const appReducer = (state: any, action: any) => {
//     switch (action.type) {
//         case 'SOME_ACTION': {
//             return {
//                 ...state,
//                 someFields: action.payload,
//             }
//         }
//     }
// }
//
// export default appReducer;

import { gridParams, initialState } from '../data'

export const appReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'set-default-grid-config': {
			return {
				...state,
				gridConfig: action.payload ? action.payload.gridConfig : false,
			}
		}

		// case 'update-dictionary': {
		// 	return {
		// 		...state,
		// 		dictionary: action.payload ? action.payload.dictionary : [],
		// 	}
		// }

		case 'rectangle-start-point': {
			return {
				...state,
				rectangleStartPoint: action.payload
					? action.payload.rectangleStartPoint
					: false,
			}
		}
		case 'set-clicked-coords': {
			return {
				...state,
				clickedCoords: action.payload ? action.payload.clickedCoords : null,
			}
		}
		case 'set-polygon-coords-from-dialog': {
			return {
				...state,
				polygonCoords: action.payload ? action.payload.polygonCoords : [],
			}
		}
		// case 'set-edited-mode': {
		// 	return {
		// 		...state,
		// 		editedMode: action.payload ? action.payload.editedMode : 1,
		// 		isEditedMode: action.payload
		// 			? action.payload.isEditedMode
		// 			: state.isEditedMode,
		// 	}
		// }
		// case 'set-build-mode': {
		// 	return {
		// 		...state,
		// 		isBuildMode: action.payload ? action.payload.isBuildMode : false,
		// 	}
		// }
		// case 'set-selected-figure': {
		//     return {
		//         ...state,
		//         selectedFigure: action.payload ? action.payload.selectedFigure : null,
		//     }
		// }
		// case 'set-selected-scale': {
		// 	return {
		// 		...state,
		// 		selectedScale: action.payload ? action.payload.selectedScale : 1,
		// 	}
		// }
		// case 'change-figure-sides': {
		// 	return {
		// 		...state,
		// 		figureSides: {
		// 			figureASide: action.payload ? action.payload.figureASide : null,
		// 			figureBSide: action.payload ? action.payload.figureBSide : null,
		// 			figureCSide: action.payload ? action.payload.figureCSide : null,
		// 			figureDSide: action.payload ? action.payload.figureDSide : null,
		// 		},
		// 	}
		// }
		// case 'remove-all': {
		// 	return {
		// 		...state,
		// 		selectedFigure: initialState.selectedFigure,
		// 		figureSides: initialState.figureSides,
		// 		editedMode: 0,
		// 		isEditedMode: false,
		// 		isBuildMode: false,
		// 		clickedCoords: {
		// 			x: null,
		// 			y: null,
		// 		},
		// 		polygonCoords: [],
		// 	}
		// }

		default:
			return initialState
	}
}
