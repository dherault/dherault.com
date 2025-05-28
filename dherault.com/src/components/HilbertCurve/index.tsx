import { useEffect, useRef } from 'react'

import type { CanvasProps } from '../../types'

import useCanvasWidth from '../../hooks/useCanvasWidth'

import handleCanvas from './handleCanvas'

type Props = CanvasProps & {
  degree: number
}

function HilberCurve({ degree, color }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const width = useCanvasWidth()

  useEffect(() => {
    if (!canvasRef.current) return

    return handleCanvas(canvasRef.current, degree, color)
  }, [degree, color, width])

  return (
    <canvas ref={canvasRef} />
  )
}

export default HilberCurve
