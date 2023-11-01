import './assets/css/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Vue3Toasity, {
  autoClose: 3000,
} as ToastContainerOptions);
app.use(createPinia())
app.use(router)

app.mount('#app')
