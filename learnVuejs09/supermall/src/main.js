import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

Vue.prototype.$bus=new Vue();

import './assets/css/base.css'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
