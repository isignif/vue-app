<template>
  <v-app>
    <NavBar />
    <v-app-bar app flat>
      <v-toolbar-title class="headline ">
        <span>{{title}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'new_act' }" medium color="primary" style="border-radius: 7px">Déposer un acte</v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>iSignif &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

const PAGES_TITLE = {
  home: "Accueil",
  dashboard: "Dashboard",
  signin: "Connexion",
  signup: "Se créer un compte",
  advocate: "Avocat",
  act: "Acte",
  acts: "Mes actes",
  new_act: "Demander un acte",
  messages: "Messageries",
  help: "FAQ"
};

export default {
  name: "App",
  components: {
    NavBar
  },
  computed: {
    title() {
      let routeName = this.$route.name;
      return PAGES_TITLE[routeName];
    }
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="scss">
  @import "./assets/stylesheets/main.scss";
</style>
