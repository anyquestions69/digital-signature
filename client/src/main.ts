import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import './assets/scss/global.scss'
import router from './routes/router'

createApp(App).use(createPinia()).use(router).mount('#app')
