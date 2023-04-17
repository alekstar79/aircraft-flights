<template>
  <v-container class="schedule__drawings">
    <v-responsive class="d-flex align-center text-center">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">

          <TimeLine />
          <canvas width="788" height="375" ref="canvas" />

        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useDraw } from '@/use/drawHook'

import TimeLine from '@/components/TimeLine.vue'

const emit = defineEmits(['range:click'])
const canvas = ref(null)

onMounted(() => {
  useDraw(canvas.value, emit)
})
</script>

<style lang="scss" scoped>
.schedule__drawings {
  canvas {
    border: 1px solid black;
    border-top: none;

    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .v-col {
    overflow: hidden;
    padding: 12px 0;
  }
}
</style>
