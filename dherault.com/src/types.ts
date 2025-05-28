export type SceneProps = {
  goTo: (to: string) => void
  color: string
}

export type CanvasProps = {
  color: string
}

export type XY ={
  x: number
  y: number
}

export type XYZ = {
  x: number
  y: number
  z: number
}

export type ABC = {
  a: number
  b: number
  c: number
}

export type PolyhedronsMode =
  | 'dance'
  | 'hexahedron'
  | 'tetrahedron'
  | 'octahedron'
  | 'icosahedron'
  | 'dodecahedron'
