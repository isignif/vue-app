<template>
<v-app>
  <NavBar />
  <v-toolbar app dark>
    <v-toolbar-title class="headline text-uppercase">
      <span>{{title}}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/acts/new" class="primary">
      <span class="mr-2">Demander une signification d'acte</span>
    </v-btn>
  </v-toolbar>

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
  <Snackbar />
</v-app>
</template>

<script>
import NavBar from './components/NavBar'
import Snackbar from './components/Snackbar'

const PAGES_TITLE = {
  home: 'Accueil',
  dashboard: 'Dashboard',
  signin: 'Connexion',
  advocate: 'Avocat',
  act: 'Acte',
  acts: 'Mes actes',
  new_act: 'Demander un acte',
  messages: 'Messageries',
  help: 'FAQ',
}

export default {
  name: 'App',
  components: {
    NavBar,
    Snackbar
  },
  computed: {
    title() {
      let routeName = this.$route.name
      return PAGES_TITLE[routeName]
    }
  },
  data() {
    return {
      //
    }
  }
}
</script>
