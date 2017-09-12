import * as React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { ProjectList } from './containers/project-list/container'
import { configureStore } from './store'

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={ProjectList}/>
        </Router>
      </Provider>
    )
  }
}
