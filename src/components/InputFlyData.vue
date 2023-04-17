<template>
  <v-card
    class="mx-auto"
    max-width="786"
    variant="outlined"
  >
    <v-card-title class="input-fly-data__title">
      <v-text-field
        label="Бортовой номер"
        :model-value="airplane.sideNumber"
        @update:modelValue="updateSideNumber"
        variant="outlined"
        density="compact"
        hide-details
        v-maxlen="8"
      />
    </v-card-title>

    <v-card-item
      class="input-fly-data__item"
      v-for="(flight, id) in airplane.flightsTime"
      :key="id"
    >
      <v-responsive max-width="49%">
        <v-text-field
          label="Вылет"
          :model-value="flight.departure"
          @update:modelValue="updateFlyData($event, 'departure', id)"
          variant="outlined"
          density="compact"
          type="datetime-local"
          hide-details
        />
      </v-responsive>

      <v-responsive max-width="49%">
        <v-text-field
          label="Посадка"
          :model-value="flight.landing"
          @update:modelValue="updateFlyData($event, 'landing', id)"
          variant="outlined"
          density="compact"
          type="datetime-local"
          hide-details
        />
      </v-responsive>
    </v-card-item>

    <v-card-actions>
      <v-btn
        @click="addFlight"
        color="teal-accent-4"
        variant="outlined"
      >
        <v-icon
          icon="mdi-airplane"
          start
        />

        Добавить перелет
      </v-btn>

      <v-btn
        @click="removeFlight"
        color="teal-accent-4"
        variant="outlined"
      >
        <v-icon
          icon="mdi-airplane"
          start
        />

        Удалить перелет
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useAirplane } from '@/use/airplaneHook'

const props = defineProps(['index'])

const {

  airplane,
  updateSideNumber,
  updateFlyData,
  removeFlight,
  addFlight

} = useAirplane(props)
</script>

<style lang="scss">
.v-card {
  .input-fly-data__title {
    padding: .7rem 1rem .5rem;
  }
  .v-card-item {
    padding: .3rem 1rem;

    .v-card-item__content {
      display: flex;
      justify-content: space-between;

      .v-responsive__content {
        padding: .3rem 0;
      }
    }
  }
  .v-card-actions {
    padding: .625rem 1rem;
    justify-content: space-between;
  }
}
</style>
