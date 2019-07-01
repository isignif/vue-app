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
      const params = {
        "user[email]": this.email,
        "user[password]": this.password,
      }

      this.$http.post(`${api_url}/tokens`, params, {emulateJSON: true})
        .then(response => {
          this.$store.dispatch('current_user/setToken', response.data.token)

          let userName = this.$store.getters['current_user/completeName']
          let userId = this.$store.getters['current_user/id']

          this.$store.dispatch('snackbar/display', {
            color: 'success',
            message: `Bonjour ${userName}`
          })

          this.$router.push({ name: 'advocate', params: { id: userId } });
        })
        .catch(error => {
          console.error(error)
          this.$store.dispatch('snackbar/display', {
            color: 'red',
            message: "Le couple iddentifiant / mot de passe n'est pas valide"
          })
        });
    }
  }
}
</script>
