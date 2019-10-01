<template>
  <v-container>
    <Loader v-if="loading" />
    <v-layout row wrap v-else>
      <v-flex xs10>
        <v-container>
          <h1>Acte n° {{ act.id }}</h1>


          <v-list two-line>
            <v-subheader inset>Informations globales</v-subheader>
            <!-- person -->
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="primary">update</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title title="Date de création">Crée le {{ act.formatedCreatedAt }}</v-list-tile-title>
                <v-list-tile-sub-title
                  v-if="act.createdAt != act.updatedAt"
                >Mis à jour le {{ act.formatedUpdatedAt }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-subheader inset>Informations de facturation</v-subheader>
            <!-- person -->
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="primary">person</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ act.billRecipient }}</v-list-tile-title>
                <v-list-tile-sub-title v-if="bill_siret">SIRET: {{ act.billSiret }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <!-- place -->
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="primary">place</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ act.billAddress }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ act.billZipCode }}, {{ act.billTown }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <!-- email -->
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="primary">email</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ act.billEmail }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="bill_phone">
              <v-list-tile-action>
                <v-icon color="primary">phone</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ act.billPhone }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-container>
      </v-flex>
      <v-flex xs2>
        <ActTimeline :actId="Number(this.$route.params.id)" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Loader from "../components/Loader";
import { Act } from "../models/Act";
import ActTimeline from "../components/ActTimeline";
import Messages from "../components/Messages";

export default {
  name: "ActInformations",
  components: {
    Loader,
    ActTimeline,
    Messages
  },
  methods: {
    fetch() {
      this.$http
        .get(`acts/${this.$route.params.id}`, {
          headers: {
            Authorization: this.$store.state.currentUser.token
          }
        })
        .then(response => {
          this.act = new Act(response.data.data);
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
      act: null
    };
  }
};
</script>
