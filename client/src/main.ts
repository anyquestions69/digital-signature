import { createPinia } from 'pinia'
import { createApp } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import './assets/scss/global.scss'
import router from './routes/router'

createApp(App).use( createPinia().use( piniaPluginPersistedstate ) ).use(router).mount('#app')
