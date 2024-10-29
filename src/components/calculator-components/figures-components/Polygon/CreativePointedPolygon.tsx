import React, {FC, useEffect, useState} from "react";
import { Circle, Layer, Line } from "react-konva";
import {ALL} from "dns";

interface Props {
    polygonPoints: any;
    calcPolygonPointsCallback: (points: any[]) => void;
}

const CreativePointedPolygon: FC<Props> = ({polygonPoints, calcPolygonPointsCallback}) => {

    const [points, setPoints] = useState([]);
    const [builtCustomPoints, setBuiltCustomPoints] = useState([]);

    const [lines, setLines]  = useState<number[]>([]);

    const lineRef = React.useRef(null);

    React.useEffect(() => {

        if ( polygonPoints?.length > 0) {
            // build anchors
            let buildCustomPointsCopy: any = [];
            for (let i = 0; i < points.length; i++) {
                buildCustomPointsCopy[i] = builtCustomPoints[i];
            }
            if (polygonPoints.length > 0) {
                polygonPoints.forEach((item: any, index: string | number) => {
                    // @ts-ignore
                    buildCustomPointsCopy.push(buildAnchor(polygonPoints[index].x, polygonPoints[index].y, index, index));
                })
            }
            setBuiltCustomPoints(buildCustomPointsCopy);

            // set array of points to lines
            let l: any = [];
            for (let i = 0; i < polygonPoints.length; i++) {
                // @ts-ignore
                l.push(polygonPoints[i].x);
                // @ts-ignore
                l.push(polygonPoints[i].y);
            }
            // @ts-ignore
            setLines(l);
        }

    }, [polygonPoints]);

    // Побудова точки
    let buildAnchor = (x: number, y: number, name: string, key: number) => {
        return <Circle key={key + points?.length}
                       x = {x || 0}
                       y ={ y || 0}
                       radius = {8}
                       stroke = {'#666'}
                       fill = {'#ddd'}
                       strokeWidth = {2}
                       id = {name}
                       onMouseOver = {onMouseOverHandler.bind(this)}
                       onMouseOut = {onMouseOutHandler.bind(this)}
                       onDragMove = {onDragMoveHandler.bind(this)}
        />;
    }

    function onMouseOverHandler(e: any) {
        document.body.style.cursor = 'pointer';
        e.target.strokeWidth(4);
    }

    function onMouseOutHandler(e: any) {
        document.body.style.cursor = 'default';
        e.target.strokeWidth(2);
    }

    let onDragMoveHandler = (e: any) => {
        let stage = e.target.getStage();
        const pointerPosition = stage.getPointerPosition();
    }

    return (
        <>
            <Layer>
                <Line ref={lineRef}
                    points={lines}
                    stroke={'black'}
                    strokeWidth={2}
                    closed={true}
                    opacity={1}
                />
            </Layer>

            <Layer style={{zIndex: 2}}>
                {builtCustomPoints}
            </Layer>
        </>
    );
}

export default CreativePointedPolygon;