import { useEffect, useRef } from 'react'

import type { CanvasProps, PolyhedronsMode } from '../../types'

import useCanvasWidth from '../../hooks/useCanvasWidth'

import handleCanvas from './handleCanvas'

type Props = CanvasProps & {
  mode: PolyhedronsMode
}

function Polyhedrons({ mode, color }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const width = useCanvasWidth()

  useEffect(() => {
    if (!canvasRef.current) return

    return handleCanvas(canvasRef.current, mode, color)
  }, [mode, color, width])

  return (
    <canvas ref={canvasRef} />
  )
}

export default Polyhedrons
