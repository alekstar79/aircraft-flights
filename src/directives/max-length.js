const handlers = new Map()

function updateHandler(el, binding)
{
  el = el.querySelector('.v-field__input')

  el.removeEventListener('input', handlers.get(el))

  const handler = () => {
    const value = el.value.slice(0, binding.value)

    if (value !== el.value) {
      el.value = value
      el.dispatchEvent(new Event('input'))
    }
  }

  handler()

  handlers.set(el, handler)

  el.addEventListener('input', handler)
}

function unbindHandler(el)
{
  el.removeEventListener('input', handlers.get(el))

  handlers.delete(el)
}

export default {
  mounted: updateHandler,
  updated: updateHandler,
  unmounted: unbindHandler
}
