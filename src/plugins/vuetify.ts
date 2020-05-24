import Vue from "vue";
// import "vuetify/src/stylus/app.styl";

import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'

Vue.use(Vuetify, {
//   iconfont: "md",
//   theme: {
//     primary: "#2C94C8",
//     secondary: "#c2b59b",
//     accent: "#8c9eff",
//     error: "#b71c1c"
//   },
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
});

export default new Vuetify({
  themes: {
    light: {
      prime: '#df8421'
    },
    dark: {
      prime: '#333'
    }
  },
  icons: {
    iconfont: 'mdi',
  },
//   components: {
//     VSnackbar,
//     VBtn,
//     VIcon
//   }
});