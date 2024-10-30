//
// interface IWindowSize {
//     width: number;
//     height: number;
// }
//
// export class GridAdaptationService {
//
//     windowSize: IWindowSize = {
//         width: 0,
//         height: 0,
//     }
//
//     // constructor(props: any) {
//     //     // @ts-ignore
//     //     super(props);
//     // }
//
//     setWindowSize() {
//         this.windowSize = {
//             width: window.innerWidth,
//             height: window.innerHeight
//         }
//     }
//
//     getWindowSize() {
//         return this.windowSize;
//     }
// }

import { useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { IGridConfig } from '../interfaces/grid-config-interface'
import { gridParams } from '../data'
import { useWindowSize } from './useWindowSize'

export function useGridConfig(currentWindow: any, scale: number = 1) {
	const [width, height] = useWindowSize()

	const appContext = useContext(AppContext)
	const state = appContext?.state
	const gridConfig = state?.gridConfig

	let defaultGridConfig: IGridConfig | null = null

	useEffect(() => {
		let createdScale = `scale${scale}`

		// //if ((width >= 1920) || window.innerWidth >= 1920) {
		// // if (width >= 1920) {
		// defaultGridConfig = {
		// 	// width: 1215
		// 	width: gridParams.size1.scale1.width,
		// 	// height: 700,
		// 	height: gridParams.size1.scale1.height,
		// 	// startCoords: {x: 100, y: 100},
		// 	startCoords: gridParams.size1.scale1.startCoords,
		// 	// cellSize: 100,
		// 	cellSize: gridParams.size1.scale1.cellSize,
		// 	// gridHorizontalNumbers: 10,
		// 	gridHorizontalNumbers: gridParams.size1.scale1.gridHorizontalNumbers,
		// 	// gridVerticalNumbers: 5,
		// 	gridVerticalNumbers: gridParams.size1.scale1.gridVerticalNumbers,
		// }
		// // } else if((width || window.innerWidth < 1920) && (width || window.innerWidth >= 1366)) {
		// // }

		// // else if(width < 1920 && width >= 1366) {
		// //     defaultGridConfig = gridParams.size2.scale1;
		// //     // defaultGridConfig = {
		// //     //     width: 1080,
		// //     //     height: 630,
		// //     //     startCoords: {x: 90, y: 90},
		// //     //     cellSize: 90,
		// //     //     gridHorizontalNumbers: 10,
		// //     //     gridVerticalNumbers: 5,
		// //     // }
		// // // } else if ((width || window.innerWidth < 1366) && (width || window.innerWidth >= 1200)) {
		// // // } else if (width < 1366 && width >= 1200) {
		// // }
		// //
		// // else if (width < 1366 && width >= 1000) {
		// //     defaultGridConfig = gridParams.size3.scale1;
		// //     // defaultGridConfig = {
		// //     //     width: 960,
		// //     //     height: 560,
		// //     //     startCoords: {x: 80, y: 80},
		// //     //     cellSize: 80,
		// //     //     gridHorizontalNumbers: 10,
		// //     //     gridVerticalNumbers: 5,
		// //     // }
		// // // } else if ((width) || (window.innerWidth < 1200)) {
		// // // } else if (width < 1200) {
		// // }
		// //
		// // else if (width < 999) {
		// //     defaultGridConfig = gridParams.size4.scale1;
		// //     // defaultGridConfig = {
		// //     //     width: 720,
		// //     //     height: 420,
		// //     //     startCoords: {x: 60, y: 60},
		// //     //     cellSize: 60,
		// //     //     gridHorizontalNumbers: 10,
		// //     //     gridVerticalNumbers: 5,
		// //     // }
		// // }

		//if ((width >= 1920) || window.innerWidth >= 1920) {
		if (width >= 1700) {
			defaultGridConfig = {
				width: 1215,
				// width: 1215,
				// width: gridParams.size1.scale1.width,
				height: 700,
				// height: gridParams.size1.scale1.height,
				startCoords: { x: 100, y: 100 },
				// startCoords: gridParams.size1.scale1.startCoords,
				cellSize: 100,
				// cellSize: gridParams.size1.scale1.cellSize,
				gridHorizontalNumbers: 10,
				// gridHorizontalNumbers: gridParams.size1.scale1.gridHorizontalNumbers,
				gridVerticalNumbers: 5,
				// gridVerticalNumbers: gridParams.size1.scale1.gridVerticalNumbers,
			}
		}
		// } else if((width || window.innerWidth < 1920) && (width || window.innerWidth >= 1366)) {
		// }
		else if (width < 1700 && width >= 1366) {
			// defaultGridConfig = gridParams.size2.scale1
			defaultGridConfig = {
				width: 1080,
				height: 700,
				startCoords: { x: 90, y: 90 },
				cellSize: 90,
				gridHorizontalNumbers: 10,
				gridVerticalNumbers: 5,
			}
			// } else if ((width || window.innerWidth < 1366) && (width || window.innerWidth >= 1200)) {
		} else if (width < 1366 && width >= 899) {
			// defaultGridConfig = gridParams.size3.scale1
			defaultGridConfig = {
				width: 660,
				height: 560,
				startCoords: { x: 80, y: 80 },
				cellSize: 80,
				gridHorizontalNumbers: 10,
				gridVerticalNumbers: 5,
			}
			// } else if ((width) || (window.innerWidth < 1200)) {
			// } else if (width < 1200) {
		} else if (width < 900) {
			// defaultGridConfig = gridParams.size4.scale1
			defaultGridConfig = {
				width: 500,
				height: 420,
				startCoords: { x: 60, y: 60 },
				cellSize: 60,
				gridHorizontalNumbers: 10,
				gridVerticalNumbers: 5,
			}
		}

		appContext.dispatch({
			type: 'set-default-grid-config',
			payload: { gridConfig: defaultGridConfig },
		})

		// if(windowWidth >= 1920) {
		//     appContext.dispatch({type: 'size1-scale'});
		// } else if(windowWidth < 1920 && windowWidth >= 1366) {
		//     appContext.dispatch({type: 'size2-scale'});
		// } else if (windowWidth < 1366) {
		//     appContext.dispatch({type: 'size3-scale'});
		// }
	}, [currentWindow, width])

	return gridConfig
}
