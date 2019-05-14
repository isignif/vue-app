<template>
<v-card>
  <v-form v-model="valid">
    <v-container>
      <v-layout>

        <v-flex xs12 md6>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-flex>

        <v-flex xs12 md6>
          <v-text-field v-model="password" label="Mot de passe" :type="show_password ? 'text' : 'password'" @click:append="show_password = !show_password" :append-icon="show_password ? 'visibility' : 'visibility_off'" required></v-text-field>
        </v-flex>

        <v-flex xs12 md6>
          <v-btn :disabled="!valid" @click="submit">
            Validate
          </v-btn>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
  <v-snackbar v-model="snackbar" bottom color="success">
    {{ snackbar_message }}
    <v-btn  flat @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</v-card>
</template>
<script>
const axios = require('axios')
const api_url = require('../config').api_url

import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    snackbar: false,
    valid: false,
    show_password: false,
    snackbar_message: '',
    email: '',
    password: '',
    emailRules: [
      v => /.+@.+/.test(v) || "Le courriel n'est pas valide"
    ]
  }),
  methods: {
    submit() {

      axios.post(`${api_url}/user_sessions`, {
          email: this.email,
          password: this.password,
        })
        .then(response => {
          let user_data = response.data.data
          this.$store.dispatch('logged_user/signin', user_data)
          this.snackbar = true
        })
        .catch(error => {
          this.$store.dispatch('logged_user/signin', 'failed')
          console.error(error)
        });

    }
  }
}
</script>
