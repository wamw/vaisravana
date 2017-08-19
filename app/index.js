const {app, BrowserWindow} = require('electron')

let win

const createWindow = function() {
  win = new BrowserWindow({
    width: 800,
    height: 500,
    title: 'vaisravana',
    show: true,
  })
  win.loadURL(`file://${__dirname}/dist/index.html`)

  // for debug
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (prosess.platform !== 'darwin') {
    app.quit()
  }
})

app.on('active', () => {
  if (win === null) {
    createWindow()
  }
})
