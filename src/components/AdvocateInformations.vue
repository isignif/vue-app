<template>

  <v-card>
    <Loader v-if="loading" />

    <div v-else>
      <h2>{{ firstname }} {{ lastname }}</h2>

      <ul>
        <li><strong>Email</strong> {{ email }} </li>
      </ul>
    </div>

  </v-card>
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
      axios.get(`${api_url}/advocates/${this.id}`, { headers: { Authorization: this.$store.state.logged_user.persistence_token } })
        .then(response => {
          let attributes = response.data.data.attributes

          this.firstname = attributes.firstname
          this.lastname = attributes.lastname
          this.email = attributes.email

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
