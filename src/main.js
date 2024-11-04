import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@/assets/css/font-awesome.css'
import '@/assets/js/font-awesome.min.js'
import Vue3Lottie from 'vue3-lottie'
import 'aos/dist/aos.css'

const vuetify = createVuetify({
    components,
    directives,
})
const app = createApp(App)
const pinia = createPinia()

app.use(
    pinia.use(({ store }) => {
        store.router = markRaw(router)
    }),
)
app.use(router)
app.use(vuetify)
app.use(Vue3Lottie)
app.mount('#app')
