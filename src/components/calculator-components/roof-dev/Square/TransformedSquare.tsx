// @ts-nocheck

import React, {
	Attributes,
	FC,
	LegacyRef,
	MutableRefObject,
	Ref,
	RefObject,
	useRef,
} from 'react'
import { Rect, Transformer } from 'react-konva'
import { ICoords } from '../../../../interfaces/coords'

interface Props {
	shapeProps?: any
	isSelected?: any
	onSelect?: any
	onChange?: any
}

const TransformedSquare: FC<Props> = ({
	shapeProps,
	isSelected,
	onSelect,
	onChange,
}) => {
	const shapeRef = React.useRef()
	// @ts-ignore
	const trRef = React.useRef(null)<React.LegacyRef<Transformer> | undefined>

	let onTransformEndHandler = (e: any) => {
		const node = shapeRef.current
		// @ts-ignore
		const scaleX = node.scaleX()
		// @ts-ignore
		const scaleY = node.scaleY()
		// @ts-ignore
		node.scaleX(1)
		// @ts-ignore
		node.scaleY(1)
		// @ts-ignore
		onChange({
			...shapeProps,
			x: node.x(),
			y: node.y(),
			width: Math.max(5, node.width() * scaleX),
			height: Math.max(node.height() * scaleY),
		})
	}

	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually

			// @ts-ignore
			trRef.current.nodes([shapeRef.current])
			// @ts-ignore
			trRef.current.getLayer().batchDraw()
		}
	}, [isSelected])

	return (
		<React.Fragment>
			<Rect
				onClick={onSelect}
				onTap={onSelect}
				ref={shapeRef}
				{...shapeProps}
				draggable
				onDragEnd={e => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					})
				}}
				onTransformEnd={onTransformEndHandler}
			/>
			{isSelected && (
				<Transformer
					ref={trRef}
					rotateEnabled={false}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox
						}
						return newBox
					}}
				/>
			)}
		</React.Fragment>
	)
}

export default TransformedSquare
