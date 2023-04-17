import { createApp } from 'vue'
import mitt from 'mitt'

import App from './App.vue'
import store from '@/store'

import loadFonts from '@/plugins/fonts'
import vuetify from '@/plugins/vuetify'
import fabric from '@/plugins/fabric'

import maxlen from '@/directives/max-length'
import '@/utils/mock'

loadFonts()

const app = createApp(App)

const emitter = mitt()

app.provide('emitter', emitter)
app.use(fabric, { preserveObjectStacking: true })
app.use(vuetify)
app.use(store)

app.directive('maxlen', maxlen)

app.mount('#app')
