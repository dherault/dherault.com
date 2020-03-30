function handleCanvas(canvas) {
  const _ = canvas.getContext('2d')

  const width = canvas.width = window.innerWidth
  const height = canvas.height = window.innerHeight

  function randomRange(min, max) {
    return Math.random() * (max - min) + min
  }

  function distance(p1, p2) {
    return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y))
  }

  function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y
  }

  function barycenter(positions) {
    if (!positions.length) return null

    let x = 0
    let y = 0

    positions.forEach(p => {
      x += p.x
      y += p.y
    })

    return {
      x: x / positions.length,
      y: y / positions.length,
    }
  }

  function normalize(vector) {
    const norm = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

    if (norm === 0) {
      return {
        x: 0,
        y: 0,
      }
    }

    return {
      x: vector.x / norm,
      y: vector.y / norm,
    }
  }

  const nBirds = Math.round(100 * width / 1920)
  const birdWidth = 30
  const birdHeight = 40
  const birdRadius = birdHeight / 2
  const birdColor = 'white'
  const flockingDistance = 150
  const nearingDistance = birdHeight
  const backgroundColor = 'RoyalBlue'

  class Bird {
    constructor() {
      this.id = Math.random()
      this.position = {
        x: randomRange(0, width),
        y: randomRange(0, height),
      }
      this.speed = normalize({
        x: randomRange(-1, 1),
        y: randomRange(-1, 1),
      })
    }

    draw(_) {
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

  const birds = []

  for (let i = 0; i < nBirds; i++) {
    birds.push(new Bird())
  }

  function draw() {
    _.fillStyle = backgroundColor
    _.fillRect(0, 0, width, height)
    // _.clearRect(0, 0, width, height)

    birds.forEach(bird => bird.draw(_))
  }

  function update() {
    birds.forEach(bird => {
      const flockBirdsPositions = [] // Birds to follow
      const nearBirdsPositions = [] // Birds to get away from

      birds.forEach(b => {
        if (b.id === bird.id) return

        // Birds to follow must be in half a circle in front of the bird (d < flockingDistance, dotProduct1 > 0)
        // and go in the same direction as it (dotProduct2 > 0)
        const diffPosition = normalize({
          x: b.position.x - bird.position.x,
          y: b.position.y - bird.position.y,
        })

        const dotProduct1 = dotProduct(bird.speed, diffPosition)
        const dotProduct2 = dotProduct(bird.speed, b.speed)
        const d = distance(b.position, bird.position)

        if (d < flockingDistance && dotProduct1 > 0 && dotProduct2 > 0) flockBirdsPositions.push(b.position)
        if (d < nearingDistance) nearBirdsPositions.push(b.position)
      })

      const flockBirdsCenter = barycenter(flockBirdsPositions) || bird.position
      const nearBirdsCenter = barycenter(nearBirdsPositions) || bird.position

      const flockVector = normalize({
        x: flockBirdsCenter.x - bird.position.x,
        y: flockBirdsCenter.y - bird.position.y,
      })

      const nearVector = normalize({
        x: bird.position.x - nearBirdsCenter.x,
        y: bird.position.y - nearBirdsCenter.y,
      })

      bird.speed = normalize({
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

  function step() {
    update()
    draw()
    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export default handleCanvas
