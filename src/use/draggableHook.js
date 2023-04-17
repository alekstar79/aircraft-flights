import { ref, computed } from 'vue'
import { clamp } from '@/utils'

export function useDraggable(root, mode = 0)
{
  const eventsDetermine = computed(() => {
    return { start: 'mousedown',  move: 'mousemove', end: 'mouseup' }
  })

  const left = ref(null)
  const top = ref(null)

  const isDown = ref(false)
  const offsetX = ref(0)
  const offsetY = ref(0)
  const snap = ref(1)

  /**
   * @param {Number} x
   * @param {Number} y
   * @returns {{left: Number, top: Number}}
   */
  function modeResolver(x, y)
  {
    return {
      left: mode === 2 ? left.value : x,
      top:  mode === 1 ? top.value  : y
    }
  }

  /**
   * @param {{left: Number, top: Number}}
   */
  function setCoords({ left: _left, top: _top })
  {
    const height = window.innerHeight - root.value?.clientHeight || 0,
      width = window.innerWidth - root.value?.clientWidth || 0

    left.value = clamp(_left, 0, width)
    top.value = clamp(_top, 0, height)
  }

  /**
   * @param {Number} posX
   * @param {Number} posY
   */
  function calculateCoords(posX, posY)
  {
    setCoords(
      modeResolver(
        posX - (posX % snap.value),
        posY - (posY % snap.value)
      )
    )
  }

  function recalc()
  {
    calculateCoords(root.value?.offsetLeft || 0, root.value?.offsetTop || 0)
  }

  function toggleEvents()
  {
    const el = document.documentElement, { move, end } = eventsDetermine.value

    if (isDown.value) {
      el.removeEventListener(move, mouseMove)
      el.removeEventListener(end, mouseUp)
    } else {
      el.addEventListener(move, mouseMove)
      el.addEventListener(end, mouseUp)
    }

    isDown.value = !isDown.value
  }

  function mouseUp()
  {
    toggleEvents()
  }

  /**
   * @param {MouseEvent} e
   */
  function mouseMove(e)
  {
    calculateCoords(e.pageX - offsetX.value, e.pageY - offsetY.value)

    prevent(e)
  }

  /**
   * @param {MouseEvent} e
   */
  function mouseDown(e)
  {
    try {

      offsetX.value = e.pageX - root.value.offsetLeft
      offsetY.value = e.pageY - root.value.offsetTop

      toggleEvents()

    } catch (e) {
      // do some think
    }
  }

  /**
   * @param {Event} e
   */
  function prevent(e)
  {
    e.preventDefault()
  }

  document.body.addEventListener('selectstart', prevent)
  document.addEventListener('mousedown', mouseDown)
  document.addEventListener('dragstart', prevent)
  window.addEventListener('resize', recalc)

  return {
    left,
    top
  }
}
