import React, {FC} from "react";
import {Rect} from "react-konva";

interface IAddTableRowDialogProps {
    figureName: any;

    xCoord: any;
    yCoord: any;

    width: any;
    height: any;

    color: any;
}

const SheetRectangle: FC<IAddTableRowDialogProps> = ({ figureName, xCoord, yCoord, width, height, color }) => {

    return (
        <>
            <Rect
                key={`${figureName}-${Math.random()}`}
                x={xCoord}
                y={yCoord}
                width={width}
                height={height}
                fill="white"
                opacity={1}
                strokeWidth={2}
                stroke={color}
                radius={20}
                zIndex={7}
            />
        </>
    )
}

export default SheetRectangle;