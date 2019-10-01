<template>
  <v-container>
    <Loader v-if="loading" />
    <v-layout row wrap v-else>
      <v-flex xs10>
        <h1>Acte n° {{ act.id }}</h1>

        <v-expansion-panel>
          <!-- Informations -->
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Informations globales</div>
            </template>
            <v-card>
              <v-list two-line>
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
              </v-list>
            </v-card>
          </v-expansion-panel-content>
          <!-- Informations -->
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Informations de facturation</div>
            </template>
            <v-card>
              <v-list two-line>
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
            </v-card>
          </v-expansion-panel-content>
          <!-- Timeline -->
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Timeline</div>
            </template>
            <v-card pa-5>
              <v-container pa-5>

              </v-container>
            </v-card>
          </v-expansion-panel-content>
          <!-- Informations -->
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Fichiers</div>
            </template>
            <v-card>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <!-- Messagerie -->
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Messages</div>
            </template>
            <Messages :act_id="this.$route.params.id" :signification_id="this.signification_id" />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <h2>Informations</h2>

        <v-layout>
          <v-flex xs12 sm6 offset-sm1>
            <v-card>
              <v-card-title>
                <div>
                  <span class="grey--text">Number 10</span>
                  <br />
                  <span>Whitehaven Beach</span>
                  <br />
                  <span>Whitsunday Island, Whitsunday Islands</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-flex xs12 sm6 offset-sm1>
            <v-card>
              <v-card-title>
                <div>
                  <span class="grey--text">Number 10</span>
                  <br />
                  <span>Whitehaven Beach</span>
                  <br />
                  <span>Whitsunday Island, Whitsunday Islands</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
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
