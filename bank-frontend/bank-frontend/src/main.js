// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assurez-vous que le chemin est correct

import './index.css'; // Assurez-vous que cette ligne est ajoutée


const app = createApp(App);

app.use(router);

app.mount('#app');
