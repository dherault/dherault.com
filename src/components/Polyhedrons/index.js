import { useEffect, useRef } from 'react'

import handleCanvas from './handleCanvas'

function Polyhedrons({ mode, color }) {
  const canvasRef = useRef()

  useEffect(() => handleCanvas(canvasRef.current, mode, color), [mode, color])

  return (
    <canvas ref={canvasRef} />
  )
}

export default Polyhedrons
