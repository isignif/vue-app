<template>
  <div>
    <Loader v-if="loading" />
    <v-layout row wrap  v-if="act && loading === false">
      <v-flex xs10 class="pa-3 white elevation-2">
        <div>
          <h1>Acte n° {{ act.id }}</h1>

          <v-layout row wrap>
            <v-flex xs-6>
              <v-list two-line dense>
                <v-subheader>Informations globales</v-subheader>
                <!-- person -->
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>update</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title title="Date de création">Crée le {{ act.formatedCreatedAt }}</v-list-tile-title>
                    <v-list-tile-sub-title
                      v-if="act.formatedCreatedAt != act.formatedUpdatedAt"
                    >Mis à jour le {{ act.formatedUpdatedAt }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>

            <v-flex xs-6>
              <v-list two-line dense>
                <v-subheader>Informations de facturation</v-subheader>
                <!-- person -->
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>receipt</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ act.billRecipient }}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="act.billSiret">SIRET: {{ act.billSiret }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ act.billAddress }}, {{ act.billZipCode }}, {{ act.billTown }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <!-- email -->
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>email</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ act.billEmail }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-if="act.billPhone">
                  <v-list-tile-action>
                    <v-icon>phone</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ act.billPhone }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>

          </v-layout>
          <v-layout row wrap>
            <v-flex xs-12>
              <h2>Significations</h2>
              <SignificationInformations
                  v-for="signification in significations"
                  :key="signification.id"
                  :signification="signification"
              />
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
      <v-flex xs2>
        <ActTimeline :actId="Number(this.$route.params.id)" />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Loader from "../components/Loader";
import { Act } from "../isignifClient/src/Act";
import { Signification } from "../isignifClient/src/Signification";
import ActTimeline from "../components/ActTimeline";
import SignificationInformations from "../components/SignificationInformations";

export default {
  name: "ActInformations",
  components: {
    Loader,
    ActTimeline,
    SignificationInformations
  },
  methods: {
    fetch() {
      Act.get(this.$route.params.id, this.$store.state.currentUser.token)
        .then(act =>  {
          this.act = act;
          return this.act.getSignifications();
        })
        .then(significations => this.significations = significations)
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
      act: null,
      significations: [],
    };
  }
};
</script>
