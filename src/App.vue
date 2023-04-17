<template>
  <v-app>
    <v-main>
      <InputFlyList />
      <DrawingSchedule @range:click="openPopup" />
      <PopupFlyData
        v-if="popup"
        @close:popup="closePopup"
        :flight="flight"
      />
    </v-main>
  </v-app>
</template>

<script setup>
import InputFlyList from '@/components/InputFlyList'
import DrawingSchedule from '@/components/DrawingSchedule'
import PopupFlyData from '@/components/PopupFlyData.vue'

import { ref, inject } from 'vue'

const emitter = inject('emitter')
const flight = ref(null)
const popup = ref(false)

const openPopup = data => {
  flight.value = data
  popup.value = true
}
const closePopup = () => {
  emitter.emit('close:popup')
  popup.value = false
}
</script>

<style lang="scss">
#app {
  font-family: Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .v-main {
    background: rgba(150,150,150,.1);
  }
}
</style>
