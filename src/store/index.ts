import Vue from "vue";
import Vuex from "vuex";
import currentUser from "./modules/currentUser";
import snackbar from "./modules/snackbar";
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const ISIGNIF_LOCAL_STORAGE_KEY: string = "isignif_vuex_database";

const store = new Vuex.Store({
  modules: {
    currentUser,
    snackbar
  },
  mutations: {
    // Initialize saved state from local localStorage
    // https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
    initialiseStore(state) {
      if (localStorage.getItem(ISIGNIF_LOCAL_STORAGE_KEY)) {
        // Replace the state object with the stored item
        const localStorageString: string | null = localStorage.getItem(
          ISIGNIF_LOCAL_STORAGE_KEY
        );

        if (localStorageString) {
          this.replaceState(
            Object.assign(state, JSON.parse(localStorageString))
          );
        }
      }

      store.dispatch('currentUser/checkToken');
    }
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  // https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
  localStorage.setItem(ISIGNIF_LOCAL_STORAGE_KEY, JSON.stringify(state));
});

export default store;
