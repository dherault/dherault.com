import getCanvasDpr from '../../utils/getCanvasDpr'

function handleCanvas(canvas, degree = 4, mainColor) {
  const _ = canvas.getContext('2d')

  const dpr = getCanvasDpr(_)

  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr

  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`

  const width = window.innerWidth
  const height = window.innerHeight

  _.scale(dpr, dpr)

  const halfPi = Math.PI / 2
  const size = Math.min(width * 0.75, height * 0.75)

  const backgroundColor = mainColor
  const strokeColor = 'white'

  _.fillStyle = backgroundColor
  _.strokeStyle = strokeColor

  function draw() {
    _.fillRect(0, 0, width, height)
    _.beginPath()
    createHilbertCurve(degree)(width / 2, height / 2, size)
    _.stroke()
  }

  function createHilbertCurve(maxDepth = 1) {

    function createCurveHyperParameters(size, rotation, invert) {
      const s = size / 2
      const z = s / 2
      // Inspiration is a beauty
      const rotationXorInvert = rotation && !invert || !rotation && invert

      const hyperParameters = [
        [-z, z, s, halfPi, rotationXorInvert],
        [-z, -z, s, 0, rotationXorInvert],
        [z, -z, s, 0, rotationXorInvert],
        [z, z, s, -halfPi, rotationXorInvert],
      ]

      return rotationXorInvert ? hyperParameters.reverse() : hyperParameters
    }

    function drawCurve(x, y, size, rotation = 0, invert = false) {
      _.save()
      _.translate(x, y)
      _.rotate(rotation)

      createCurveHyperParameters(size, rotation, invert).forEach(hyperParameter => {
        _.lineTo(...hyperParameter)
      })

      _.restore()
    }

    function drawPart(x, y, size, rotation = 0, invert = false, depth = 1) {
      _.save()
      _.translate(x, y)
      _.rotate(rotation)

      const fn = depth === maxDepth ? drawCurve : drawPart
      const lastArg = depth === maxDepth ? undefined : depth + 1

      createCurveHyperParameters(size, rotation, invert).forEach(hyperParameter => {
        fn(...hyperParameter, lastArg)
      })

      _.restore()
    }

    return drawPart
  }

  draw()
}

export default handleCanvas
