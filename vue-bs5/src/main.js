import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './registerServiceWorker'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'material-icons/iconfont/material-icons.css'

import axios_interceptor from '@/assets/services/sys/axios-interceptor'
axios_interceptor(store)

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
