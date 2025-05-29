import { useEffect, useRef } from 'react'

import type { CanvasProps } from '../../types'

import useCanvasWidth from '../../hooks/useCanvasWidth'

import handleCanvas from './handleCanvas'

function SierpinskiTriangle({ color }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const width = useCanvasWidth()

  useEffect(() => {
    if (!canvasRef.current) return

    canvasRef.current.focus()

    return handleCanvas(canvasRef.current, color)
  }, [color, width])

  return (
    <canvas
      ref={canvasRef}
      className="cursor-grab"
    />
  )
}

export default SierpinskiTriangle
