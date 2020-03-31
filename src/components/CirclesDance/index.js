import React, { useRef, useEffect } from 'react'

import handleCanvas from './handleCanvas'

function CirclesDance() {
  const canvasRef = useRef()

  useEffect(() => handleCanvas(canvasRef.current), [])

  return (
    <canvas ref={canvasRef} />
  )
}

export default CirclesDance
