import { useEffect } from 'react'
import { createRoot } from 'react-dom'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router'
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
            <Routes>
              <Route
                path="/1"
                element={(
                  <Scene1
                    goTo={goTo}
                    color={color}
                  />
                )}
              />
              <Route
                path="/2"
                element={(
                  <Scene2
                    goTo={goTo}
                    color={color}
                  />
                )}
              />
              <Route
                path="/3"
                element={(
                  <Scene3
                    goTo={goTo}
                    color={color}
                  />
                )}
              />
              <Route
                path="/4"
                element={(
                  <Scene4
                    goTo={goTo}
                    color={color}
                  />
                )}
              />
              <Route
                path="/5"
                element={(
                  <Scene5
                    goTo={goTo}
                    color={color}
                  />
                )}
              />
              <Route
                path="/"
                element={(
                  <Navigate
                    replace
                    to="/1"
                  />
                )}
              />
              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
          )}
        </Curtain>
      </Router>
    </EmojiProvider>
  )
}
