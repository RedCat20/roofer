import React, { FC, useContext, useEffect } from "react";
import CanvasFullGrid from "./CanvasFullGrid";
import CanvasSimpleGrid from "./CanvasSimpleGrid";
import { AppContext } from "../../../../context/AppContext";
import {StageConsumer} from "../../../../context/StageConsumer";
import {useGridConfig} from "../../../../hooks/useGridConfig";

interface Props { }

const CanvasGridContainer: FC<Props> = () => {
    const gridConfig = useGridConfig(window);
    const appContext = useContext(AppContext);

    const { isBuildMode, isEditedMode } = appContext.state;

    return (
        <>
            {isEditedMode && gridConfig &&
              <CanvasFullGrid
                cellSize={gridConfig.cellSize}
                gridHeight={gridConfig.height}
                gridHorizontalNumbers={gridConfig.gridHorizontalNumbers}
                gridVerticalNumbers={gridConfig.gridVerticalNumbers}
              />}
            {!isEditedMode && gridConfig &&
              <CanvasSimpleGrid
                cellSize={gridConfig.cellSize}
                gridHeight={gridConfig.height}
                gridHorizontalNumbers={gridConfig.gridHorizontalNumbers}
                gridVerticalNumbers={gridConfig.gridVerticalNumbers}
              />}
        </>
    )
}

export default CanvasGridContainer;