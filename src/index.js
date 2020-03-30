import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import 'flexpad/dist/flexpad.min.css'
import 'bootstrap-spacing-utils'
import './index.css'

import Scene1 from './scenes/Scene1'
import Scene2 from './scenes/Scene2'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)

function App() {
  const location = useLocation()

  return (
    <>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={300}
        >
          <Switch>
            <Route exact path="/1">
              <Scene1 />
            </Route>
            <Route exact path="/2">
              <Scene2 />
            </Route>
            <Redirect exact from="/" to ="/1" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
