import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { EmojiProvider } from 'react-apple-emojis'

import 'flexpad/dist/flexpad.min.css'
import 'mpxx/mpxx.min.css'
import './index.css'

import Curtain from './components/Curtain'

import Scene1 from './scenes/Scene1'
import Scene2 from './scenes/Scene2'
import Scene3 from './scenes/Scene3'
import Scene4 from './scenes/Scene4'
import Scene5 from './scenes/Scene5'
import NotFound from './scenes/NotFound'

createRoot(document.getElementById('root')).render(
  <App />
)

function App() {
  const [isHidden, setIsHidden] = useState(false)

  // HACK to fix the height on mobile resolutions
  useEffect(() => {
    document.getElementsByTagName('body')[0].style.height = `${window.innerHeight}px`
  }, [])

  return (
    <EmojiProvider
      data={{
        'backhand-index-pointing-right': 'https://em-content.zobj.net/thumbs/240/apple/354/backhand-index-pointing-right_1f449.png',
      }}
    >
      <Router>
        <Curtain>
          {({ goTo, color }) => (
            <div className={isHidden ? 'mobile-hidden' : 'mobile-visible'}>
              <div
                onClick={() => setIsHidden(!isHidden)}
                className="mobile-visibility"
                style={{ color }}
              >
                <strong>
                  {isHidden ? 'Show' : 'Hide'}
                  {' '}
                  content
                </strong>
              </div>
              <Switch>
                <Route
                  exact
                  path="/1"
                >
                  <Scene1
                    goTo={goTo}
                    color={color}
                  />
                </Route>
                <Route
                  exact
                  path="/2"
                >
                  <Scene2
                    goTo={goTo}
                    color={color}
                  />
                </Route>
                <Route
                  exact
                  path="/3"
                >
                  <Scene3
                    goTo={goTo}
                    color={color}
                  />
                </Route>
                <Route
                  exact
                  path="/4"
                >
                  <Scene4
                    goTo={goTo}
                    color={color}
                  />
                </Route>
                <Route
                  exact
                  path="/5"
                >
                  <Scene5
                    goTo={goTo}
                    color={color}
                  />
                </Route>
                <Redirect
                  exact
                  from="/"
                  to="/1"
                />
                <NotFound />
              </Switch>
            </div>
          )}
        </Curtain>
      </Router>
    </EmojiProvider>
  )
}
