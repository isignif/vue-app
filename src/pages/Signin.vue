<template>
  <v-card>
    <Loader v-if="loading" />
    <v-form v-model="valid">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          </v-flex>

          <v-flex xs12 md6>
            <v-text-field
              v-model="password"
              label="Mot de passe"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-btn :disabled="!valid" @click="submit" large color="primary">Se connecter</v-btn>

        <v-btn flat small secondary :to="{ name: 'signup'}">Créer un compte</v-btn>

        <v-btn flat small secondary>Mot de passe oublié</v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>
<script >
import Loader from "../components/Loader";

export default {
  components: {
    Loader
  },
  data: () => ({
    loading: false,
    valid: false,
    showPassword: false,
    email: "",
    password: "",
    emailRules: [v => /.+@.+/.test(v) || "Le courriel n'est pas valide"]
  }),
  methods: {
    submit() {
      const params = {
        "user[email]": this.email,
        "user[password]": this.password
      };

      this.loading = true;

      this.$http
        .post(`tokens`, params)
        .then(response => {
          this.$store.dispatch("currentUser/setToken", response.data.token);

          let userName = this.$store.getters["currentUser/completeName"];
          let userId = this.$store.getters["currentUser/id"];

          this.$store.dispatch("snackbar/display", {
            color: "success",
            message: `Bonjour ${userName}`
          });

          this.$router.push({ name: "advocate", params: { id: userId } });
        })
        .catch(error => {
          console.error(error);
          this.$store.dispatch("snackbar/display", {
            color: "red",
            message: "Le couple iddentifiant / mot de passe n'est pas valide"
          });
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
