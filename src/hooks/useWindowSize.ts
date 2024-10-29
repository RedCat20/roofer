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

import {useEffect, useContext, useLayoutEffect, useState} from 'react';
import { AppContext } from "../context/AppContext";
import { IGridConfig } from "../interfaces/grid-config-interface";
import {gridParams} from "../data";


export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
