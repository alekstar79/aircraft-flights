import { createStore } from 'vuex'

import airplanes from '@/utils/mock'

const store = createStore({
  state: () => ({
    color: 'accent',

    origin: { width: 790 },
    scaled: { width: 642 },

    airplanes, /*: [{
      sideNumber: 'RA-12345',

      flightsTime: [
        {
          departure: '2023-04-17T00:00',
          landing: '2023-04-17T05:35'
        },
        {
          departure: '2023-04-17T12:00',
          landing: '2023-04-17T16:15'
        },
      ]
    },{
      sideNumber: 'KX-75139',

      flightsTime: [
        {
          departure: '2023-04-17T06:50',
          landing: '2023-04-17T11:25'
        }
      ]
    }] */
  }),

  getters: {
    airplanes: state => state.airplanes
  },

  mutations: {
    UPDATE_SIDE_NUMBER(state, { number, index })
    {
      state.airplanes[index].sideNumber = number
    },
    UPDATE_FLY_DATA(state, { value, field, id, index })
    {
      state.airplanes[index].flightsTime
        .some((val, index) => {
          if (index === id) {
            val[field] = value
            return true
          }

          return false
        })
    },
    REMOVE_FLIGHT(state, { index })
    {
      state.airplanes[index].flightsTime.splice(-1, 1)
    },
    ADD_FLIGHT(state, { index })
    {
      let value = state.airplanes[index].flightsTime

      value = [...value, { departure: '', landing: '' }]

      state.airplanes[index].flightsTime = value
    },
    REMOVE_AIRPLANE(state)
    {
      state.airplanes.splice(-1, 1)
    },
    ADD_AIRPLANE(state)
    {
      state.airplanes.push({
        sideNumber: '',

        flightsTime: [
          {
            departure: '',
            landing: ''
          }
        ]
      })
    }
  }
})

export default store
