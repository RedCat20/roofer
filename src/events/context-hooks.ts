import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export function Usesize1StartCoords() {
    const { appState, dispatch } = useContext(AppContext);
    const { startCoords } = appState || {};

    useEffect(() => {
        if (window.innerWidth >= 1920) {
            dispatch(
            {
                startCoords: {
                    x: 100,
                    y: 100,
                },
            })
        }
    }, []);

    return startCoords;
}

export function UseFullStartCoords() {
    const { appState, dispatch } = useContext(AppContext);
    const { startCoords } = appState || {};

    useEffect(() => {
        if (window.innerWidth >= 1280 && window.innerWidth < 1920) {
            dispatch({startCoords: {
                    x: 50,
                    y: 50,
                }});
        }
    }, []);

    return startCoords;
}

//////

//export function UseFigureSides(a: number = 100, b: number = 100, c: number = 100, d: number = 100) {
export function UseFigureSides() {
    const { appState, dispatch } = useContext(AppContext);

    const { figureSides } = appState || {};

    useEffect(() => {
        dispatch({startCoords: {
            figureASide: 100,
            figureBSide: 100,
            figureCSide: 100,
            figureDSide: 100,
        }});
    }, []);

    return figureSides;
}