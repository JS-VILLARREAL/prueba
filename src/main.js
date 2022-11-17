import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bootswatch/dist/flatly/bootstrap.css';

createApp(App).use(router).use(router).mount('#app')
