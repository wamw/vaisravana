import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer as projectlist } from './containers/ProjectList/module'

export const configureStore = () => {
  const reducers = combineReducers({
    projectlist
  })
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(reducers, composeEnhancers(applyMiddleware()))

  return store
}
