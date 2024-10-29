export const getNewScaledCoords = (scaledCoords: any[], figureBottomLineYCoord: number) => {
    if (!scaledCoords || scaledCoords?.length < 3) return;

    const result = scaledCoords.reduce((a, b) => {
        return (a.y < b.y) ? a : b
    })

    let i = (-1 * figureBottomLineYCoord) - (-1 * result.y);

    let newCoords = [
        {x: scaledCoords[0].x, y: scaledCoords[0].y - i},
        {x: scaledCoords[1].x, y: scaledCoords[1].y - i},
        {x: scaledCoords[2].x, y: scaledCoords[2].y - i},
    ];

    if (scaledCoords.length === 4)
        newCoords.push({x: scaledCoords[3].x, y: scaledCoords[3].y - i});

    return newCoords;
}

export const getRecalcTriangleSides = (scaledCoords: any[]) => {

    if ( !scaledCoords || scaledCoords?.length !== 3 ) return {a: 0, b: 0, c: 0}

    let newASide = Math.sqrt(
        ((scaledCoords[1].x - scaledCoords[0].x) ** 2 + (scaledCoords[1].y - scaledCoords[0].y) ** 2)
    );
    newASide = +(newASide.toFixed(2));
    newASide = newASide / 100;
    newASide = +(newASide.toFixed(2));

    let newBSide = Math.sqrt(
        ((scaledCoords[2].x - scaledCoords[1].x) ** 2 + (scaledCoords[2].y - scaledCoords[1].y) ** 2)
    );
    newBSide = +(newBSide.toFixed(2));
    newBSide = newBSide / 100;
    newBSide = +(newBSide.toFixed(2));

    let newCSide = Math.sqrt(
        ((scaledCoords[0].x - scaledCoords[2].x) ** 2 + (scaledCoords[0].y - scaledCoords[2].y) ** 2)
    );
    newCSide = +(newCSide.toFixed(2));
    newCSide = newCSide / 100;
    newCSide = +(newCSide.toFixed(2));

    return {
        a: newASide,
        b: newBSide,
        c: newCSide,
    }
}

export const getRecalcTrapezoidSides = (scaledCoords: any[]) => {

    if ( !scaledCoords || scaledCoords?.length !== 4 ) return {a: 0, b: 0, c: 0, d: 0}

    let newASide = Math.sqrt(
        ((scaledCoords[1].x - scaledCoords[0].x) ** 2 + (scaledCoords[1].y - scaledCoords[0].y) ** 2)
    );
    newASide = +(newASide.toFixed(2));
    newASide = newASide / 100;
    newASide = +(newASide.toFixed(newASide / 100));

    let newBSide = Math.sqrt(
        ((scaledCoords[2].x - scaledCoords[1].x) ** 2 + (scaledCoords[2].y - scaledCoords[1].y) ** 2)
    );
    newBSide = +(newBSide.toFixed(2));
    newBSide = newBSide / 100;
    newBSide = +(newBSide.toFixed(newBSide / 100));

    let newCSide = Math.sqrt(
        ((scaledCoords[3].x - scaledCoords[2].x) ** 2 + (scaledCoords[3].y - scaledCoords[2].y) ** 2)
    );
    newCSide = +(newCSide.toFixed(2));
    newCSide = newCSide / 100;
    newCSide = +(newCSide.toFixed(newCSide / 100));

    let newDSide = Math.sqrt(
        ((scaledCoords[0].x - scaledCoords[3].x) ** 2 + (scaledCoords[0].y - scaledCoords[3].y) ** 2)
    );
    newDSide = +(newDSide.toFixed(2));
    newDSide = newDSide / 100;
    newDSide = +(newDSide.toFixed(newDSide / 100));

    return {
        a: newASide,
        b: newBSide,
        c: newCSide,
        d: newDSide,
    }
}

export const setRecalcTrapezoidSidesToInputs = (scaledCoords: any) => {

    if ( !scaledCoords || scaledCoords?.length !== 4 ) return;

    let newSides = getRecalcTrapezoidSides(scaledCoords);

    let aInput = document.querySelector('#figure-a-side-input');
    // @ts-ignore
    aInput.value = newSides.a;

    let bInput = document.querySelector('#figure-b-side-input');
    // @ts-ignore
    bInput.value = newSides.c;

    let cInput = document.querySelector('#figure-c-side-input');
    // @ts-ignore
    cInput.value = newSides.d;

    let dInput = document.querySelector('#figure-d-side-input');
    // @ts-ignore
    dInput.value = newSides.b;
}

export const setRecalcTriangleSidesToInputs = (scaledCoords: any) => {

    if ( !scaledCoords || scaledCoords?.length !== 3 ) return;

    let newSides = getRecalcTriangleSides(scaledCoords);

    let aInput = document.querySelector('#figure-a-side-input');
    // @ts-ignore
    aInput.value = newSides.a;

    let bInput = document.querySelector('#figure-b-side-input');
    // @ts-ignore
    bInput.value = newSides.b;

    let cInput = document.querySelector('#figure-c-side-input');
    // @ts-ignore
    cInput.value = newSides.c;
}

export const getFigureHeight = (scaledCoords: any) => {
    const result_bottom = scaledCoords.reduce((a: any, b: any)=>{ return (a.y < b.y) ? a : b });
    const result_top = scaledCoords.reduce((a: any, b: any)=>{ return (a.y > b.y) ? a : b });

    let height = result_top.y - result_bottom.y;

    height = +(height.toFixed(2));
    height = height / 100;
    height = +(height.toFixed(2));

    return height;
}