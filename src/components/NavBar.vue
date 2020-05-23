<template>
  <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless>
    <v-toolbar >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img v-if="mini" src="../assets/branding/favicon.png" height="100%" />
            <img v-else src="../assets/branding/logo.svg" height="100%" />
          </v-list-item-avatar>
          <v-list-item-action v-if="!mini">
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-toolbar>

    <!-- <v-divider></v-divider> -->

    <v-list class="pt-0">
      <!-- Page principale -->


      <!-- Dashboard -->
      <!-- <v-list-item to="/dashboard" v-if="id">
        <v-list-item-action>
          <v-icon>dashboard</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- Mes actes -->
      <v-list-item to="/acts" sub-item>
        <v-list-item-action>
          <v-icon>assignment</v-icon>
        </v-list-item-action>
        <v-list-item-title>Mes demandes</v-list-item-title>
      </v-list-item>

      <!-- Demander une signification -->
      <v-list-item :to="{ name: 'new_act' }">
        <v-list-item-action>
          <v-icon>create_new_folder</v-icon>
        </v-list-item-action>
        <v-list-item-title>Déposer un acte</v-list-item-title>
      </v-list-item>


      <v-divider />

      <v-list-item :to="{ name: 'advocate', params: { id: id }}" v-if="id">
        <v-list-item-action>
          <v-icon>person</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ completeName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Signin -->
      <v-list-item to="/signin" v-if="!id">
        <v-list-item-action>
          <v-icon>account_circle</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>Se connecter</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <!-- Aide -->
      <v-list-item to="/help">
        <v-list-item-action>
          <v-icon>help</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>Aide</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters("currentUser", ["id", "completeName"])
  },
  // TODO computed here for logged user
  data() {
    return {
      drawer: true,
      mini: true,
      right: null
    };
  }
};
</script>
