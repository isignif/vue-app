<template>
  <div>
    <Loader v-if="loading" />

    <div v-if="user && loading === false">
      <h1 class="pb-5">{{ user.firstName }} {{ user.lastName }}</h1>

      <v-card>
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ user.phone }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ user.email }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ user.address1 }} {{ user.address2 }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ user.town }} {{ user.zipCode }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </div>
  </div>
</template>
<script>
import Loader from "./Loader";
import { User } from '../isignifClient/src/User';

export default {
  name: "AdvocateInformations",
  props: ["id"],
  components: {
    Loader
  },
  methods: {
    fetch() {
      User.get(this.id, this.$store.state.currentUser.token)
          .then(user => this.user = user)
          .catch(error => console.error(error))
          .finally(() => this.loading = false);
    }
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      loading: true,
      user: null,
    };
  }
};
</script>
