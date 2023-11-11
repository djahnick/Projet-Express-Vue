// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assurez-vous que le chemin est correct
import '@fortawesome/fontawesome-free/css/all.css';

import './index.css'; // Assurez-vous que cette ligne est ajoutÃ©e


const app = createApp(App);

app.use(router);

app.mount('#app');