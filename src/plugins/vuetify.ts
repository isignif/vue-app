import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#3A718C",
    secondary: "#c2b59b",
    accent: "#8c9eff",
    error: "#b71c1c"
  }
});
