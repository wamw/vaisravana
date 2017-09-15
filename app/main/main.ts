import * as electron from 'electron'
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

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
