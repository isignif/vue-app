import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
// vue plugin
import VueRouter from 'vue-router'


import Home from './pages/Home.vue'
import Dashboard from './pages/Dashboard.vue'
import Help from './pages/Help.vue'
import Messages from './pages/Messages.vue'
import Acts from './pages/Acts.vue'
import ActNew from './pages/ActNew.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home, name: "Page principale" },
  { path: '/dashboard', component: Dashboard, name: "Dashboard" },
  { path: '/acts', component: Acts, name: "Mes actes" },
  { path: '/acts/new', component: ActNew, name: "Demander une signification d'acte" },
  { path: '/messages', component: Messages, name: "Messagerie" },
  { path: '/help', component: Help, name: "FAQ" },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
