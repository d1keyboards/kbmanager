import type { KeyboardDescriptor, KeyDescriptor } from '~/models'
import { Serial, Key } from '@ijprest/kle-serial'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KLEKeymap = any

type VIAKeyboard = {
	name: string
	vendorId: string
	productId: string
	firmwareVersion?: number
	lightning?: 'qmk_backlight' | 'qmk_rgblight' | 'qmk_backlight_rgblight'
	keycodes?: string[]
	menus?: string[]
	matrix: {
		rows: number
		cols: number
	}
	layouts: {
		keymap: KLEKeymap
		presets?: Record<string, number[]>
		labels?: Array<string[] | string>
	}
}

const isBaseLayout = (key: Key): boolean =>
	!key.labels[8] || key.labels[8]?.endsWith('0')

const keyDefinitionParser = (key: Key): KeyDescriptor => {
	const [gridX, gridY] = key.labels[0]
		.trim()
		.split(/,\s*/)
		.map(s => parseInt(s, 10))

	return {
		gridX,
		gridY,
		x: key.x,
		y: key.y,
		width: key.width,
		height: key.height,
		rotation: key.rotation_angle,
		rotationOrigin:
			key.rotation_x || key.rotation_y
				? { x: key.rotation_x || 0, y: key.rotation_y || 0 }
				: undefined,
		decals: key.decal,
		color: key.color,
		textColor: key.textColor?.[0],
	}
}

// https://github.com/ijprest/keyboard-layout-editor/wiki/Serialized-Data-Format
// https://caniusevia.com/docs/layouts
export const parse = (source: VIAKeyboard): KeyboardDescriptor => {
	const kleData = Serial.deserialize(source.layouts.keymap)
	const layout = kleData.keys.filter(isBaseLayout).map(keyDefinitionParser)
	const width = layout.reduce((acc, key) => {
		return Math.max(acc, key.x + (key.width || 1))
	}, 0)
	const height = layout.reduce((acc, key) => {
		return Math.max(acc, key.y + (key.height || 1))
	}, 0)

	console.info({ kleData, width, height })
	return {
		name: source.name || kleData.meta?.name,
		vendorId: source.vendorId,
		productId: source.productId,
		hasRGB:
			source.lightning === 'qmk_rgblight' ||
			source.lightning === 'qmk_backlight_rgblight' ||
			source.keycodes?.includes('via/qmk_lighting'),
		hasBacklight:
			source.lightning === 'qmk_backlight' ||
			source.lightning === 'qmk_backlight_rgblight' ||
			source.keycodes?.includes('via/qmk_lighting'),
		matrix: source.matrix,
		width,
		height,
		color: kleData.meta?.backcolor,
		borderRadius: kleData.meta?.radii,
		layout,
	}
}
