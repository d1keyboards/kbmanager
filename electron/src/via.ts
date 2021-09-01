import { chunk, reduce } from 'lodash'
import hid from './hid'
import keycodes from './key-codes'

const BUFFER_CHUNK_SIZE = 28
const VIA_COMMAND = {
	id_get_protocol_version: 0x01, // always 0x01
	id_get_keyboard_value: 0x02,
	id_set_keyboard_value: 0x03,
	id_dynamic_keymap_get_keycode: 0x04,
	id_dynamic_keymap_set_keycode: 0x05,
	id_dynamic_keymap_reset: 0x06,
	id_lighting_set_value: 0x07,
	id_lighting_get_value: 0x08,
	id_lighting_save: 0x09,
	id_eeprom_reset: 0x0a,
	id_bootloader_jump: 0x0b,
	id_dynamic_keymap_macro_get_count: 0x0c,
	id_dynamic_keymap_macro_get_buffer_size: 0x0d,
	id_dynamic_keymap_macro_get_buffer: 0x0e,
	id_dynamic_keymap_macro_set_buffer: 0x0f,
	id_dynamic_keymap_macro_reset: 0x10,
	id_dynamic_keymap_get_layer_count: 0x11,
	id_dynamic_keymap_get_buffer: 0x12,
	id_dynamic_keymap_set_buffer: 0x13,
	id_unhandled: 0xff,
}

// const devices = hid.listDevices()
// const kb = devices.find(d => d.vendorId === 19280 && d.productId === 13360)

// const device = hid.connect(kb.path)

// device.send([0x00, VIA_COMMAND.id_dynamic_keymap_get_layer_count])
// const data = device.receiveSync()

// const rows = 4
// const cols = 12
// const layers = data[1]

// const bufferSize = layers * rows * cols * 2
// let buffer = []
// let offset = 0
// const bits = []

// while (offset < bufferSize) {
// 	const chunkSize = Math.min(BUFFER_CHUNK_SIZE, bufferSize - offset)
// 	device.send([
// 		0x00,
// 		VIA_COMMAND.id_dynamic_keymap_get_buffer,
// 		offset >> 8,
// 		offset & 0xff,
// 		chunkSize,
// 	])
// 	const chunk = device.receiveSync()
// 	const keys = reduce(
// 		chunk.slice(4),
// 		(acc, bit, i) => {
// 			if (i < chunkSize) {
// 				bits.push(bit)
// 				if (i % 2) {
// 					const lastIdx = acc.length - 1
// 					acc[lastIdx] = (acc[lastIdx] << 8) | bit
// 				} else {
// 					acc.push(bit)
// 				}
// 			}
// 			return acc
// 		},
// 		[]
// 	).map(
// 		c => keycodes.fromHex(c)?.label.replace('\n', '').substring(0, 6) || '____'
// 	)

// 	buffer = [...buffer, ...keys]
// 	offset += chunkSize
// }

// const layerKeymaps = chunk(buffer, rows * cols)
