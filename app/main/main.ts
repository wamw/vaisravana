import * as electron from 'electron'
import * as dotenv from 'dotenv'
import { getToken, GithubOAuthCredentials } from './auth/github'
// import * as GitHubApi from 'github'
import { sayHello } from '../shared/message'

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

const { app, BrowserWindow, ipcMain } = electron
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

  if (isProduction) {
    mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)
  } else {
    const webpackConfig = require('../../webpack.config')
    const root = webpackConfig.output.publicPath
    mainWindow.loadURL(root)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  sayHello()
})

ipcMain.on('connect-to-github', async (event: Electron.Event) => {
  const credentials: GithubOAuthCredentials = {
    scopes: ['user', 'public_repo', 'repo'],
    client_id: process.env.GITHUB_CLIENT_ID || '',
    client_secret: process.env.GITHUB_CLIENT_SECRET || ''
  }

  const token: string = await getToken(credentials)
  event.sender.send('github-connected', token)
})
