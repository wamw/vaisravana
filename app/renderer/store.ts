import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux'
import { routerReducer } fro 'react-router-redux'


export const configureStore = (): Store<any> => {
  const reducers = combineReducers({
    todos: (state = 0, action) => {
      return state
    },
    routing: routerReducer
  })
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(reducers, composeEnhancers(applyMiddleware()))

  return store
}
