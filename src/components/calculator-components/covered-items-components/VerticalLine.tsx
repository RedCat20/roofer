import React, {FC, useState} from "react";
import {Line} from "react-konva";

interface IAddTableRowDialogProps {
    figureName: any;
    leaveCrossCoord: any;

    xCoord: any;
    yCoord: any;

    color: any;
}

const VerticalLine: FC<IAddTableRowDialogProps> = ({ figureName, leaveCrossCoord, xCoord, yCoord, color }) => {

    return (
        <>
            <Line key={`covered-${figureName}-vertical-overlap-${Math.random()}`}
                  x={xCoord}
                  y={yCoord}
                  width={1}
                  points={[0, 0, 0, leaveCrossCoord, 0]}
                  stroke={color}
            />
        </>
    )
}

export default VerticalLine;