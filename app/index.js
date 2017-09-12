const {app, BrowserWindow} = require('electron')

const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer')

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

  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

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
