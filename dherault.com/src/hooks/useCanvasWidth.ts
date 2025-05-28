import useDebounce from './useDebounce'
import useWindowSize from './useWindowSize'

function useCanvasWidth() {
  const { width } = useWindowSize()

  return useDebounce(width, 50)
}

export default useCanvasWidth
