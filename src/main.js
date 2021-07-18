import Vue from 'vue'
import App from './App.vue'
import bootstrapCss from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Jquery from 'jquery'
window.$ = window.jQuery = Jquery
import popper from 'popper.js'
import bootstrapjs from '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import swal from 'sweetalert2'
window.swal = swal;

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.toast = toast;
import { Form, HasError, AlertError } from 'vform'
window.Form = Form
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
import axios from 'axios'
window.axios = axios
window.token = localStorage.getItem('AToken');
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

window.Fire = new Vue();

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
