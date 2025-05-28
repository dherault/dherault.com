import type { XY } from '../../types'
import {
  barycenter,
  distanceXY,
  dotProductXY,
  normalizeXY,
  randomFloat,
} from '../../utils/math'

function handleCanvas(canvas: HTMLCanvasElement, mainColor: string) {
  const _ = canvas.getContext('2d')!

  const dpr = window.devicePixelRatio || 1

  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr

  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`

  const width = window.innerWidth
  const height = window.innerHeight

  _.scale(dpr, dpr)

  const nBirds = Math.round(100 * width / 1920)
  const birdWidth = 30
  const birdHeight = 40
  const birdRadius = birdHeight / 2
  const birdColor = 'white'
  const flockingDistance = 150
  const nearingDistance = birdHeight
  const backgroundColor = mainColor

  class Bird {
    id: number

    position: XY

    speed: XY

    constructor() {
      this.id = Math.random()
      this.position = {
        x: randomFloat(0, width),
        y: randomFloat(0, height),
      }
      this.speed = normalizeXY({
        x: randomFloat(-1, 1),
        y: randomFloat(-1, 1),
      })
    }

    draw(_: CanvasRenderingContext2D) {
      _.fillStyle = birdColor
      _.save()
      _.translate(this.position.x, this.position.y)
      _.rotate(Math.atan2(this.speed.y, this.speed.x) + Math.PI / 2)
      _.beginPath()
      _.moveTo(0, -birdHeight / 2)
      _.lineTo(birdWidth / 2, birdHeight / 2)
      _.lineTo(0, 0.3 * birdHeight)
      _.lineTo(-birdWidth / 2, birdHeight / 2)
      _.lineTo(0, -birdHeight / 2)
      _.closePath()
      _.fill()
      _.restore()
    }
  }

  const birds: Bird[] = []

  for (let i = 0; i < nBirds; i++) {
    birds.push(new Bird())
  }

  function draw() {
    _.fillStyle = backgroundColor
    _.fillRect(0, 0, width, height)

    birds.forEach(bird => bird.draw(_))
  }

  function update() {
    birds.forEach(bird => {
      const flockBirdsPositions: XY[] = [] // Birds to follow
      const nearBirdsPositions: XY[] = [] // Birds to get away from

      birds.forEach(b => {
        if (b.id === bird.id) return

        // Birds to follow must be in half a circle in front of the bird (d < flockingDistance, dotProduct1 > 0)
        // and go in the same direction as it (dotProduct2 > 0)
        const diffPosition = normalizeXY({
          x: b.position.x - bird.position.x,
          y: b.position.y - bird.position.y,
        })

        const dotProduct1 = dotProductXY(bird.speed, diffPosition)
        const dotProduct2 = dotProductXY(bird.speed, b.speed)
        const d = distanceXY(b.position, bird.position)

        if (d < flockingDistance && dotProduct1 > 0 && dotProduct2 > 0) flockBirdsPositions.push(b.position)
        if (d < nearingDistance) nearBirdsPositions.push(b.position)
      })

      const flockBirdsCenter = barycenter(flockBirdsPositions) || bird.position
      const nearBirdsCenter = barycenter(nearBirdsPositions) || bird.position

      const flockVector = normalizeXY({
        x: flockBirdsCenter.x - bird.position.x,
        y: flockBirdsCenter.y - bird.position.y,
      })

      const nearVector = normalizeXY({
        x: bird.position.x - nearBirdsCenter.x,
        y: bird.position.y - nearBirdsCenter.y,
      })

      bird.speed = normalizeXY({
        x: bird.speed.x + 0.05 * nearVector.x + 0.03 * flockVector.x,
        y: bird.speed.y + 0.05 * nearVector.y + 0.03 * flockVector.y,
      })

      bird.position = {
        x: bird.position.x + bird.speed.x,
        y: bird.position.y + bird.speed.y,
      }

      // Edges collisions
      if (bird.position.x < -birdRadius) bird.position.x = width + birdRadius
      if (bird.position.x > width + birdRadius) bird.position.x = -birdRadius
      if (bird.position.y < -birdRadius) bird.position.y = height + birdRadius
      if (bird.position.y > height + birdRadius) bird.position.y = -birdRadius
    })
  }

  let stopped = false

  function step() {
    update()
    draw()

    if (stopped) return

    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)

  return () => {
    stopped = true
  }
}

export default handleCanvas
