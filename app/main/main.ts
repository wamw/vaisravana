import * as electron from 'electron'
import { app, BrowserWindow } from 'electron'

let mainWindow: Electron.BrowserWindow

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

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
