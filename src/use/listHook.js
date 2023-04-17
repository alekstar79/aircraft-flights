import { useStore } from 'vuex'

/**
* @typedef ListService
* @property {Airplane[]} airplanes
* @property {function} removeAirplane
* @property {function} addAirplane
*/

/**
* @return {ListService}
*/
export function useList()
{
  const store = useStore()

  const airplanes = store.getters.airplanes

  const removeAirplane = () => {
    store.commit('REMOVE_AIRPLANE')
  }

  const addAirplane = () => {
    store.commit('ADD_AIRPLANE')
  }

  return {
    airplanes,
    removeAirplane,
    addAirplane
  }
}
