<template>
<v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless>
  <v-toolbar flat dark>
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="title" style="display: flex; justify-content: center">
          <img v-if="mini" src="../assets/favicon.svg" height="100%">
          <span v-else>iSignif</span>
        </v-list-tile-title>
        <v-list-tile-action v-if="!mini">
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-toolbar>

  <!-- <v-divider></v-divider> -->

  <v-list class="pt-0">


    <!-- Page principale -->
    <v-list-tile to="/">
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>Page principale</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-divider />

    <!-- Dashboard -->
    <v-list-tile to="/dashboard" v-if="current_user_id">
      <v-list-tile-action>
        <v-icon>dashboard</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>Dashboard</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>


    <!-- actes -->
    <v-list-group prepend-icon="assignment" no-action v-if="current_user_id">
      <template v-slot:activator>
        <v-list-tile to="/acts">
          <v-list-tile-title>Actes</v-list-tile-title>
        </v-list-tile>
      </template>

      <!-- Mes actes -->
      <v-list-tile to="/acts" sub-item>
        <v-list-tile-action>
          <v-icon>assignment</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Mes demandes</v-list-tile-title>
      </v-list-tile>

      <!-- Demander une signification -->
      <v-list-tile to="/acts/new">
        <v-list-tile-action>
          <v-icon>create_new_folder</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Demander une signification</v-list-tile-title>
      </v-list-tile>
    </v-list-group>

    <!-- Messages -->
    <v-list-tile to="/messages" v-if="current_user_id">
      <v-list-tile-action>
        <v-icon>all_inbox</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>Messageries</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>



    <v-divider />


    <v-list-tile :to="{ name: 'advocate', params: { id: current_user_id }}" v-if="current_user_id">
      <v-list-tile-action>
        <v-icon>person</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>{{ current_user_complete_name }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>


    <!-- Signin -->
    <v-list-tile to="/signin" v-if="!current_user_id">
      <v-list-tile-action>
        <v-icon>account_circle</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>Se connecter</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>


    <v-divider />

    <!-- Aide -->
    <v-list-tile to="/help">
      <v-list-tile-action>
        <v-icon>help</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>Aide</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>


  </v-list>
</v-navigation-drawer>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapState('logged_user', {
      current_user_id: state => state.id,
      current_user_complete_name: state => {
        return `${state.firstname} ${state.lastname}`
      }
    }),
  },
  // TODO computed here for logged user
  data() {
    return {
      drawer: true,
      mini: true,
      right: null,
    }
  }
}
</script>
