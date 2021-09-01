export type KeyDescriptor = {
	gridX: number
	gridY: number
	x: number
	y: number
	width?: number
	height?: number
	rotation?: number
	rotationOrigin?: {
		x: number
		y: number
	}
	decals?: boolean

	color?: string
	textColor?: string
	label?: string
}

export type KeyboardDescriptor = {
	name: string
	vendorId: string
	productId: string
	hasRGB?: boolean
	hasBacklight?: boolean
	width: number
	height: number
	color?: string
	borderRadius?: string
	matrix: {
		rows: number
		cols: number
	}
	layout: KeyDescriptor[]
}
