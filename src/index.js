import React, { useEffect, useState } from 'react'
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

function App() {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px'
  }, [])

  return (
    <Router>
      <Curtain>
        {({ goTo, color }) => (
          <div className={isHidden ? 'mobile-hidden' : 'mobile-visible'}>
            <div
              onClick={() => setIsHidden(!isHidden)}
              className="mobile-visibility"
              style={{ color }}
            >
              <strong>{isHidden ? 'Show' : 'Hide'} content</strong>
            </div>
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
          </div>
        )}
      </Curtain>
    </Router>
  )
}
