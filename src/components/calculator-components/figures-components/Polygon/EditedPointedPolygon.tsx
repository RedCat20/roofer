import React, { FC, useState } from "react";
import { Circle, Layer, Line } from "react-konva";

interface Props {
    coords: any[];
    calcPolygonPointsCallback: (coords: any[]) => void;
}

const EditedPointedPolygon: FC<Props> = ({coords,calcPolygonPointsCallback}) => {

    const [builtCustomPoints, setBuiltCustomPoints] = useState([]);

    const [lines, setLines]  = useState<number[]>([]);

    const lineRef = React.useRef(null);

    React.useEffect(() => {

        if (coords !== null) {

            // build anchors
            let buildCustomPointsCopy: any = [];

            for (let i = 0; i < coords.length; i++) {
                buildCustomPointsCopy.push(buildAnchor(coords[i].x, coords[i].y, String(i), i));
            }

            setBuiltCustomPoints(buildCustomPointsCopy);

            // set array of points to lines
            let l: any = [];
            for (let i = 0; i < coords.length; i++) {
                // @ts-ignore
                l.push(coords[i].x);
                // @ts-ignore
                l.push(coords[i].y);
            }
            // @ts-ignore
            setLines(l);
        }
    }, [coords]);

    // Побудова точки
    let buildAnchor = (x: number, y: number, name: string, key: number) => {
        return <Circle key={key}
                       x = {x || 0}
                       y ={ y || 0}
                       radius = {8}
                       stroke = {'#666'}
                       fill = {'#ddd'}
                       strokeWidth = {2}
                       draggable = {true}
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

        let id = Number(e.currentTarget.id());

        // build anchors
        let dragedPoints: any = [];

        for (let i = 0; i < coords.length; i++) {
            dragedPoints[i] = coords[i];
        }

        dragedPoints[id] = {x: e.currentTarget.x(), y: e.currentTarget.y()};

        calcPolygonPointsCallback(dragedPoints)

        let l: any = [];
        for (let i = 0; i < coords.length; i++) {
            // @ts-ignore
            l.push(dragedPoints[i].x);
            // @ts-ignore
            l.push(dragedPoints[i].y);
        }

        // @ts-ignore
        setLines(l);
    }

    return (
        <>
            <Layer>
                <Line ref={lineRef}
                      points={lines}
                    //     fill={'rgba(139, 69, 19, 0.45)'}
                      stroke={'black'}
                      strokeWidth={2}
                      closed={true}
                />
            </Layer>

            <Layer style={{zIndex: 3}}>
                {builtCustomPoints}
            </Layer>
        </>
    );
}

export default EditedPointedPolygon;