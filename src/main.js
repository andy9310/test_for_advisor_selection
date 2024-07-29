import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { createPinia } from 'pinia'
import axios from '@/utils/axios'
import VueAxios from 'vue-axios'

import 'vue3-toastify/dist/index.css'
import Vue3Toastify from 'vue3-toastify'
import router from './router'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(Vue3Toastify, {
  autoClose: 10000,
  closeOnClick: false,
  theme: 'colored',
  clearOnUrlChange: true
})

app.mount('#app')

