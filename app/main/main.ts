import * as electron from 'electron'
import { sayHello } from '../shared/message'
const { app, BrowserWindow } = electron

let mainWindow: Electron.BrowserWindow | null

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 720,
    height: 720
  })
  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)

  sayHello()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
