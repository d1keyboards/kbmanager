import { EventEmitter } from 'events'
import USB from 'usb-detection'
import hid, { HIDAdapter, HIDDeviceInfo } from './hid'

type KeyboardId = number
class KeyboardConnection {
	private _hid: HIDAdapter
	public keyboardId: KeyboardId
	public info: HIDDeviceInfo

	constructor(hid: HIDAdapter, keyboardId: KeyboardId) {
		this._hid = hid
		this.keyboardId = keyboardId
		this.info = hid.info
	}

	close() {
		this._hid.close()
	}
}

type KeyboardEventHandler<T extends KeyboardEventType> = (
	event: KeyboardEventBase<T>
) => void
type Unregister = () => void

type KeyboardEventBase<Type extends string, Payload = undefined> = {
	type: Type
	connection: KeyboardConnection
}
type KeyboardConnected = KeyboardEventBase<'KeyboardConnected'>
type KeyboardDisconnected = KeyboardEventBase<'KeyboardDisconnected'>
type KeyboardEvent = KeyboardConnected | KeyboardDisconnected
type KeyboardEventType = KeyboardEvent['type']

// TODO: implement
const isKnownKeyboard = (device: USB.Device) => true

class KeyboardManager {
	private _emitter = new EventEmitter()
	private _connections: Record<number, KeyboardConnection> = {}

	constructor() {
		USB.startMonitoring()
		USB.on('add', this.handleDeviceConnected.bind(this))
		USB.on('remove', this.handleDeviceDisconnected.bind(this))
	}

	private emit<T extends KeyboardEventType>(
		event: T,
		connection: KeyboardConnection
	): void {
		this._emitter.emit(event, connection)
	}

	private handleDeviceConnected(connected: USB.Device): void {
		if (isKnownKeyboard(connected)) {
			const hidDevice = hid
				.listDevices()
				.find(
					d =>
						d.path &&
						d.productId === connected.productId &&
						d.vendorId === connected.vendorId
				)
			if (hidDevice && hidDevice.path) {
				const hidAdapter = hid.connect(hidDevice.path)
				const connection = new KeyboardConnection(
					hidAdapter,
					connected.deviceAddress
				)
				this._connections[connection.keyboardId] = connection
				this.emit('KeyboardConnected', connection)
			}
		}
	}
	private handleDeviceDisconnected(device: USB.Device): void {
		const connection = this._connections[device.deviceAddress]
		if (connection) {
			connection.close()
			delete this._connections[device.deviceAddress]
			this.emit('KeyboardDisconnected', connection)
		}
	}

	on<T extends KeyboardEventType>(
		event: T,
		listener: KeyboardEventHandler<T>
	): Unregister {
		const handler = (connection: KeyboardConnection) =>
			listener({ type: event, connection })

		this._emitter.on(event, handler)
		return () => this._emitter.off(event, handler)
	}

	shutdown() {
		USB.stopMonitoring()
	}
}

export default new KeyboardManager()
