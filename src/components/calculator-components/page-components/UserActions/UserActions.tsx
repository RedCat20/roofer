import React, {FC} from "react";
import {Circle, Layer, Line} from "react-konva";
import UndoImg from "../../../../images/undo.png";
import RedoImg from "../../../../images/redo.png";
import ZoomInImg from "../../../../images/zoom-in.png";
import ZoomOutImg from "../../../../images/zoom-out.png";
import SaveImg from "../../../../images/save.png";
import PrintImg from "../../../../images/print.png";
import RemoveImg from "../../../../images/remove.png";

interface Props {
    removeBtnHandler: any;
}

export const UserActions: FC<Props> = ({removeBtnHandler}) => {

    function removeActionsBtnHandler(e: any) {
        removeBtnHandler();
    }

    return (
        <div className="user-actions-wrapper">
            <div>
                <button className="user-action__button">
                    <img src={UndoImg} alt="undo"/>
                </button>
                <button className="user-action__button">
                    <img src={RedoImg} alt="undo"/>
                </button>
            </div>
            <div>
                <button className="user-action__button">
                    <img src={ZoomInImg} alt="zoom-in" />
                </button>
                <button className="user-action__button">
                    <img src={ZoomOutImg} alt="zoom-out" />
                </button>
            </div>
            <div>
                <button className="user-action__button">
                    <img src={SaveImg} alt="save" />
                </button>
                <button className="user-action__button">
                    <img src={PrintImg} alt="print" />
                </button>
            </div>
            <div>
                <button className="user-action__button" onClick={removeActionsBtnHandler.bind(this)}>
                    <img src={RemoveImg} alt="remove"/>
                </button>
            </div>
        </div>
    )
}