import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
// vue plugin
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import './plugins/vuetify'
import store from './store'

import Home from './pages/Home.vue'
import Signin from './pages/Signin.vue'
import Signup from './pages/Signup.vue'
import Dashboard from './pages/Dashboard.vue'
import Help from './pages/Help.vue'
import Messages from './pages/Messages.vue'
import Advocate from './pages/Advocate.vue'
import Acts from './pages/Acts.vue'
import Act from './pages/Act.vue'
import ActNew from './pages/ActNew.vue'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

Vue.use(VueRouter)
Vue.use(VueResource)


const routes = [
  { path: '/', component: Home, name: 'home'},
  { path: '/dashboard', component: Dashboard, name: 'dashboard' },
  { path: '/signin', component: Signin, name: 'signin' },
  { path: '/signup', component: Signup, name: 'signup' },
  { path: '/advocate/:id', component: Advocate, name: 'advocate' },
  { path: '/acts/:id', component: Act, name: 'act' },
  { path: '/acts', component: Acts, name: 'acts' },
  { path: '/acts/new', component: ActNew, name: 'new_act' },
  { path: '/messages', component: Messages, name: 'messages' },
  { path: '/help', component: Help, name: 'help' },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  store,
  router,
  render: h => h(App),
  beforeCreate() {
		this.$store.commit('initialiseStore');
	}
}).$mount('#app')
