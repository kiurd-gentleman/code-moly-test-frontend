import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

