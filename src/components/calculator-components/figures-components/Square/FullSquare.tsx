// @ts-nocheck

import React, {FC, useContext, useEffect, useState} from "react";
import { Rect, Layer } from "react-konva";
import { ICoords } from "../../../../interfaces/coords";
import {scalesConfig} from "../../../../data";
import {AppContext} from "../../../../context/AppContext";

interface Props {
    width: number;
    startCoords: ICoords;
    cellSize: number;
    gridHeight: number;
}

const FullSquare: FC<Props> = ({width, startCoords, cellSize,gridHeight}) => {

    const [topLine, setTopLine] = useState(0)
    const appContext = useContext(AppContext);

    useEffect(() => {
        let value = Math.floor(gridHeight / cellSize) * cellSize - width * cellSize;
        setTopLine(value);
    }, [gridHeight, width, cellSize]);

    return (
        <Layer>
            <Rect
                x={startCoords.x}

                y={-gridHeight / scalesConfig[`${appContext.state.selectedScale}`] + cellSize}

                width={width * cellSize}
                height={width * cellSize}
                //fill="gold"
                strokeWidth={2}
                stroke={"black"}
                opacity={1}
            />
        </Layer>
    );

}

export default FullSquare;