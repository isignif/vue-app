<template>

  <div>
    <Loader v-if="loading" />

    <v-container v-else>

      <h1>{{ firstname }} {{ lastname }}</h1>

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

    </v-container>

  </div>
</template>
<script>
import Loader from './Loader'

const axios = require('axios')
const api_url = require('../config').api_url

export default {
  name: 'AdvocateInformations',
  props: ['id'],
  components: {
    Loader
  },
  methods:{
    fetch(){
      axios.get(`${api_url}/advocates/${this.id}`, { headers: { Authorization: this.$store.state.current_user.token } })
        .then(response => {
          let attributes = response.data.data.attributes

          this.firstname = attributes.firstname
          this.lastname = attributes.lastname
          this.email = attributes.email
          this.phone = attributes.phone
          this.address_1 = attributes.address_1
          this.address_2 = attributes.address_2
          this.zip_code = attributes.zip_code
          this.town = attributes.town
          this.phone = attributes.phone

          this.loading = false
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted(){
    this.fetch()
  },
  data() {
    return {
      loading: true,
      firstname: null,
      lastname: null,
      email: null,
    }
  }
}
</script>
