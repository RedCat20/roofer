import {createContext, useContext, useReducer} from 'react';
import { appReducer } from './appReducer';
import { FC } from "react";

import { initialState } from '../data';

export const AppContext = createContext(initialState);

interface Props {
    children: any;
}

export const AppContextProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}


export const AppContextStageProvider: FC<Props> = ({ children }) => {
    const appContext = useContext(AppContext);

    const [state, dispatch] = useReducer(appReducer, appContext);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}