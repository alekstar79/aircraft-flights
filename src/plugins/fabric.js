import { fabric } from 'fabric'

export default {
  install: (app, options) => {
    app.provide('fabric', fabric)

    app.config.globalProperties.fabric = canvas => {
      return new fabric.Canvas(canvas, options)
    }

    app.directive('fabric', {
      mounted(el) {
        el.fabric = new fabric.Canvas(el, options)
      }
    })
  }
}
