import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import 'flexpad/dist/flexpad.min.css'
import 'bootstrap-spacing-utils'
import './index.css'

import Curtain from './components/Curtain'

import Scene1 from './scenes/Scene1'
import Scene2 from './scenes/Scene2'
import Scene3 from './scenes/Scene3'
import Scene4 from './scenes/Scene4'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Router>
    <Curtain>
      {({ goTo }) => (
        <Switch>
          <Route exact path="/1">
            <Scene1 goTo={goTo} />
          </Route>
          <Route exact path="/2">
            <Scene2 goTo={goTo} />
          </Route>
          <Route exact path="/3">
            <Scene3 goTo={goTo} />
          </Route>
          <Route exact path="/4">
            <Scene4 goTo={goTo} />
          </Route>
          <Redirect exact from="/" to ="/1" />
        </Switch>
      )}
    </Curtain>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
