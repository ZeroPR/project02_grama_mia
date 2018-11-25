import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'
import moment from 'moment'
import accounting from 'accounting'

Vue.config.productionTip = false
Vue.use(VueSession)

Vue.filter('fecha', (fecha) => {
  return moment(fecha).format('DD[/]MM[/]YYYY')
})

Vue.filter('capitalize', (val) => {
  return val[0].toUpperCase() + val.slice(1)
})

Vue.filter('currency', (val) => {
  return accounting.formatMoney(val)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
