import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'

type Listener<Data extends []> = (channel: string, ...data: Data) => void
type Unsubsribe = () => void

export class MessageBus {
	private _window: BrowserWindow

	constructor(window: BrowserWindow) {
		this._window = window
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	send(channel: string, ...data: any[]): void {
		this._window.webContents.send(channel, ...data)
	}

	receive<Data extends []>(
		channel: string,
		listener: Listener<Data>
	): Unsubsribe {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const handler = (_: IpcMainEvent, ...data: any[]): void => {
			listener(channel, ...(data as Data))
		}
		ipcMain.on(channel, handler)
		return () => ipcMain.off(channel, handler)
	}
}
