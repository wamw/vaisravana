import * as electron from 'electron'
import * as dotenv from 'dotenv'
import { getToken, GithubOAuthCredentials } from './auth/github'
// import * as GitHubApi from 'github'
import { sayHello } from '../shared/message'

dotenv.config()

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
  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  sayHello()
})

ipcMain.on('connect-to-github', (event: Electron.Event) => {
  const credentials: GithubOAuthCredentials = {
    scopes: ['user', 'public_repo', 'repo'],
    client_id: process.env.GITHUB_CLIENT_ID || '',
    client_secret: process.env.GITHUB_CLIENT_SECRET || ''
  }
  // const code: string = getCode(credentials)
  // console.log(code)
  // const token: string = getToken(credentials, code)
  // event.sender.send('github-connected', token)

  getToken(credentials).then((token: string) => {
    console.log(token)
  })

  // openOAuthWindow(credentials).then((code: string) => {
  //   return getToken(credentials, code)
  // }).then((response) => {
  //   console.log(response)
  //   event.sender.send('github-connected', 'aoieop')
  // })
})
