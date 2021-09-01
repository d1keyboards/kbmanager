import { contextBridge } from 'electron'
import hid from './hid'

contextBridge.exposeInMainWorld('electron', { hid })
