/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge } = require('electron')
const hid = require('./electron/hid')

contextBridge.exposeInMainWorld('electron', { hid })
