<template>
  <div
    class="popup-fly-data draggable"
    :style="{ left, top }"
    ref="root"
  >
    <v-card width="300">
      <v-btn
        @click="emit('close:popup')"
        icon="mdi-window-close"
        position="absolute"
        :ripple="false"
        variant="plain"
      />

      <v-card-title class="popup-fly-data__title">
        {{ airplane?.sideNumber || '' }}
      </v-card-title>

      <v-card-text class="popup-fly-data__content">
        <div
          class="popup-fly-data__item"
          v-for="({ departure, landing }, i) in flightsTime"
          :key="i"
        >
          <p>Вылет: {{ toLocaleTime(departure) }}</p>
          <p>Посадка: {{ toLocaleTime(landing) }}</p>
          <p>Время в полете: {{ calcTimeRange(landing, departure) }}</p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import { useStore } from 'vuex'

import { calcTimeRange, toLocaleTime } from '@/utils'
import { useDraggable } from '@/use/draggableHook'

const emit = defineEmits(['close:popup'])
const props = defineProps(['flight'])
const store = useStore()

const airplane = computed(() => {
  return store.state.airplanes[props.flight.index]
})

const flightsTime = computed(() => {
  return store.state.airplanes[props.flight.index].flightsTime
    .filter((time, i) => props.flight.idx === i)
})

const drag = ref({})
const root = ref(null)
const left = ref(null)
const top = ref(null)

let mounted

if (!mounted) {
  left.value = `${props.flight.left}px`
  top.value = `${props.flight.top}px`
}

watch(store.state.airplanes, value => {
  if (!value[props.flight.index]) {
    emit('close:popup')
  }
})

onMounted(async () => {
  mounted = true

  await nextTick()

  drag.value = useDraggable(root)

  watch(drag.value, value => {
    left.value = `${value.left}px`
    top.value = `${value.top}px`
  })
})
</script>

<style lang="scss" scoped>
.popup-fly-data {
  position: absolute;
  user-select: none;

  .popup-fly-data__title {
    cursor: grab;
  }
  .popup-fly-data__item:not(:last-child) {
    border-bottom: 1px solid rgba(100,100,100,.5);
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
  .v-btn.v-btn--icon {
    right: 0;
    top: 0;
  }
}
</style>
