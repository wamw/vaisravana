import * as React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import { ProjectList } from './containers/ProjectList/Container'

const store = configureStore()

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ProjectList />
          <p>aiueo</p>
          <p>aiueo</p>
          <p>aiue2o</p>
          <p>aiu2easdfo</p>
          <p>aiueo</p>
          <p><input type="text" /></p>
        </div>
      </Provider>
    )
  }
}
