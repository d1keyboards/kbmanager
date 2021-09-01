import { contextBridge, ipcRenderer } from 'electron'
import { IpcRendererEvent } from 'electron/main'
import hid from './hid'

const send = (channel: string, ...message: any[]) =>
	ipcRenderer.send(channel, ...message)

const on = (
	channel: string,
	listener: (channel: string, ...message: any[]) => void
): (() => void) => {
	const handler = (_: IpcRendererEvent, message: any[]) =>
		listener(channel, message)

	ipcRenderer.on(channel, handler)

	return () => ipcRenderer.off(channel, handler)
}
contextBridge.exposeInMainWorld('electron', {
	hid,
	send,
	on,
})
