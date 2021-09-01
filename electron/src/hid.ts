import HID from 'node-hid'

const mayBeProgrammableKb = (d: HID.Device): boolean =>
	d.usage !== 0x06 &&
	d.usage !== 0x02 &&
	d.usage !== 0x01 &&
	d.usagePage !== 0x01

const listDevices = (): HID.Device[] => {
	const devices = HID.devices().filter(mayBeProgrammableKb)
	return devices
}

type HIDPath = string
const connect = (path: HIDPath): HIDAdapter => {
	const device = new HID.HID(path)
	return new HIDAdapter(device)
}

type HIDDeviceInfo = {
	vendorId: number
	productId: number
	manufacturer?: string
	product?: string
	serialNumber?: string
}
class HIDAdapter {
	public info: HIDDeviceInfo

	private _hidDevice: HID.HID

	constructor(hidDevice: HID.HID) {
		this._hidDevice = hidDevice
		const deviceInfo = (hidDevice as any).getDeviceInfo()
		this.info = {
			vendorId: deviceInfo.vendorId,
			productId: deviceInfo.productId,
			manufacturer: deviceInfo.manufacturer,
			product: deviceInfo.product,
			serialNumber: deviceInfo.serialNumber,
		}
	}

	send(data: number[]): number {
		const written = this._hidDevice.write(data)
		return written
	}

	receiveSync(): number[] {
		return this._hidDevice.readSync()
	}
}

export default {
	listDevices,
	connect,
}

// console.info('Devices: ', devices)
//
// const corne = devices[0]
// console.info('Remapping')
// const device = new HID.HID(corne.path)
// const written = device.write([0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x13])
// console.info('DONE, written', written)
