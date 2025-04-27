import './assets/css/colors.css'
import './assets/css/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import { clickOutside } from '@/utils/directives'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Notifications)

app.directive('click-outside', clickOutside)

app.mount('#app')
