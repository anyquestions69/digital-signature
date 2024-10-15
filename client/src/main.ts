import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
// //@ts-ignore
// import Toast, { PluginOptions, POSITION } from 'vue-toastification'
// import 'vue-toastification/dist/index.css'

import App from './App.vue'
import './assets/scss/global.scss'
import router from './routes/router'

// const options: PluginOptions = {
// 	position: POSITION.TOP_RIGHT, // Позиция уведомлений
// 	timeout: 5000, // Время отображения уведомления (в миллисекундах)
// 	closeOnClick: true, // Закрывать при клике
// 	pauseOnFocusLoss: true, // Пауза уведомления, когда окно теряет фокус
// 	draggable: true // Включить перетаскивание
// }

createApp(App)
	.use(createPinia().use(piniaPluginPersistedstate))
	.use(router)
	.mount('#app')
