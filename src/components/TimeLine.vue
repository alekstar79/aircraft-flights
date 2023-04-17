<!--suppress HtmlUnknownTag -->
<template><render /></template>

<script setup>
import { computed, h } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const origin = computed(() => store.state.origin)
const scaled = computed(() => store.state.scaled)

const originSize = computed(() => {
  const { width = 0 } = origin.value || {}

  return width
})

const scaledSize = computed(() => {
  const { width = 0 } = scaled.value || {}

  return width
})

const count = computed(() => originSize.value ? originSize.value / 5 : 0)
const step = computed(() => scaledSize.value ? scaledSize.value / count.value : 0)

const render = () => {
  let length = Math.ceil(count.value),
    edge = length < 72 ? length - 3 : length - 6,
    px = 200

  return h('div', {
    class: { ruler: true }

  }, Array.from({ length }, (_, i) => {
    const data = { style: {} }, children = []

    if (i > 0) {
      px += (step.value - 1)
    }
    if (i % 6 === 0) {
      data.class = 'milestone'

      children.push(h(
        'span',
        { class: ['label track'] },
        i <= edge ? i * 10 : []
      ))

    } else if (i % 3 === 0) {
      data.class = 'major'
    } else {
      data.class = 'common'
    }

    data.class += ' track'
    data.style['left'] = px + 'px'

    return h('span', data, children)
  }))
}
</script>

<style lang="scss">
.ruler {
  display: flex;
  padding-top: 1px;
  width: 100%;

  background-color: rgba(180,180,180,.5);

  border-right: 1px solid black;
  border-left: 1px solid black;
  border-top: 1px solid black;

  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  user-select: none;

  span {
    position: relative;
    height: 7px;
    top: 14px;

    border-left: 1px solid #999;

    &.milestone {
      border-left: 1px solid #000;
      height: 13px;
    }
    &.major {
      border-left: 1px solid #000;
      height: 10px;
    }
    &.label {
      position: absolute;
      top: -14px;

      text-align: center;
      font-size: 10px;

      color: #000;
      border: 0;

      transform: translateX(-50%);
    }
  }
}
</style>
