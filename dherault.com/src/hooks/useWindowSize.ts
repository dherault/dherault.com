import { useCallback, useEffect, useState } from 'react'

import useEventListener from './useEventListener'

interface WindowSize {
  width: number
  height: number
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useEffect(() => {
    handleSize()
  }, [handleSize])

  return windowSize
}

export default useWindowSize
