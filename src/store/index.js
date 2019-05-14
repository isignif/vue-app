import Vue from 'vue'
import Vuex from 'vuex'
import logged_user from './modules/logged_user'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    logged_user
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})
