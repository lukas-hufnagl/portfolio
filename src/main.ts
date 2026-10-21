import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

// Prevent browser from smooth-scrolling to restored position on reload
history.scrollRestoration = 'manual'

createApp(App).use(router).mount('#app')
