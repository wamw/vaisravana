import { BrowserWindow } from 'electron'
import fetch from 'node-fetch'
// import { Response } from 'node-fetch'

export interface GithubOAuthCredentials {
  scopes: string[]
  client_id: string
  client_secret: string
}

const authorizeUri = 'https://github.com/login/oauth/authorize'
const accessTokenUri = 'https://github.com/login/oauth/access_token'
let oauthWindow: Electron.BrowserWindow | null

function createOAuthWindow(): Electron.BrowserWindow {
  const config: Electron.BrowserWindowConstructorOptions = {
    width: 600,
    height: 400,
    show: false,
    webPreferences: {
      nodeIntegration: false
    }
  }
  return new BrowserWindow(config)
}

function extractCode(url: string): string {
  const rawCode: RegExpExecArray | null = /code=([^&]*)/.exec(url) || null
  const code: string = (rawCode && rawCode.length > 1) ? rawCode[1] : ''
  const error: RegExpExecArray | null = /\?error=(.+)$/.exec(url) || null

  // Close the browser if code found or error
  if ((code || error) && oauthWindow) {
    oauthWindow.destroy()
  }

  if (error) {
    throw new Error(error[1])
  }

  return code
}

export function getCode(credentials: GithubOAuthCredentials): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!oauthWindow || oauthWindow.isDestroyed) {
      oauthWindow = createOAuthWindow()
      oauthWindow.on('close', () => {
        oauthWindow = null
      })
      oauthWindow.webContents.on('did-get-redirect-request', (event: Electron.Event, oldUrl: string, newUrl: string): void => {
        const code = extractCode(newUrl)
        resolve(code)
      })
      oauthWindow.webContents.on('will-navigate', (event: Electron.Event, url: string): void => {
        const code = extractCode(url)
        resolve(code)
      })
    }
    const uri = `${authorizeUri}?client_id=${credentials.client_id}&scope=${credentials.scopes}`
    oauthWindow.loadURL(uri)
    oauthWindow.show()
  })
}

export async function getToken(credentials: GithubOAuthCredentials): Promise<string> {
  const code = await getCode(credentials)
  const uri = `${accessTokenUri}?code=${code}&client_id=${credentials.client_id}&client_secret=${credentials.client_secret}`
  const headers = { 'Accept': 'application/json' }
  const response = await fetch(uri, { headers })
  const json = await response.json()
  const accessToken: string = json.access_token

  return accessToken
}

// http://manos.im/blog/electron-oauth-with-github/
