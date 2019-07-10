import Vue from 'vue'
import Vuex from 'vuex'
import current_user from './modules/current_user'
import snackbar from './modules/snackbar'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const ISIGNIF_LOCAL_STORAGE_KEY = 'isignif_vuex_database'

const store = new Vuex.Store({
  modules: {
    current_user,
    snackbar
  },
  mutations: {
    // Initialize saved state from local localStorage
    // https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
		initialiseStore(state) {
			if(localStorage.getItem(ISIGNIF_LOCAL_STORAGE_KEY)) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem(ISIGNIF_LOCAL_STORAGE_KEY)))
				);
			}
		}
	},
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})

store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
  // https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
	localStorage.setItem(ISIGNIF_LOCAL_STORAGE_KEY, JSON.stringify(state));
});

export default store
