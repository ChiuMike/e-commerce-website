import Vue from 'vue'
import App from './App'
import axios from 'axios' //ajax套件
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import router from './router';
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';
import { email } from 'vee-validate/dist/rules';
import { required } from 'vee-validate/dist/rules';
import './Bus';

import Currency from './filters/currency';
import dollarSign from './filters/dollars';
Vue.filter('currency',Currency);
Vue.filter('dollarsigns',dollarSign);

Vue.config.productionTip = false

axios.defaults.withCredentials=true;
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('Loading',Loading);
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
 
localize('zh_TW', TW);
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
 
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});
extend('email', email);
extend('required', required);
extend('phoneNum',value=>{
  const re=/^[0-9]{10}$/g;
  if(!re.test(value)){
    return '號碼格式錯誤'
  }else{
    return true
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
