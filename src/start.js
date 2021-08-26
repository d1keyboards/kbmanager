/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1024,
		height: 768,
		nodeIntegration: false,
		enableRemoteModule: false,
		contextIsolation: true,
		nodeIntegrationInWorker: false,
		nodeIntegrationInSubFrames: false,
		webPreferences: {
			preload: path.resolve(path.join(__dirname, 'preload.js')),
			devTools: !app.isPackaged,
		},
	})

	win.loadFile(path.resolve(path.join(__dirname, 'app/index.html')))
}

app.whenReady().then(() => {
	createWindow()
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
