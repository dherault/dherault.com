import React, { useRef, useEffect } from 'react'

import './index.css'

import handleCanvas from './handleCanvas'

function FlockOfBirds() {
  const canvasRef = useRef()

  useEffect(() => {
    handleCanvas(canvasRef.current)
  }, [])

  return (
    <div className="FlockOfBirds">
      <canvas ref={canvasRef} />
      <header>
        <h1>
          David Hérault
        </h1>
        <div>
          JavaScript developper
        </div>
        <div>
          dherault@gmail.com
        </div>
        <div>
          +33 666 000 577
        </div>
      </header>
    </div>
  )
}

export default FlockOfBirds
