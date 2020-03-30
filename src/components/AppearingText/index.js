import React, { useEffect, useState } from 'react'

import './index.css'

function AppearingText({ color = 'black', children }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 0)
  }, [])

  return (
    <div
      className="AppearingText"
      style={{ color }}
    >
      {children}
      <div
        className="AppearingText-background"
        style={{
          backgroundColor: color,
          width: isLoaded ? 0 : '100%',
        }}
      />
    </div>
  )
}

export default AppearingText
