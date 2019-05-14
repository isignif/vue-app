<template>
<v-app>
  <NavBar />
  <v-toolbar app dark>
    <v-toolbar-title class="headline text-uppercase">
      <span>{{$route.name}}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/acts/new" class="primary">
      <span class="mr-2">Demander une signification d'acte</span>
    </v-btn>
  </v-toolbar>

  <v-content >
    <v-container>
      <h1>{{$route.name}}</h1>
      <router-view></router-view>
    </v-container>
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
