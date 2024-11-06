// @ts-nocheck

export const calcSideLengthByPoints = arr => {
	const [[x1, y1], [x2, y2]] = arr
	// AB = √(xb - xa)2 + (yb - ya)2
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}
