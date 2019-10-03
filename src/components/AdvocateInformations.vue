<template>
  <div>
    <Loader v-if="loading" />

    <div v-else>
      <h1 class="pb-5">{{ firstname }} {{ lastname }}</h1>

      <v-card>
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ phone }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ email }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ address_1 }} {{ address_2 }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ town }} {{ zip_code }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </div>
  </div>
</template>
<script>
import Loader from "./Loader";
import UserRessource from '../models/User';

export default {
  name: "AdvocateInformations",
  props: ["id"],
  components: {
    Loader
  },
  methods: {
    fetch() {


      // console.log(new UserRessource())

      UserRessource().find(this.id)
                  .then((a) => console.log(a))

      this.$http
        .get(`advocates/${this.id}`, {
          headers: { Authorization: this.$store.state.currentUser.token }
        })
        .then(response => {
          let attributes = response.data.data.attributes;

          this.firstname = attributes.firstname;
          this.lastname = attributes.lastname;
          this.email = attributes.email;
          this.phone = attributes.phone;
          this.address_1 = attributes.address_1;
          this.address_2 = attributes.address_2;
          this.zip_code = attributes.zip_code;
          this.town = attributes.town;
          this.phone = attributes.phone;

          this.loading = false;
        })
        .catch(error => console.error(error));
    }
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      loading: true,
      firstname: null,
      lastname: null,
      email: null
    };
  }
};
</script>
