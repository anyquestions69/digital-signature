import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/scss/global.scss'
import App from './App.vue'
import router from './routes/router'


createApp( App ).use( createPinia() ).use( router ).mount( '#app' )
