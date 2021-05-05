function getCanvasDpr(_) {
  const devicePixelRatio = window.devicePixelRatio || 1

  const canvasPixelRatio = (
    _.webkitBackingStorePixelRatio
    || _.mozBackingStorePixelRatio
    || _.msBackingStorePixelRatio
    || _.oBackingStorePixelRatio
    || _.backingStorePixelRatio
    || 1
  )

  return devicePixelRatio / canvasPixelRatio
}

export default getCanvasDpr
