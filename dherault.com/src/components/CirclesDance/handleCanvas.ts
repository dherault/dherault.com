import type { XY } from '../../types'
import {
  addXY,
  distanceSquaredXY,
  polarToCarthesian,
} from '../../utils/math'

type WaveCircle = {
  t: number
  r: number
  a: number
}

type WaveFunction = () => WaveCircle[]

type WaveDefinition = {
  color: string
  circles: WaveCircle[]
  points: XY[]
  resetFn: WaveFunction
}

function handleCanvas(canvas: HTMLCanvasElement, mainColor: string) {
  const TAU = 2 * Math.PI

  const _ = canvas.getContext('2d')!

  const dpr = window.devicePixelRatio || 1

  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr

  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`

  const width = window.innerWidth
  const height = window.innerHeight

  _.scale(dpr, dpr)

  const backgroundColor = mainColor
  const strokeColor = '#9c27b0'
  const isMobile = width <= 600
  const scaleFactor = isMobile ? 0.75 : 1

  /* ---
    Data
  --- */

  const data = [
    createCirclesStructure(squareWave, strokeColor),
    createCirclesStructure(triangleWave, strokeColor),
    createCirclesStructure(sawtoothWave, strokeColor),
  ]

  function createCirclesStructure(fn: WaveFunction, color: string): WaveDefinition {
    return {
      color,
      circles: fn(),
      points: [],
      resetFn: fn,
    }
  }

  function squareWave() {
    const circles: WaveCircle[] = []
    const startingRho = 64

    for (let i = 1; i < 32 + 1; i += 2) {
      circles.push({
        t: Math.PI,
        r: startingRho / i * scaleFactor,
        a: i * Math.PI,
      })
    }

    return circles
  }

  function triangleWave() {
    const circles: WaveCircle[] = []
    const startingRho = 64

    for (let i = 0; i < 16; i++) {
      const n = 2 * i + 1

      circles.push({
        t: Math.PI / 2,
        r: startingRho / (n * n) * scaleFactor,
        a: i % 2 ? n * Math.PI : -n * Math.PI,
      })
    }

    return circles
  }

  function sawtoothWave() {
    const circles: WaveCircle[] = []
    const startingRho = 64

    for (let i = 1; i < 32; i += 1) {
      circles.push({
        t: 0,
        r: startingRho / i * scaleFactor,
        a: i * Math.PI,
      })
    }

    return circles
  }

  /* ---
    Update
  --- */

  function update() {
    data.forEach(({ circles, points }) => {
      circles.forEach(c => {
        c.t += c.a / 100
      })

      points.forEach((p, i) => {
        p.x += 0.5

        if (p.x > width + 1) {
          points.splice(i, 1)
        }
      })
    })
  }

  /* ---
    Draw
  --- */

  function draw() {
    _.fillStyle = backgroundColor
    _.fillRect(0, 0, width, height)

    data.forEach(({ circles, points, color }, k) => {
      _.strokeStyle = color

      const initialHeight = (k + 1) * height / (data.length + 1)
      let previousCoordinates = {
        x: (isMobile ? 1.5 : 2) * width / 5,
        y: initialHeight,
      }

      circles.forEach(({ t, r }) => {
        const nextCoordinates = addXY(previousCoordinates, polarToCarthesian(t, r))

        drawCircleWithLine(previousCoordinates.x, previousCoordinates.y, r, nextCoordinates, color)

        previousCoordinates = nextCoordinates
      })

      const point = { x: 3 * width / 5, y: previousCoordinates.y }

      _.moveTo(previousCoordinates.x, previousCoordinates.y)
      _.lineTo(point.x, point.y)
      _.stroke()

      points.push(point)

      points.forEach((p, i) => {
        if (i + 1 < points.length && distanceSquaredXY(p, points[i + 1]) > 1) {
          _.moveTo(p.x, p.y)
          _.lineTo(points[i + 1].x, points[i + 1].y)
          _.stroke()
        }
        else {
          drawPoint(p.x, p.y, color)
        }
      })
    })
  }

  function drawCircleWithLine(x: number, y: number, r: number, p: XY, color = 'black') {
    _.strokeStyle = color
    _.beginPath()
    _.arc(x, y, r, 0, TAU)
    _.closePath()
    _.stroke()
    _.moveTo(x, y)
    _.lineTo(p.x, p.y)
    _.stroke()
  }

  function drawPoint(x: number, y: number, color = 'black') {
    _.fillStyle = color
    _.beginPath()
    _.arc(x, y, 0.5, 0, TAU)
    _.closePath()
    _.fill()
  }

  /* ---
    Loop
  --- */

  let stopped = false

  function tick() {
    update()
    draw()

    if (stopped) return

    window.requestAnimationFrame(tick)
  }

  window.requestAnimationFrame(tick)

  return () => {
    stopped = true
  }
}

export default handleCanvas
