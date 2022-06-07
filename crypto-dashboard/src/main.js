import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import routes from './router'

Vue.prototype.$access_token =
  "coinranking75c8c9f7bff29d091f4e0d88dbcb49dd4bd423cdcf2c2578";

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
