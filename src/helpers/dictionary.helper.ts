// @triangleH - в метрах
export const getTileBottomSheetRecommend = (triangleH: number, dictionaryItem: any) => {
    let halfOfHeight = triangleH / 2 * 1000; // метри переводимо в міліметри

    return Math.max(...dictionaryItem.recommended.filter((v: number) => v < halfOfHeight));
}

// @triangleH - в метрах
export const getTileTopSheetMade = (triangleH: number, dictionaryItem: any, tileBottomSheetHeightInMm: any) => {
    let value = 0;

    let leaveTopH = triangleH * 1000 - tileBottomSheetHeightInMm * 2; // метри переводимо в міліметри

    dictionaryItem.made.forEach((item: any) => {
        let arrSplit = item.split("-");
        if ((leaveTopH >= Number(arrSplit[0]) && leaveTopH <= Number(arrSplit[1])) || (leaveTopH < Number(arrSplit[0]))) {
            value = leaveTopH / 10;
        }
    });

    return value;
}

