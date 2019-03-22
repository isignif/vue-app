<template>
<v-app>
  <NavBar />
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>iSignif</span>
      <span class="font-weight-light">MATERIAL DESIGN</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat to="/acts/new">
      <span class="mr-2">Demander une signification d'acte</span>
    </v-btn>
  </v-toolbar>

  <v-content>
    <router-view></router-view>
  </v-content>
  <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>iSignif &copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</v-app>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      //
    }
  }
}
</script>
