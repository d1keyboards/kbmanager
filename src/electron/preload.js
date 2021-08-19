/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge } = require('electron')
const hid = require('./host/hid')

contextBridge.exposeInMainWorld('electron', { hid })
