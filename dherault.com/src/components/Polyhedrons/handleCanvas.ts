import type { PolyhedronsMode, XYZ } from '../../types'
import {
  addXYZ,
  applyRotations,
  createCenterXYZ,
  createVectorXYZ,
  crossProductXYZ,
  normXYZ,
  pickRandom,
  randomFloat,
  randomInteger,
  rotatePointAroundAxis,
  scaleXYZ,
  shuffle,
} from '../../utils/math'

type PolyhedronPatron = {
  center: XYZ
  nodes: XYZ[]
}

type Polyhedron = {
  faces: PolyhedronPatron[]
  scaleFactor: number
  a: number
  b: number
  c: number
  da: number
  db: number
  dc: number
  x: number
  y: number
  dx: number
  dy: number
}

function handleCanvas(canvas: HTMLCanvasElement, mode: PolyhedronsMode, mainColor: string) {
  const _ = canvas.getContext('2d')!

  const TAU = 2 * Math.PI

  const dpr = window.devicePixelRatio || 1

  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr

  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`

  const width = window.innerWidth
  const height = window.innerHeight

  _.scale(dpr, dpr)

  const isMobile = width <= 600

  const nPolyhedron = Math.round((isMobile ? 52 : 24) * width / 1920)

  const backgroundColor = mainColor
  const verticeColor = 'white'
  const faceColor = mainColor

  const oOrigin: XYZ = { x: 0, y: 0, z: 0 }
  const forward: XYZ = { x: 0, y: 0, z: 1 }
  const danceSpeeds = [-1.5, -1, -0.5, 0.5, 1, 1.5]

  const nameToScale: Record<PolyhedronsMode, [number, number]> = {
    hexahedron: [48, 64],
    tetrahedron: [48, 64],
    octahedron: [48, 64],
    icosahedron: [32, 48],
    dodecahedron: [12, 32],
    dance: [1, 1],
  }

  const nameToMobileScaleFactor: Record<PolyhedronsMode, number> = {
    hexahedron: 0.8,
    tetrahedron: 1,
    octahedron: 1,
    icosahedron: 0.7,
    dodecahedron: 0.5,
    dance: 1,
  }

  const patrons: Record<PolyhedronsMode, PolyhedronPatron[]> = {
    hexahedron: createPolyhedron(4, Math.PI / 2),
    tetrahedron: createPolyhedron(3, Math.acos(1 / 3)),
    octahedron: createPolyhedron(3, Math.acos(-1 / 3)),
    icosahedron: createPolyhedron(3, Math.acos(-Math.sqrt(5) / 3)),
    dodecahedron: createPolyhedron(5, 2 * Math.atan((1 + Math.sqrt(5)) / 2)),
    dance: [],
  }

  const polyhedronNames = Object.keys(patrons) as PolyhedronsMode[]

  const polyhedrons: Polyhedron[] = []

  let polyhedron = {} as Polyhedron

  if (mode !== 'dance') {
    polyhedron = createPolyhedronInstance(patrons[mode], nameToScale[mode], mode)
  }

  for (let i = 0; i < nPolyhedron; i++) {
    const polyhedronName = pickRandom(polyhedronNames)

    polyhedrons.push(createPolyhedronInstance(patrons[polyhedronName], nameToScale[polyhedronName]))
  }

  /* ---
    Draw
  --- */

  const modeToDraw = polyhedronNames.reduce((acc, name) => {
    acc[name] = name === 'dance' ? drawDance : drawPolyhedron

    return acc
  }, {} as Record<PolyhedronsMode, () => void>)

  function drawDance() {
    _.fillStyle = backgroundColor
    _.fillRect(0, 0, width, height)

    polyhedrons.forEach(polyhedron => {
      _.strokeStyle = verticeColor
      _.fillStyle = faceColor

      polyhedron.faces
      .map(({ nodes, center }) => ({ nodes, center: applyRotations(center, polyhedron) }))
      .sort((a, b) => a.center.z < b.center.z ? -1 : 1)
      .map(({ nodes }) => nodes.map(node => applyRotations(node, polyhedron)))
      .forEach(nodes => {
        _.beginPath()
        _.moveTo(nodes[0].x + polyhedron.x, nodes[0].y + polyhedron.y)

        for (let i = 1; i < nodes.length; i++) {
          _.lineTo(nodes[i].x + polyhedron.x, nodes[i].y + polyhedron.y)
        }

        _.closePath()
        _.stroke()
        _.fill()
      })
    })
  }

  function drawPolyhedron() {
    _.fillStyle = backgroundColor
    _.fillRect(0, 0, width, height)

    _.strokeStyle = verticeColor
    _.fillStyle = faceColor

    polyhedron.faces
    .map(({ nodes, center }) => ({ nodes, center: applyRotations(center, polyhedron) }))
    .sort((a, b) => a.center.z < b.center.z ? -1 : 1)
    .map(({ nodes }) => nodes.map(node => applyRotations(node, polyhedron)))
    .forEach(nodes => {
      _.beginPath()
      _.moveTo(nodes[0].x + polyhedron.x, nodes[0].y + polyhedron.y)

      for (let i = 1; i < nodes.length; i++) {
        _.lineTo(nodes[i].x + polyhedron.x, nodes[i].y + polyhedron.y)
      }

      _.closePath()
      _.stroke()
      _.fill()
    })
  }

  /* ---
    Update
  --- */

  function update() {
    if (mode === 'dance') {
      const newPolyhedrons: Polyhedron[] = []

      polyhedrons.forEach((polyhedron, i) => {
        polyhedron.a += polyhedron.da
        polyhedron.b += polyhedron.db
        polyhedron.c += polyhedron.dc
        polyhedron.x += polyhedron.dx
        polyhedron.y += polyhedron.dy

        if (
          polyhedron.x > width + polyhedron.scaleFactor ||
          polyhedron.x < -polyhedron.scaleFactor ||
          polyhedron.y > height + polyhedron.scaleFactor ||
          polyhedron.y < -polyhedron.scaleFactor
        ) {
          polyhedrons.splice(i, 1)

          const polyhedronName = pickRandom(polyhedronNames)
          const nextPolyhedron = createPolyhedronInstance(patrons[polyhedronName], nameToScale[polyhedronName])

          if (Math.random() < 0.5) {
            nextPolyhedron.x = nextPolyhedron.dx < 0 ? width + nextPolyhedron.scaleFactor : -nextPolyhedron.scaleFactor
          }
          else {
            nextPolyhedron.y = nextPolyhedron.dy < 0 ? height + nextPolyhedron.scaleFactor : -nextPolyhedron.scaleFactor
          }

          newPolyhedrons.push(nextPolyhedron)
        }
      })

      polyhedrons.push(...newPolyhedrons)

      return
    }

    polyhedron.a += polyhedron.da
    polyhedron.b += polyhedron.db
    polyhedron.c += polyhedron.dc
  }

  /* ---
    Polyhedron creation
  --- */

  // Hard work and dedication pay off
  function createPolyhedron(nSides: number, dihedralAngle: number): PolyhedronPatron[] {
    const faces = [createPolygonNodes(nSides, oOrigin, forward)]
    const centers = [oOrigin]

    const queue = [
      {
        center: oOrigin,
        nodes: faces[0],
      },
    ]

    while (true) {
      if (!queue.length) break

      const { center, nodes } = queue.shift()!

      for (let i = 0; i < nSides; i++) {
        const a = nodes[i]
        const b = nodes[i === nSides - 1 ? 0 : i + 1]

        const pivot = createCenterXYZ(a, b)
        const p = createVectorXYZ(center, pivot)
        const nextCenter = addXYZ(pivot, p)
        const rotatedCenter = rotatePointAroundAxis(nextCenter, a, b, Math.PI - dihedralAngle)

        if (centers.every(o => normXYZ(createVectorXYZ(o, rotatedCenter)) > 0.01)) {
          const normalVector = crossProductXYZ(p, createVectorXYZ(a, b))
          const polygonNodes = createPolygonNodes(nSides, nextCenter, normalVector, a)
          .map(node => rotatePointAroundAxis(node, a, b, Math.PI - dihedralAngle))

          faces.push(polygonNodes)
          centers.push(rotatedCenter)

          queue.push({
            center: rotatedCenter,
            nodes: polygonNodes,
          })
        }
      }
    }

    const centersVector = centers.reduce((accumulator, node) => addXYZ(accumulator, node), { x: 0, y: 0, z: 0 })
    const polyhedronCenterTranslation = scaleXYZ(centersVector, -1 / centers.length)

    return faces.map((nodes, i) => ({
      center: centers[i],
      nodes: nodes.map(node => addXYZ(node, polyhedronCenterTranslation)),
    }))
  }

  function createPolygonNodes(nSides: number, origin: XYZ, normalVector: XYZ, firstNode?: XYZ) {
    const angle = TAU / nSides
    const distanceFromCenter = Math.sqrt(1 / 2 / (1 - Math.cos(angle)))
    const nodes = [firstNode || { x: distanceFromCenter + origin.x, y: origin.y, z: origin.z }]

    for (let i = 1; i < nSides; i++) {
      nodes.push(
        rotatePointAroundAxis(
          nodes[i - 1],
          origin,
          addXYZ(origin, normalVector),
          angle
        )
      )
    }

    return nodes
  }

  function createPolyhedronInstance(patron: PolyhedronPatron[], scaleArray: [number, number], modeName?: PolyhedronsMode): Polyhedron {
    const scaleFactor = modeName ? 200 * (isMobile ? nameToMobileScaleFactor[modeName] : 1) : randomFloat(...scaleArray)
    const params = modeName ? [0, 0, 0] : shuffle([0, randomFloat(0, TAU), randomFloat(0, TAU)])
    const dParams = modeName ? [Math.PI / 512, Math.PI / 512, 0] : shuffle([0, randomFloat(0, Math.PI / 128), randomFloat(0, Math.PI / 128)])

    return {
      faces: patron.map(({ center, nodes }) => ({
        center,
        nodes: nodes.map(node => scaleXYZ(node, scaleFactor)),
      })),
      scaleFactor,
      a: params[0],
      b: params[1],
      c: params[2],
      da: dParams[0],
      db: dParams[1],
      dc: dParams[2],
      x: modeName ? width / 2 : randomInteger(0, width),
      y: modeName ? height / 2 : randomInteger(0, height),
      dx: modeName ? 0 : pickRandom(danceSpeeds),
      dy: modeName ? 0 : pickRandom(danceSpeeds),
    }
  }

  /* ---
    Visualization loop
  --- */

  let stopped = false

  function step() {
    update()
    modeToDraw[mode]?.()

    if (stopped) return

    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)

  return () => {
    stopped = true
  }
}

export default handleCanvas
