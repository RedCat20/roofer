// @ts-nocheck

import React, { FC, useContext, useEffect, useRef, useState} from "react";
import "./CalculationResultBlock.scss";

import {AppContext} from "../../../../context/AppContext";

interface IProps {
    square_s: any;
    blocks_general: any;
    useful_square: any;

    first_row_blocks_count: any;
    second_row_blocks_count: any;
    top_row_blocks_count: any;
}

const CalculationResultBlock: FC<IProps> = ({ }) => {

    const appContext = useContext(AppContext);

    return (
        <div>
            <br/>
            Площа фігури ${0} м2.
            <br/>
            Загальна площа листів ${0} м2.
            <br/>
            Корисна площа листів ${0} м2.
            <br/>
            Відходи ${0}%.
            <br/>
            <br/>
            Листи 1 ряду: ${0} шт - ${0} м x ${0} м;
            <br/>
            Листи 2 ряду: ${0} шт - ${0} м x ${0} м;
            <br/>
            Листи верхнього ряду: ${0} шт - ${0} м x ${0} м;
            <br/>
            <br/>
        </div>
    );
}

export default CalculationResultBlock;