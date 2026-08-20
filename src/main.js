import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import scrollAnimation from './directives/scrollAnimation'
import './assets/styles/base.css'
import './assets/styles/theme.css'

const app = createApp(App)
app.use(router)
app.directive('scroll-animation', scrollAnimation)
app.mount('#app')
