import React, { Component } from "react";
import {
    Stage,
    Layer,
    Transformer,
    Shape,
} from "react-konva";

interface MyProps {
    shape: any;
}

interface MyState { }

class Polygon extends React.Component<MyProps, MyState> {
    private shape = this.props.shape;
    componentDidMount() {
        const { points } = this.props.shape;
        this.shape.getSelfRect = () => {
            const xs = points.map((p: { x: any; }) => p.x);
            const ys = points.map((p: { y: any; }) => p.y);
            const minX = Math.min(...xs);
            const maxX = Math.max(...xs);
            const minY = Math.min(...ys);
            const maxY = Math.max(...ys);
            return {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY
            };
        };
    }
    render() {
        return (
            <Shape
                sceneFunc={(context, shape) => {
                    context.beginPath();

                    {
                        this.props.shape.points.map((point: { x: any; y: any; }, i: number) =>
                            i === 0
                                ? context.moveTo(point.x, point.y)
                                : context.lineTo(point.x, point.y)
                        );
                    }

                    context.closePath();
                    // (!) Konva specific method, it is very important
                    context.fillStrokeShape(shape);
                }}
                radius={100}
                sides={4}
                fill={"lightblue"}
                stroke={"black"}
                strokeWidth={1}
                name={this.props.shape.name}
                draggable
                ref={node => {
                    this.shape = node;
                }}
            />
        );
    }
}

interface TransProps {
    selectedShapeName: string;
}

interface TransState {

}

class TransformerComponent extends React.Component<TransProps, TransState> {
    private transformer: any;
    componentDidMount() {
        this.checkNode();
    }
    componentDidUpdate() {
        this.checkNode();
    }
    checkNode() {
        // here we need to manually attach or detach Transformer node
        const stage = this.transformer.getStage();
        const { selectedShapeName } = this.props;

        const selectedNode = stage.findOne("." + selectedShapeName);
        // do nothing if selected node is already attached
        if (selectedNode === this.transformer.node()) {
            return;
        }

        if (selectedNode) {
            // attach to another node
            this.transformer.attachTo(selectedNode);
        } else {
            // remove transformer
            this.transformer.detach();
        }
        this.transformer.getLayer().batchDraw();
    }
    render() {
        return (
            <Transformer
                ref={node => {
                    this.transformer = node;
                }}
            />
        );
    }
}

interface TrapProps {
    setSelectedCallback: (id: any) => void;
    selectedId: any;
    polygonPoints: any[];
    selectedShapeName: string;
}

interface TrapState {

}

class TransformedPolygon extends Component<TrapProps, TransState> {
    // @ts-ignore
    // private trRef = React.useRef(null)<React.LegacyRef<Transformer> | undefined>;
    private trRef = null;

    componentDidMount() {
    }

    componentDidUpdate(previousProps:TrapProps, previousState:TrapState) {
        if (previousProps.selectedShapeName !== this.props.selectedShapeName) {
            this.setState({selectedShapeName: this.props.selectedShapeName})
        }
    }

    state = {
        shape: {
            stroke: "black",
            strokeWidth: 1,
            points: this.props.polygonPoints,
            //    points: [
            //         { x: 50, y: 50 },
            //         { x: 200, y: 50 },
            //         { x: 250, y: 100 },
            //         { x: 200, y: 200 },
            //         { x: 0, y: 200 }
            //     ],
            fill: "#00D2FF",
            name: "poly3",
            type: "poly",
            key: 3
        },

        selectedShapeName: ""
    };

    // handleStageMouseDown = (e: any) => {
    //     // clicked on stage - cler selection
    //     if (e.target === e.target.getStage()) {
    //         this.setState({
    //             selectedShapeName: ""
    //         });
    //         return;
    //     }
    //     // clicked on transformer - do nothing
    //     const clickedOnTransformer =
    //         e.target.getParent().className === "Transformer";
    //     if (clickedOnTransformer) {
    //         return;
    //     }
    //
    //     // find clicked rect by its name
    //     const name = e.target.name();
    //     this.setState({
    //         selectedShapeName: name
    //     });
    // };

    render() {
        // @ts-ignore
        return (
            // <Stage
            //     width={window.innerWidth}
            //     height={window.innerHeight}
            //     onMouseDown={this.handleStageMouseDown}
            // >
            <Layer>
                <Polygon key={this.state.shape.key} shape={this.state.shape} />
                <TransformerComponent
                    selectedShapeName={this.state.selectedShapeName}
                />
            </Layer>
            // </Stage>
        );
    }
}

export default TransformedPolygon;