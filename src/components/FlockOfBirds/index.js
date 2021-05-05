import { useEffect, useRef } from 'react'

import handleCanvas from './handleCanvas'

function FlockOfBirds({ color }) {
  const canvasRef = useRef()

  useEffect(() => handleCanvas(canvasRef.current, color), [color])

  return (
    <canvas ref={canvasRef} />
  )
}

export default FlockOfBirds
