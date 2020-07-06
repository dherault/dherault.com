import React, { useRef, useEffect } from 'react'

import handleCanvas from './handleCanvas'

function CirclesDance({ color }) {
  const canvasRef = useRef()

  useEffect(() => handleCanvas(canvasRef.current, color), [color])

  return (
    <canvas ref={canvasRef} />
  )
}

export default CirclesDance
