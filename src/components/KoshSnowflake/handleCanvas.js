import getCanvasDpr from '../../utils/getCanvasDpr'

function handleCanvas(canvas, mainColor) {
  const _ = canvas.getContext('2d')

  const backgroundColor = mainColor
  const strokeColor = 'white'

  const dpr = getCanvasDpr(_)

  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr

  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`

  const initialWidth = window.innerWidth
  const initialHeight = window.innerHeight

  let width = window.innerWidth
  let height = window.innerHeight

  _.scale(dpr, dpr)

  const displayRatio = height / width

  let xMouse = 0
  let yMouse = 0
  let xWindow = 0
  let yWindow = 0
  let isPanning = false
  let isDezooming = false

  const piByThree = Math.PI / 3
  const xStart = initialWidth / 3
  const length = Math.min(initialWidth / 3, initialHeight * 0.75)
  const sideLength = length / (2 * (1 + Math.cos(piByThree)))
  const heightLength = length * Math.cos(piByThree) + sideLength * Math.sin(piByThree) / 3
  const yStart = (initialHeight - heightLength) / 2

  function scaleX(x) {
    return (x - xWindow) * initialWidth / width
  }

  function scaleY(y) {
    return (y - yWindow) * initialHeight / height
  }

  function triangle(_, n, x, y, l, a = 0) {
    if (!isDezooming && l < 1e-11) {
      dezoomToStart()

      return
    }

    const s = l / (2 * (1 + Math.cos(piByThree)))

    const x1 = x + s * Math.cos(a)
    const y1 = y + s * Math.sin(a)
    const x2 = x1 + s * Math.cos(a - piByThree)
    const y2 = y1 + s * Math.sin(a - piByThree)
    const x3 = x2 + s * Math.cos(a + piByThree)
    const y3 = y2 + s * Math.sin(a + piByThree)
    const x4 = x + l * Math.cos(a)
    const y4 = y + l * Math.sin(a)

    if (
      Math.min(x, x2, x4) > xWindow + width
      || Math.max(x, x2, x4) < xWindow
      || Math.min(y, y2, y4) > yWindow + height
      || Math.max(y, y2, y4) < yWindow
    ) {
      return
    }

    if (n !== 0) {
      triangle(_, n - 1, x, y, s, a)
      triangle(_, n - 1, x1, y1, s, a - piByThree)
      triangle(_, n - 1, x2, y2, s, a + piByThree)
      triangle(_, n - 1, x3, y3, s, a)

      return
    }

    _.moveTo(scaleX(x), scaleY(y))
    _.lineTo(scaleX(x1), scaleY(y1))
    _.lineTo(scaleX(x2), scaleY(y2))
    _.lineTo(scaleX(x3), scaleY(y3))
    _.lineTo(scaleX(x4), scaleY(y4))
  }

  function draw() {
    const depth = Math.round(4 + 0.9 * Math.log(initialWidth / width))

    _.fillStyle = backgroundColor
    _.strokeStyle = strokeColor
    _.fillRect(0, 0, initialWidth, initialHeight)
    _.beginPath()
    _.moveTo(xStart, yStart)
    triangle(_, depth, xStart, yStart, length)
    triangle(_, depth, xStart + length / 2, yStart + length * Math.sin(piByThree), length, -2 * piByThree)
    triangle(_, depth, xStart + length, yStart, length, -4 * piByThree)
    _.closePath()
    _.stroke()
  }

  function boundXWindow(x) {
    return Math.max(0, Math.min(initialWidth - width, x))
  }

  function boundYWindow(y) {
    return Math.max(0, Math.min(initialHeight - height, y))
  }

  function mouseMoveListener(event) {
    xMouse = event.clientX * width / initialWidth + xWindow
    yMouse = event.clientY * height / initialHeight + yWindow

    if (isPanning) {
      xWindow = boundXWindow(xWindow - event.movementX * width / initialWidth)
      yWindow = boundYWindow(yWindow - event.movementY * height / initialHeight)
    }

    draw()
  }

  function mouseDownListener() {
    isPanning = true
  }

  function mouseUpListener() {
    isPanning = false
  }

  function wheelListener(event) {
    event.preventDefault()

    isDezooming = false

    zoom(1 + event.deltaY * 0.0006)
    draw()
  }

  function zoom(factor) {
    width = Math.max(0, Math.min(initialWidth, width * factor))
    height = width * displayRatio
    xWindow = boundXWindow(xMouse - (xMouse - xWindow) * factor)
    yWindow = boundYWindow(yMouse - (yMouse - yWindow) * factor)
  }

  function dezoomToStart() {
    if (isDezooming || width === initialWidth) return

    isDezooming = true
    removeEventListeners()

    const intervalId = setInterval(() => {
      zoom(1.01)
      draw()

      if (width === initialWidth) {
        clearInterval(intervalId)
        addEventListeners()
      }
    }, 6)
  }

  function addEventListeners() {
    document.addEventListener('mousemove', mouseMoveListener, { passive: false })
    document.addEventListener('mousedown', mouseDownListener, { passive: false })
    document.addEventListener('mouseup', mouseUpListener, { passive: false })
    document.addEventListener('wheel', wheelListener, { passive: false })
  }

  function removeEventListeners() {
    document.removeEventListener('mousemove', mouseMoveListener)
    document.removeEventListener('mousedown', mouseDownListener)
    document.removeEventListener('mouseup', mouseUpListener)
    document.removeEventListener('wheel', wheelListener)
  }

  addEventListeners()
  draw()

  return removeEventListeners

  /*
    To prevent underflow:
    - Save the zoom state at each zoom iteration and dezoom as a time reversal of this state. The user has no control on the dezooming. Depends on memory.
    - Zoom toward a specific point or a path continously. Depends on memory.
    - Zoom only forward. Independant of memory.
  */
}

export default handleCanvas
