import { type HTMLAttributes, useEffect, useState } from 'react'

import './index.css'

function AppearingText({ color = 'black', children, ...props }: HTMLAttributes<HTMLElement>) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 1)
  }, [])

  return (
    <div
      style={{ color, position: 'relative' }}
      {...props}
    >
      {children}
      <div
        className="AppearingText-background"
        style={{
          backgroundColor: color,
          width: isLoaded ? 0 : '100%',
          visibility: isLoaded ? 'hidden' : 'visible',
        }}
      />
    </div>
  )
}

export default AppearingText
