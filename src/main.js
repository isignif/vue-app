import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Home from './pages/Home.vue'
import Dashboard from './pages/Dashboard.vue'
import Acts from './pages/Acts.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard },
  { path: '/acts', component: Acts },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
