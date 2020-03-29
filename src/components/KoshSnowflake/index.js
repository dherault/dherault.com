import React, { useRef, useEffect, useState } from 'react'

import handleCanvas from './handleCanvas'

function FlockOfBirds() {
  const canvasRef = useRef()
  const [zoomIndicatorOffsetY, setZoomIndicatorOffsetY] = useState(100)

  useEffect(() => {
    setZoomIndicatorOffsetY(handleCanvas(canvasRef.current))
  }, [])

  return (
    <div className="relative">
      <canvas ref={canvasRef} />
      <div
        style={{
          position: 'absolute',
          top: zoomIndicatorOffsetY,
          left: `calc(50% - 24px)`,
          backgroundColor: '#2196F340',
          width: 48,
          height: 48,
          borderRadius: '50%',
        }}
      />
    </div>
  )
}

export default FlockOfBirds
