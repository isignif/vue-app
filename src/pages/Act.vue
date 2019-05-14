<template>
<div>
  <template>
    <div>
      <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
      <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>
    </div>
  </template>

  <Loader v-if="loading" />

  <v-container v-else>

    <h1>Acte n° {{ id }}</h1>

    <v-expansion-panel>
      <!-- Informations -->
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Informations globales</div>
        </template>
        <v-card>
          <v-list two-line>

            <!-- person -->
            <v-list-tile @click="">

              <v-list-tile-action>
                <v-icon color="primary">update</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title title="Date de création">Crée le {{ created_at }}</v-list-tile-title>
                <v-list-tile-sub-title v-if="created_at != updated_at">Mis à jour le {{ updated_at }}</v-list-tile-sub-title>
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
            <v-list-tile @click="">

              <v-list-tile-action>
                <v-icon color="primary">person</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ bill_recipient }}</v-list-tile-title>
                <v-list-tile-sub-title v-if="bill_siret">SIRET: {{ bill_siret }}</v-list-tile-sub-title>
              </v-list-tile-content>

            </v-list-tile>

            <!-- place -->
            <v-list-tile @click="">

              <v-list-tile-action>
                <v-icon color="primary">place</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ bill_address }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ bill_zip_code }}, {{ bill_town }}</v-list-tile-sub-title>
              </v-list-tile-content>

            </v-list-tile>

            <!-- email -->
            <v-list-tile @click="">

              <v-list-tile-action>
                <v-icon color="primary">email</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ bill_email }}</v-list-tile-title>
              </v-list-tile-content>

            </v-list-tile>

            <v-list-tile @click="" v-if="bill_phone">

              <v-list-tile-action>
                <v-icon color="primary">phone</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ bill_phone }}</v-list-tile-title>
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
          <v-timeline>
            <v-timeline-item v-for="n in 4" :key="n" color="primary" >
              <template v-slot:opposite>
                <span>Tus eu perfecto</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="headline">Lorem ipsum</v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
          </v-container>
        </v-card>
      </v-expansion-panel-content>
      <!-- Informations -->
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Fichiers</div>
        </template>
        <v-card>
          <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.</v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <h2>Informations</h2>

    <v-layout>
      <v-flex xs12 sm6 offset-sm1>
        <v-card>
          <v-card-title>
            <div>
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
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
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
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

  </v-container>

</div>
</template>
<script>
import Loader from '../components/Loader'

const axios = require('axios')
const api_url = require('../config').api_url

export default {
  name: 'ActInformations',
  components: {
    Loader
  },
  methods: {
    fetch() {
      axios.get(`${api_url}/acts/${this.$route.params.id}`, {
          headers: {
            Authorization: this.$store.state.logged_user.persistence_token
          }
        })
        .then(response => {
          let jsonData = response.data.data
          let attributes = jsonData.attributes

          this.id = jsonData.id
          this.firstname = attributes.firstname
          this.lastname = attributes.lastname
          this.email = attributes.email
          this.phone = attributes.phone
          this.address_1 = attributes.address_1
          this.address_2 = attributes.address_2
          this.zip_code = attributes.zip_code
          this.town = attributes.town
          this.phone = attributes.phone

          this.bill_recipient = attributes.bill_recipient
          this.bill_siret = attributes.bill_siret
          this.bill_address = attributes.bill_address
          this.bill_zip_code = attributes.bill_zip_code
          this.bill_town = attributes.bill_town
          this.bill_email = attributes.bill_email
          this.bill_phone = attributes.bill_phone

          this.created_at = attributes.created_at
          this.updated_at = attributes.updated_at

          this.loading = false
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.fetch()
  },
  data() {
    return {
      loading: true,
      id: null,
      firstname: null,
      lastname: null,
      email: null,

      bill_recipient: null,
      bill_siret: null,
      bill_address: null,
      bill_zip_code: null,
      bill_town: null,
      bill_email: null,
      bill_phone: null,
    }
  }
}
</script>
