import { configuration } from "isignif-client";
import Vue from "vue";
import VueResource from "vue-resource";
// vue plugin
import VueRouter from "vue-router";
import VuetifyToast from "vuetify-toast-snackbar";
import App from "./App.vue";
import { apiUrl } from "./config";
import Act from "./pages/Act.vue";
import ActNew from "./pages/ActNew.vue";
import Acts from "./pages/Acts.vue";
import Advocate from "./pages/Advocate.vue";
import Dashboard from "./pages/Dashboard.vue";
import Help from "./pages/Help.vue";
import Signin from "./pages/Signin.vue";
import Signup from "./pages/Signup.vue";
import "./plugins/vuetify";
import vuetify from "./plugins/vuetify";
import store from "./store";

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VuetifyToast);

Vue.config.productionTip = process.env.NODE_ENV !== "production";
(Vue as any).http.options.root = require("./config").api_url;
(Vue as any).http.options.emulateJSON = true;

configuration.apiUrl = apiUrl;

const routes = [
  { path: "/", component: Acts, name: "home" },
  { path: "/dashboard", component: Dashboard, name: "dashboard" },
  { path: "/signin", component: Signin, name: "signin" },
  { path: "/signup", component: Signup, name: "signup" },
  { path: "/advocate/:id", component: Advocate, name: "advocate" },
  { path: "/acts/:id", component: Act, name: "act" },
  { path: "/acts", component: Acts, name: "acts" },
  { path: "/acts_new", component: ActNew, name: "new_act" },
  { path: "/help", component: Help, name: "help" },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
} as any).$mount("#app");
