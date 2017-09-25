import { store, Store } from './store'

declare global {
  interface Window {
    store: Store
  }
}

window.store = store
