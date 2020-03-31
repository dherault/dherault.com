import React, { useRef, useEffect } from 'react'

import handleCanvas from './handleCanvas'

function HilberCurve({ degree }) {
  const canvasRef = useRef()

  useEffect(() => handleCanvas(canvasRef.current, degree), [degree])

  return (
    <canvas ref={canvasRef} />
  )
}

export default HilberCurve
