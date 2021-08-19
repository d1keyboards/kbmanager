// eslint-disable-next-line @typescript-eslint/no-var-requires
const HID = require('node-hid')

const listDevices = () => {
	const devices = HID.devices().filter(
		d =>
			d.manufacturer === 'foostan' &&
			d.usage !== 0x06 &&
			d.usage !== 0x02 &&
			d.usage !== 0x01 &&
			d.usagePage !== 0x01
	)
	return devices
}

module.exports = {
	listDevices,
}

// console.info('Devices: ', devices)
//
// const corne = devices[0]
// console.info('Remapping')
// const device = new HID.HID(corne.path)
// const written = device.write([0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x13])
// console.info('DONE, written', written)
