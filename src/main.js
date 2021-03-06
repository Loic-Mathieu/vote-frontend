import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import  moment from 'moment'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;

new Vue({
  render: h => h(App),
}).$mount('#app')
