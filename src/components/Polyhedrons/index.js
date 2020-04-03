import React, { useRef, useEffect } from 'react'

import handleCanvas from './handleCanvas'

function Polyhedrons({ mode }) {
  const canvasRef = useRef()

  useEffect(() => handleCanvas(canvasRef.current, mode), [mode])

  return (
    <canvas ref={canvasRef} />
  )
}

export default Polyhedrons
