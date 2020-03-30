import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const pathnameToColor = {
  '/1': '#2196f3',
  '/2': '#e30b5d',
  '/3': '#ffeb3b',
}

function Curtain({ children }) {
  const [opacity, setOpacity] = useState(1)
  const history = useHistory()
  const location = useLocation()
  const backgroundColor = pathnameToColor[location.pathname]

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

  console.log('opacity', opacity)

  return (
    <>
      <div className="curtain" style={{
        opacity,
        backgroundColor,
        zIndex: opacity,
        transition: `opacity 0.666s ease-in-out, background-color 0.666s linear${opacity ? '' : ', z-index 1.333s linear'}`,
      }} />
      {children({ goTo })}
    </>
  )
}

export default Curtain
