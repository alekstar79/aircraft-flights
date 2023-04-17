export * from '@/utils/draw'
export * from '@/utils/app'

/**
* @param {Number} v
* @param {Number=} l
* @param {Number=} h
* @param {Number=} d
* @returns {Number}
*/
export function clamp(v, l = 0, h = 1080, d = 0)
{
  if (typeof v === 'undefined' || Number.isNaN(v)) v = d

  return v > h ? h : v < l ? l : v + .5 | 0
}

/**
* @param {MouseEvent} e
* @returns {{x: Number, y: Number}}
*/
export const mouse = e => ({ x: e.clientX || e.pageX, y: e.clientY || e.pageY })

/**
* @param {TouchEvent} e
* @returns {{x: Number, y: Number}}
*/
export const touches = e => ({ x: e.touches[0].pageX, y: e.touches[0].pageY })

/**
* @param {MouseEvent|TouchEvent} e
* @returns {{x: Number, y: Number}}
*/
export const coords = e => e.touches?.length ? touches(e) : mouse(e)
