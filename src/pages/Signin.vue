<template>
  <v-card class="pa-4 ma-auto mt-5" style="max-width: 500px">
    <Loader v-if="loading" />
    <v-form v-model="valid">
      <v-container>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        <br />
        <v-text-field
          v-model="password"
          label="Mot de passe"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          required
        ></v-text-field>

        <div class="text-xs-center mt-4">
          <v-btn :disabled="!valid" @click="submit" large color="primary">Se connecter</v-btn>
        </div>

        <div class="text-xs-center mt-4">
          <v-btn text small secondary :to="{ name: 'signup'}">Créer un compte</v-btn>
          <v-btn text small secondary>Mot de passe oublié ?</v-btn>
        </div>
      </v-container>
    </v-form>
  </v-card>
</template>
<script >
import Loader from "../components/Loader";
import { User } from 'isignif-client';

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
      this.loading = true;

      const user = new User();
      user.email = this.email;

      user
        .getToken(this.password)
        .then(token => {
          this.$store.dispatch("currentUser/setToken", token);

          let userName = this.$store.getters["currentUser/completeName"];
          let userId = this.$store.getters["currentUser/id"];

          this.$toast.success(`Bonjour ${userName}`);
          this.$router.push({ name: "advocate", params: { id: userId } });
        })
        .catch(error => {
          this.$toast.error(
            "Le couple iddentifiant / mot de passe n'est pas valide"
          );
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
