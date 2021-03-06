import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'
import './filters/filters'
Vue.use(Notifications, { classes: [] })
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
