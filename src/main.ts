import './assets/main.css'

// main.js หรือ main.ts
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/soft-ui-dashboard.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@/assets/js/soft-ui-dashboard.min.js";


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
