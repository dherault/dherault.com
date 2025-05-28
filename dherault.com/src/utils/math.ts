import type { ABC, XY, XYZ } from '../types'

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomInteger(a: number, b: number): number {
  return Math.floor(randomFloat(a, b))
}

export function pickRandom<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)]
}

export function shuffle<T>(a: T[]): T[] {
  return a.sort(() => Math.random() < 0.5 ? -1 : 1)
}

export function distanceXY(p1: XY, p2: XY): number {
  return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y))
}

export function addXY(a: XY, b: XY) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  }
}

export function polarToCarthesian(theta: number, rho: number) {
  return {
    x: rho * Math.cos(theta),
    y: rho * Math.sin(theta),
  }
}

export function distanceSquaredXY(a: XY, b: XY) {
  return (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)
}

export function dotProductXY(v1: XY, v2: XY): number {
  return v1.x * v2.x + v1.y * v2.y
}

export function dotProductXYZ(a: XYZ, b: XYZ): number {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

export function normalizeXY(vector: XY): XY {
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

export function createCenterXYZ(a: XYZ, b: XYZ): XYZ {
  return {
    x: (b.x + a.x) / 2,
    y: (b.y + a.y) / 2,
    z: (b.z + a.z) / 2,
  }
}

export function createVectorXYZ(a: XYZ, b: XYZ): XYZ {
  return {
    x: b.x - a.x,
    y: b.y - a.y,
    z: b.z - a.z,
  }
}

export function addXYZ(u: XYZ, v: XYZ): XYZ {
  return {
    x: u.x + v.x,
    y: u.y + v.y,
    z: u.z + v.z,
  }
}

export function scaleXYZ({ x, y, z }: XYZ, factor: number): XYZ {
  return {
    x: x * factor,
    y: y * factor,
    z: z * factor,
  }
}

export function normXYZ({ x, y, z }: XYZ): number {
  return Math.sqrt(x * x + y * y + z * z)
}

export function normalizeXYZ(v: XYZ): XYZ {
  const n = normXYZ(v)

  return {
    x: v.x / n,
    y: v.y / n,
    z: v.z / n,
  }
}

export function crossProductXYZ(a: XYZ, b: XYZ): XYZ {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  }
}

export function projectPointOnAxis(p: XYZ, a: XYZ, b: XYZ): XYZ {
  const ab = createVectorXYZ(a, b)
  const lambda = dotProductXYZ(ab, createVectorXYZ(a, p)) / dotProductXYZ(ab, ab)

  return addXYZ(a, scaleXYZ(ab, lambda))
}

export function rotatePointAroundAxis(p: XYZ, a: XYZ, b: XYZ, angle: number): XYZ {
  const { x, y, z } = normalizeXYZ(createVectorXYZ(a, b))
  const translationVector = projectPointOnAxis(p, a, b)
  const pp = createVectorXYZ(translationVector, p)

  const c = Math.cos(angle)
  const s = Math.sin(angle)

  const R = [
    [c + x * x * (1 - c), x * y * (1 - c) - z * s, x * z * (1 - c) + y * s],
    [y * x * (1 - c) + z * s, c + y * y * (1 - c), y * z * (1 - c) - x * s],
    [z * x * (1 - c) - y * s, z * y * (1 - c) + x * s, c + z * z * (1 - c)],
  ]
  const X = [
    [pp.x],
    [pp.y],
    [pp.z],
  ]

  const Y = multiplyMatrices(R, X)

  return {
    x: Y[0][0] + translationVector.x,
    y: Y[1][0] + translationVector.y,
    z: Y[2][0] + translationVector.z,
  }
}

export function applyRotations({ x, y, z }: XYZ, { a, b, c }: ABC): XYZ {
  const ca = Math.cos(a)
  const sa = Math.sin(a)
  const cb = Math.cos(b)
  const sb = Math.sin(b)
  const cc = Math.cos(c)
  const sc = Math.sin(c)

  const rotateX = [
    [1, 0, 0],
    [0, ca, -sa],
    [0, sa, ca],
  ]
  const rotateY = [
    [cb, 0, -sb],
    [0, 1, 0],
    [sb, 0, cb],
  ]
  const rotateZ = [
    [cc, -sc, 0],
    [sc, cc, 0],
    [0, 0, 1],
  ]

  const X = [[x], [y], [z]]
  const Y = multiplyMatrices(rotateZ, multiplyMatrices(rotateY, multiplyMatrices(rotateX, X)))

  return {
    x: Y[0][0],
    y: Y[1][0],
    z: Y[2][0],
  }
}

export function barycenter(positions: XY[]): XY | null {
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

export function multiplyMatrices(a: number[][], b: number[][]): number[][] {
  const c: number[][] = []

  for (let i = 0; i < a.length; i++) {
    const row = []
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0
      for (let k = 0; k < b.length; k++) {
        sum += a[i][k] * b[k][j]
      }
      row.push(sum)
    }
    c.push(row)
  }

  return c
}
