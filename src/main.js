import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  render: h => h(App),
}).$mount('#app')
