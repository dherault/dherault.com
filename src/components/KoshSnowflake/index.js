import React, { useRef, useEffect } from 'react'

import handleCanvas from './handleCanvas'

function FlockOfBirds() {
  const canvasRef = useRef()

  useEffect(() => {
    canvasRef.current.focus()

    return handleCanvas(canvasRef.current)
  }, [])

  return (
    <canvas ref={canvasRef} className="cursor-drag" />
  )
}

export default FlockOfBirds
