<template>
  <v-container class="schedule__airplanes">
    <v-row
      class="d-flex flex-column"
      align-content="center"
    >
      <v-col
        v-for="(airplane, index) in airplanes"
        :key="index"
        sm="12"
      >
        <InputFlyData :airplane="airplane" :index="index" />
      </v-col>

      <v-col cols="auto">
        <v-card
          class="add-airplane__action mx-auto"
          max-width="786"
          variant="outlined"
        >
          <v-card-actions>
            <v-btn
              @click="addAirplane"
              variant="flat"
              color="teal-accent-4"
            >
              <v-icon
                icon="mdi-airplane"
                start
              />

              Добавить воздушное судно
            </v-btn>

            <v-btn
              @click="removeAirplane"
              variant="flat"
              color="teal-accent-4"
            >
              <v-icon
                icon="mdi-airplane"
                start
              />

              Удалить воздушное судно
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import InputFlyData from '@/components/InputFlyData'
import { useList } from '@/use/listHook'

const {

  airplanes,
  removeAirplane,
  addAirplane

} = useList()
</script>

<style lang="scss">
.schedule__airplanes {
  margin-top: 20px;

  .add-airplane__action {
    padding: 0;

    .v-card-actions {
      justify-content: space-between;
    }
  }
}
</style>
