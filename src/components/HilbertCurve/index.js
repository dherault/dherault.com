import { useEffect, useRef } from 'react'

import handleCanvas from './handleCanvas'

function HilberCurve({ degree, color }) {
  const canvasRef = useRef()

  useEffect(() => handleCanvas(canvasRef.current, degree, color), [degree, color])

  return (
    <canvas ref={canvasRef} />
  )
}

export default HilberCurve
