import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueDatagrid from '../../src/canvas-datagrid.vue'

Vue.config.productionTip = false

Vue.component('canvas-datagrid', VueDatagrid)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
