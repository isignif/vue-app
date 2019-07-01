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

        </v-flex>

      </v-layout>

      <v-btn :disabled="!valid" @click="submit" large color="primary">
        Se connecter
      </v-btn>


      <v-btn flat small secondary :to="{ name: 'signup'}">
        Créer un compte
      </v-btn>

      <v-btn flat small secondary>
        Mot de passe oublié
      </v-btn>


    </v-container>
  </v-form>

</v-card>
</template>
<script >
const axios = require('axios')
const api_url = require('../config').api_url

export default {
  data: () => ({
    valid: false,
    show_password: false,
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
          let userName = this.$store.getters['logged_user/completeName']


          this.$store.dispatch('snackbar/display', {
            color: 'success',
            message: `Bonjour ${userName}`
          })

          this.$router.push({ name: 'advocate', params: { id: user_data.id } });
        })
        .catch(error => {
          this.$store.dispatch('snackbar/display', {
            color: 'red',
            message: "Le couple iddentifiant / mot de passe n'est pas valide"
          })
        });
    }
  }
}
</script>
