export function hasGithubToken(): boolean {
  return !!localStorage.getItem('github_oauth_token')
}

export function setGithubToken(token: string): void {
  localStorage.setItem('github_oauth_token', token)
}

export function getGithubToken(): string {
  const token = localStorage.getItem('github_oauth_token')
  if (token) {
    return token
  }
  return ''
}

export interface Store {
  hasGithubToken: () => boolean,
  setGithubToken: (token: string) => void,
  getGithubToken: () => void
}

export const store: Store = {
  hasGithubToken,
  setGithubToken,
  getGithubToken
}
