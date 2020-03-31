import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import './index.css'

const pathnameToColor = {
  '/1': '#2196f3',
  '/2': '#e30b5d',
  '/3': '#c6ff00',
  '/4': '#673ab7',
}

function Curtain({ children }) {
  const [opacity, setOpacity] = useState(1)
  const history = useHistory()
  const location = useLocation()
  const color = pathnameToColor[location.pathname]

  useEffect(() => {
    setTimeout(() => {
      setOpacity(0)
    }, 200)
  }, [])

  function goTo(pathname) {
    setOpacity(1)

    setTimeout(() => {
      history.push(pathname)

      setTimeout(() => {
        setOpacity(0)
      }, 666)
    }, 666)
  }

  return (
    <>
      <div
        className="Curtain"
        style={{
          opacity,
          backgroundColor: color,
          zIndex: opacity,
          transition: `opacity 0.666s ease-in-out, background-color 0.666s linear${opacity ? '' : ', z-index 1.333s linear'}`,
        }}
      />
      {children({ goTo, color })}
    </>
  )
}

export default Curtain
