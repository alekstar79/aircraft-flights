import { useStore } from 'vuex'

/**
* @typedef FlightTime
* @property {string} departure
* @property {string} landing
*/

/**
* @typedef Airplane
* @property {FlightTime[]} flightsTime
* @property {string} sideNumber
*/

/**
* @typedef FlightsService
* @property {Airplane} airplane
* @property {function} updateSideNumber
* @property {function} updateFlyData
* @property {function} removeFlight
* @property {function} addFlight
*/

/**
* @return FlightsService
*/
export function useAirplane({ index })
{
  const store = useStore()

  const airplane = store.getters.airplanes[index]

  /**
   * Performs aircraft tail number update
   * @param {number} number
   */
  const updateSideNumber = (number) => {
    store.commit('UPDATE_SIDE_NUMBER', { index, number })
  }

  /**
   * Updates aircraft departure/arrival time
   * @param {Date} value
   * @param {string} field
   * @param {number} id
   */
  const updateFlyData = (value, field, id) => {
    store.commit('UPDATE_FLY_DATA', { index, value, field, id })
  }

  /**
   * Deletes aircraft departure/arrival time
   * @return void
   */
  const removeFlight = () => {
    store.commit('REMOVE_FLIGHT', { index })
  }

  /**
   * Adds aircraft departure/arrival time
   * @return void
   */
  const addFlight = () => {
    store.commit('ADD_FLIGHT', { index })
  }

  return {
    airplane,
    updateSideNumber,
    updateFlyData,
    removeFlight,
    addFlight
  }
}
