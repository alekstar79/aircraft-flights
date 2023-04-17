/**
* @typedef BlockingOptions
* @property {Boolean} lockRotation
* @property {Boolean} hasBorders
* @property {Boolean} hasControls
* @property {Boolean} lockScalingX
* @property {Boolean} lockScalingY
* @property {Boolean} lockMovementY
* @property {Boolean} lockMovementX
*/

/**
* Text block font size
* @type {Number}
*/
export const FONT_SIZE = 32
/**
* Offset of the timeline relative to the left edge of the canvas
* @type {Number}
*/
export const OFFSET = 200
/**
* Convert seconds to milliseconds and vice versa
* @type {Number}
*/
export const SEC = 1000
/**
* Timescale reduction factor
* @type {Number}
*/
export const KX = 100
/**
* Step between flights visualization lines on canvas
* @type {Number}
*/
export const STEP = 40
/**
* A set of options for blocking objects on the canvas
* @type {BlockingOptions}
*/
export const lock = {
  lockMovementX: true,
  lockMovementY: true,
  lockRotation: true,
  lockScalingX: true,
  lockScalingY: true,
  hasControls: false,
  hasBorders: false
}

/**
* @param {Number} scale
* @return {String}
*/
export const displayScale = scale => `M: ${scale.toFixed(2)}`

/**
* Set background color of the canvas
* @param {fabric.Canvas} canvas
* @param {String} color
*/
export function setBackgroundColor(canvas, color = 'rgba(80,90,120,.1)')
{
  canvas.clear().setBackgroundColor(color, canvas.requestRenderAllBound)
}

/**
* Text block factory
* @param {string} txt
* @param {Object} options
* @param {fabric} fabric
* @return {fabric.Text}
*/
export function text(txt, options = {}, fabric)
{
  return new fabric.Text(txt, {
    hoverCursor: 'default',
    fontFamily: 'Roboto',
    fontSize: FONT_SIZE,
    originY: 'center',
    originX: 'left',
    fill: '#000000',
    scaleX: 1,
    scaleY: 1,
    ...options,
    ...lock
  })
}

/**
* Rectangle block factory
* @param {Object} options
* @param {fabric} fabric
* @return {fabric.Rect}
*/
export function rect(options = {}, fabric)
{
  return new fabric.Rect({
    hoverCursor: 'pointer',
    originY: 'center',
    originX: 'left',
    fill: '#00BFA5',
    height: 30,
    scaleX: 1,
    scaleY: 1,
    stroke: '#000000',
    strokeWidth: 1,
    ...options,
    ...lock
  })
}

/**
* @param {String} departure
* @param {String} landing
* @return {{stop: Number, start: Number}}
*/
export function getTimeRange({ departure, landing })
{
  const start = departure ? new Date(departure).getTime() : null
  const stop = landing ? new Date(landing).getTime() : null

  return { start, stop }
}
