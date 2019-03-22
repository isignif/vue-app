import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from 'vue-router'
import App from './App.vue'

import Home from './pages/Home.vue'
import Dashboard from './pages/Dashboard.vue'
import Help from './pages/Help.vue'
import Messages from './pages/Messages.vue'
import Acts from './pages/Acts.vue'
import ActNew from './pages/ActNew.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard },
  { path: '/acts', component: Acts },
  { path: '/acts/new', component: ActNew },
  { path: '/messages', component: Messages },
  { path: '/help', component: Help },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
