import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import 'flexpad/dist/flexpad.min.css'
import './index.css'

import Scene1 from './scenes/Scene1'
import Scene2 from './scenes/Scene2'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Router>
    <Redirect from="/" to ="/1" />
    <Switch>
      <Route exact path="/1">
        <Scene1 />
      </Route>
      <Route exact path="/2">
        <Scene2 />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
