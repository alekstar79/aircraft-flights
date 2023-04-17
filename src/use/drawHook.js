import { inject, watch } from 'vue'
import { useStore } from 'vuex'

import {
  setBackgroundColor,
  displayScale,
  getTimeRange,
  rect,
  text,
  OFFSET,
  STEP,
  SEC,
  KX,
  FONT_SIZE
} from '@/utils'

function getMillisecondsAtStartDay()
{
  const now = new Date()

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime()
}

export function useDraw(cnv, emit)
{
  const fabric = inject('fabric')
  const canvas = new fabric.Canvas(cnv)
  const store = useStore()

  const emitter = inject('emitter')
  const defaultText = text('РЕЙСОВ НЕТ', { left: 280, top: 175 }, fabric)
  const millisecondsAtStartDay = getMillisecondsAtStartDay()

  let activeRange, dx, dy, /* left, */ scaleX = 1

  setBackgroundColor(canvas)

  canvas.selection = false

  emitter.on('close:popup', () => {
    activeRange && activeRange.set('fill', '#00BFA5')
    canvas.requestRenderAll()
  })

  /*
  * TODO: Modify mousewheel event handler to adequate behavior. It also affects rendering.
  *  After a day, if you set the time reference, the flight time interval goes beyond the canvas.
  *  And if hardcode the value, it becomes impossible to set intervals other than the given value.
  */
  canvas.on('mouse:wheel', ({ e }) => {
    e.preventDefault()

    canvas.forEachObject(object => {
      switch (true) {
        case object.type === 'rect':
          dy = e.deltaY || e.wheelDelta
          dx = (dy > 0 ? +.05 : -.05)

          scaleX = object.scaleX + dx

          if (scaleX > 1) {
            scaleX = 1
          }
          if (scaleX < .25) {
            scaleX = .25
          }

          // left = object.left * scaleX
          // object.set({ left, scaleX })

          break
        case object.sid === 'scale':
          // object.set('text', displayScale(scaleX))
          break
      }
    })

    canvas.requestRenderAll()
  })

  /**
   * Rendering flights on canvas
   * @param {Airplane[]} airplanes
   */
  const drawAirplans = airplanes => {
    setBackgroundColor(canvas)

    const height = canvas.getHeight()
    const width = canvas.getWidth()

    const objects = []

    /**
     * @param {Airplane} airplane
     * @param {Number} index
     */
    const bypass = (airplane, index) => {
      if (!airplane.sideNumber) return

      let top = 60 + (STEP * index)

      objects.push(text(airplane.sideNumber, { left: 20, top }, fabric))

      airplane.flightsTime.forEach(function(time, idx) {
        if (!time.departure || !time.landing) return

        let { start, stop } = getTimeRange(time)

        start -= millisecondsAtStartDay
        stop -= millisecondsAtStartDay

        start /= (SEC * KX)
        stop /= (SEC * KX)

        const width = stop - start
        const left = start + (OFFSET * (idx <= 0 ? 1 : 0))
        const options = { airplane, index, idx, left, top, width }
        const range = rect(options, fabric)

        range.on('mousedown', function({ target }) {
          activeRange && activeRange.set('fill', '#00BFA5')

          target.set('fill', '#8EAAFF')
          emit('range:click', {
            ...options,
            left: left + canvas._offset.left,
            top: top + canvas._offset.top
          })

          activeRange = target
        })

        objects.push(range)
      })
    }

    airplanes.forEach(bypass)

    if (objects.length) {
      return canvas.add(
        ...objects,

        text(displayScale(scaleX), {
          fontSize: FONT_SIZE / 2,
          top: height - FONT_SIZE / 2,
          left: width - 70,
          sid: 'scale'
        }, fabric)
      )
    }

    canvas.add(defaultText)
  }

  drawAirplans(store.getters.airplanes)

  watch(store.getters.airplanes, drawAirplans, { deep: true })
}
