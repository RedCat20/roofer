// import React, { Component } from "react";
// import {
//     Layer,
//     Transformer,
//     Shape,
// } from "react-konva";
//
// interface MyProps {
//     shape: any;
//     setNewPointsCallback: any;
// }
//
// interface IArr {
//     x: number;
//     y: number;
// }
//
// interface MyState {
//     arr: IArr[]
// }
//
// export class TrianglePolygon extends React.Component<MyProps, MyState> {
//     private shape = this.props.shape;
//     componentDidMount() {
//         const { points } = this.props.shape;
//         this.shape.getSelfRect = () => {
//             const xs = points.map((p: { x: any; }) => p.x);
//             const ys = points.map((p: { y: any; }) => p.y);
//             const minX = Math.min(...xs);
//             const maxX = Math.max(...xs);
//             const minY = Math.min(...ys);
//             const maxY = Math.max(...ys);
//             return {
//                 x: minX,
//                 y: minY,
//                 width: maxX - minX,
//                 height: maxY - minY
//             };
//         };
//     }
//
//     state = {
//         arr: []
//     }
//
//     componentDidUpdate() {
//         this.props.setNewPointsCallback(this.state.arr);
//     }
//
//     ///
//     sceneFunc = (context: any, shape: any) => {
//             context.beginPath();
//         {
//             this.props.shape.points.map((point: { x: any; y: any; }, i: number) => {
//          //   console.log("x: ", point.x, "y", point.y)
//
//
//
//             i === 0
//                 ? context.moveTo(point.x, point.y)
//         : context.lineTo(point.x, point.y)
//
//         }
//         );
//
//
//         }
//
//         context.closePath();
//         // (!) Konva specific method, it is very important
//         context.fillStrokeShape(shape);
//         }
//
//     ///
//
//
//     render() {
//         return (
//             <Shape
//                 sceneFunc={this.sceneFunc}
//
//                 onTransform={(e) => {
//                     const t = e.target;
//                     const width = t.width() * t.scaleX();
//                     const height = t.height() * t.scaleY();
//
//
//                     let arrCopy = this.state.arr;
//
//                     // @ts-ignore
//                     arrCopy.push({x: e.currentTarget.x(), y: e.currentTarget.y()})
//                     // @ts-ignore
//                     this.setState({ arr: arrCopy });
//
//
//                     // t.setAttrs({
//                     //     width,
//                     //     height,
//                     //     scaleX: 1,
//                     //     scaleY: 1,
//                     // });
//                 }}
//
//                 radius={100}
//                 sides={4}
//                 fill={"lightblue"}
//                 stroke={"black"}
//                 strokeWidth={1}
//                 name={this.props.shape.name}
//                 draggable
//                 ref={node => {
//                     this.shape = node;
//                 }}
//             />
//         );
//     }
// }
//
// interface TransProps {
//     selectedShapeName: string;
// }
//
// interface TransState {
//
// }
//
// class TransformerComponent extends React.Component<TransProps, TransState> {
//     private transformer: any;
//     componentDidMount() {
//         this.checkNode();
//     }
//     componentDidUpdate() {
//         this.checkNode();
//     }
//     checkNode() {
//         // here we need to manually attach or detach Transformer node
//         const stage = this.transformer.getStage();
//         const { selectedShapeName } = this.props;
//
//         const selectedNode = stage.findOne("." + selectedShapeName);
//         // do nothing if selected node is already attached
//         if (selectedNode === this.transformer.node()) {
//             return;
//         }
//
//         if (selectedNode) {
//             // attach to another node
//             this.transformer.attachTo(selectedNode);
//         } else {
//             // remove transformer
//             this.transformer.detach();
//         }
//         this.transformer.getLayer().batchDraw();
//     }
//
//     handleChange = (e: { target: any; }) => {
//         const shape = e.target;
//         // take a look into width and height properties
//         // by default Transformer will change scaleX and scaleY
//         // while transforming
//         // so we need to adjust that properties to width and height
//
//         let x =  shape.x();
//         let y =  shape.y();
//
//         console.log("x: ", x);
//         console.log("y: ", y);
//
//
//        // this.props.onTransform({
//             // x: shape.x(),
//             // y: shape.y(),
//             // width: shape.width() * shape.scaleX(),
//             // height: shape.height() * shape.scaleY(),
//             // rotation: shape.rotation()
//        // });
//     };
//
//     render() {
//         return (
//             <Transformer
//               //  dragBoundFunc={}
//
//                 onDragMove={(attr: any) => {
//                 }}
//
//                // onDragMove={}
//                 onTransformEnd={this.handleChange}
//                 onChange={(newAttrs: any) => {
//                 }}
//               onTransform={(newAttrs: any) => {
//               }}
//                 ref={node => {
//                     this.transformer = node;
//                 }}
//             />
//         );
//     }
// }
//
// interface TrapProps {
//     setSelectedCallback: (id: any) => void;
//     selectedId: any;
//     trianglePoints: any[];
//     selectedShapeName: string;
//     setNewPointsCallback: any;
// }
//
// interface TrapState {
//
// }
//
// class TransformedTriangle extends Component<TrapProps, TransState> {
//     // @ts-ignore
//     // private trRef = React.useRef(null)<React.LegacyRef<Transformer> | undefined>;
//     private trRef = null;
//
//     componentDidMount() {
//     //    console.log("componentDidMount is transformed triangle", this.props.trianglePoints)
//
//     }
//
//     componentDidUpdate(previousProps:TrapProps, previousState:TrapState) {
//     //    console.log("componentDidUpdate is transformed triangle", this.props.trianglePoints)
//
//         if (previousProps.selectedShapeName !== this.props.selectedShapeName) {
//             this.setState({selectedShapeName: this.props.selectedShapeName})
//         }
//     }
//
//     state = {
//         shape: {
//             stroke: "black",
//             strokeWidth: 1,
//             points: this.props.trianglePoints,
//             fill: "#00D2FF",
//             name: "poly2",
//             type: "poly",
//             key: 2
//         },
//
//         selectedShapeName: ""
//     };
//
//     render() {
//         return (
//             <Layer>
//                 <TrianglePolygon setNewPointsCallback={this.props.setNewPointsCallback} key={this.state.shape.key} shape={this.state.shape} />
//                 <TransformerComponent
//                     selectedShapeName={this.state.selectedShapeName}
//                 />
//             </Layer>
//         );
//     }
// }
//
// export default TransformedTriangle;

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

class TransformedTriangle extends Component<TrapProps, TransState> {
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

export default TransformedTriangle;