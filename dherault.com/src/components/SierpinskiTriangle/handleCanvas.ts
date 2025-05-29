import type { XY } from '../../types'
import { addXY, normXY, rotateXY, subtractXY } from '../../utils/math'

function handleCanvas(canvas: HTMLCanvasElement, mainColor: string) {
  const _ = canvas.getContext('2d')!

  const devicePixelRatio = window.devicePixelRatio || 1
  const backgroundColor = mainColor
  const strokeColor = 'white'

  canvas.width = window.innerWidth * devicePixelRatio
  canvas.height = window.innerHeight * devicePixelRatio

  const initialWidth = window.innerWidth
  const initialHeight = window.innerHeight

  _.scale(devicePixelRatio, devicePixelRatio)

  const displayRatio = initialHeight / initialWidth
  const center: XY = { x: initialWidth / 2, y: initialHeight / 1.666 }
  const scale = 666 * 1.333

  let width = initialWidth
  let height = initialHeight
  let xMouse = 0
  let yMouse = 0
  let xWindow = 0
  let yWindow = 0
  let isPanning = false
  let isDezooming = false
  const maxDistanceFactor = 12

  /* ---
    Draw
  --- */

  function draw() {
    _.fillStyle = backgroundColor
    _.strokeStyle = strokeColor
    _.fillRect(0, 0, initialWidth, initialHeight)

    function drawIteration(center: XY, index = 0) {
      const maxDistance = maxDistanceFactor * width / initialWidth

      if (!isDezooming && maxDistance < 1e-11) {
        dezoomToStart()

        return
      }

      const { nodes, sides, centers } = getTrianglePoints(center, 0.5 ** index)

      // Skip triangles that are completely outside the window
      if (
        nodes.every(n => n.x < xWindow)
        || nodes.every(n => n.x > xWindow + width)
        || nodes.every(n => n.y < yWindow)
        || nodes.every(n => n.y > yWindow + height)
      ) {
        return
      }

      if (normXY(subtractXY(nodes[0], nodes[1])) < maxDistance) {
        drawTriangle(nodes)
        drawTriangle(sides)

        return
      }

      centers.forEach(c => {
        drawIteration(c, index + 1)
      })
    }

    drawIteration(center)
  }

  function drawTriangle(nodes: XY[]) {
    _.strokeStyle = strokeColor
    _.beginPath()
    _.moveTo(scaleX(nodes[0].x), scaleY(nodes[0].y))
    _.lineTo(scaleX(nodes[1].x), scaleY(nodes[1].y))
    _.lineTo(scaleX(nodes[2].x), scaleY(nodes[2].y))
    _.closePath()
    _.stroke()
  }

  function getTrianglePoints(center: XY, sizeFactor: number,) {
    const length = Math.sqrt(0.75) / 2 * sizeFactor * scale

    const a: XY = { x: 0, y: -length }
    const b = rotateXY(a, 2 * Math.PI / 3)
    const c = rotateXY(a, -2 * Math.PI / 3)
    const sa = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
    const sb = { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 }
    const sc = { x: (c.x + a.x) / 2, y: (c.y + a.y) / 2 }
    const ca = { x: (a.x + sa.x + sc.x) / 3, y: (a.y + sa.y + sc.y) / 3 }
    const cb = { x: (b.x + sa.x + sb.x) / 3, y: (b.y + sa.y + sb.y) / 3 }
    const cc = { x: (c.x + sb.x + sc.x) / 3, y: (c.y + sb.y + sc.y) / 3 }

    return {
      nodes: [a, b, c].map(n => addXY(center, n)),
      sides: [sa, sb, sc].map(n => addXY(center, n)),
      centers: [ca, cb, cc].map(n => addXY(center, n)),
    }
  }

  function scaleX(x: number) {
    return (x - xWindow) * initialWidth / width
  }

  function scaleY(y: number) {
    return (y - yWindow) * initialHeight / height
  }

  function boundXWindow(x: number) {
    return Math.max(0, Math.min(initialWidth - width, x))
  }

  function boundYWindow(y: number) {
    return Math.max(0, Math.min(initialHeight - height, y))
  }

  function mouseMoveListener(event: MouseEvent) {
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

  function wheelListener(event: WheelEvent) {
    event.preventDefault()

    isDezooming = false

    zoom(1 + event.deltaY * 0.0006)
    draw()
  }

  function zoom(factor: number) {
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
}

export default handleCanvas
