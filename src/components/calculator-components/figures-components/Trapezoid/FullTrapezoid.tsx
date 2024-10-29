// @ts-nocheck

import React, {FC, useContext, useEffect, useState} from "react";
import { Layer, Shape } from "react-konva";
import { ICoords } from "../../../../interfaces/coords";
import {scalesConfig} from "../../../../data";
import {AppContext} from "../../../../context/AppContext";

interface Props {
    figureASide: number;
    figureCSide: number;
    figureDSide: number;
    figureBSide: number;
    startCoords: ICoords;
    cellSize: number;
    gridHeight: number;
    calcTrapezoidPointsCallback: (points: any[]) => void;
}

const FullTrapezoid: FC<Props> = ({ figureASide,
                                      figureCSide,
                                      figureDSide,
                                      figureBSide,
                                      startCoords,
                                      cellSize,
                                      gridHeight,
                                      calcTrapezoidPointsCallback}) => {

    let [points, setPoints] = useState<any[]>([])
    const appContext = useContext(AppContext);

    useEffect(() => {
        calcCoords();
    }, [figureASide,figureCSide, figureDSide, figureBSide, startCoords ] )

    function calcCoords() {

        if (figureASide === 0 || figureBSide === 0 || figureBSide >= figureASide) {
            return;
        }

        if (figureCSide + figureCSide > figureASide + figureBSide) return;

        let baseLength: number = figureASide * cellSize;
        let topLength: number = figureBSide * cellSize;

        let side1: number = figureCSide * cellSize;
        let side2: number = 0;

        if (figureDSide === figureCSide) {
            side2 = side1;
        } else {
            side2 = figureDSide * cellSize;
        }

        let R1 = side2, R2 = side1, R3 = baseLength, R4 = topLength;
        let Ax = 0, Ay = -0;
        let Bx = R3, By = -0;
        let Cx = (R2 * R1 + R3 * R3 - R1 * R1) / (2 * R3);
        let Cy = -Math.sqrt(R2 * R2 - Cx * Cx);

        let Ox = 0;

        let figureBottomLine = -gridHeight  / scalesConfig[`${appContext.state.selectedScale}`] + cellSize;

        let Oy = figureBottomLine - cellSize;

        let Dx = R4 + Cx, Dy = Oy - Cy;

        calcTrapezoidPointsCallback([
            {x: Ox + Ax + cellSize, y: Oy - Ay + cellSize},
            {x: Ox + Bx + cellSize, y: Oy - By + cellSize},
            {x: Dx + cellSize, y: Dy + cellSize},
            {x: Ox + Cx + cellSize, y: Oy - Cy + cellSize}]);
    }


    let sceneFunc = function (ctx: any, shape: any) {
        if (figureASide === 0 || figureBSide === 0 || figureBSide >= figureASide) {
            return;
        }

        let baseLength: number = figureASide * cellSize;
        let topLength: number = figureBSide * cellSize;

        ctx.beginPath();

            let side1: number = figureCSide * cellSize;
            let side2: number = 0;

            if (figureDSide === figureCSide) {
            //    side2 = side1;
            } else {
            //    side2 = figureDSide * cellSize;
            }

            let R1=side2, R2=side1, R3=baseLength, R4=topLength;

            let Ax=0, Ay=-0;
            let Bx=R3, By=-0;
            let Cx=(R2*R1+R3*R3-R1*R1)/(2*R3);
            let Cy=- Math.sqrt(R2*R2-Cx*Cx);

            let figureBottomLine = -gridHeight / scalesConfig[`${appContext.state.selectedScale}`] + cellSize;
           // let figureBottomLine = - Math.floor(gridHeight / cellSize) * cellSize;

            let Ox = 0;
            let Oy = figureBottomLine - cellSize;

            let Dx=R4 + Cx, Dy=Oy-Cy;

            ctx.font = "32px serif";
            ctx.fillStyle = "darkgreen";
            ctx.beginPath();

            ctx.moveTo(Ox+Ax, Oy-Ay); // ліва нижня точка

          //  ctx.fillText("A", (Ox+Ax + Ox+Bx) / 2, (Oy-Ay + Oy-By) / 2);

            ctx.lineTo(Ox+Bx, Oy-By); // права нижня точка

            ctx.fillText("D", (Ox+Bx + Dx) / 2, (Oy-By + Dy) / 2);

            ctx.lineTo(Dx, Dy); // права верхня точка

            ctx.fillText("B", (Dx + Ox+Cx) / 2 , (Dy + Oy-Cy) / 2 + 24);

            ctx.lineTo(Ox+Cx, Oy-Cy); // ліва верхня точка

            ctx.fillText("C", (Ox+Cx + Ox+Ax) / 2 - 30, (Oy-Cy + Oy-Ay) / 2);

            setPoints([{x:Ox+Ax, y:Oy-Ay},{x:Ox+Bx, y:Oy-By},{x:Dx, y:Dy},{x:Ox+Cx,y:Oy-Cy}]);

            ctx.save();

            ctx.translate((Ox+Ax + Ox+Bx) / 2, Oy-By);

            ctx.rotate(-3.15);

            ctx.textAlign = 'left';

            ctx.fillText('A', 0, 0);

            ctx.restore();

            ctx.fillStyle = 'red';
            ctx.closePath();

            ctx.lineWidth=2;
               ctx.stroke();
        }

    return (
        <Layer>
            <Shape
                x={startCoords.x}
                y={startCoords.y}
                sceneFunc={sceneFunc.bind(this)}
                fill="gold"
                // strokeWidth={10}
                stroke={"black"}
                opacity={1}
            />
        </Layer>
    )
}

export default FullTrapezoid;