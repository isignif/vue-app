<template>
  <v-card>
    <v-form v-model="valid">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-radio-group v-model="type" row>
              <v-radio label="Avocat" value="advocate"></v-radio>
              <v-radio label="Huissier de justice" value="bailiff"></v-radio>
            </v-radio-group>
          </v-flex>

          <v-flex xs12 md12 sm12>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              prepend-icon="email"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 md6 v-if="email">
            <v-text-field v-model="firstname" label="Prénom" required prepend-icon="person"></v-text-field>
          </v-flex>

          <v-flex xs12 md6 v-if="email">
            <v-text-field v-model="lastname" label="Nom" required></v-text-field>
          </v-flex>

          <v-flex :class="password ? 'xs12 md6' : 'xs12'">
            <v-text-field
              v-model="password"
              label="Mot de passe"
              :type="show_password ? 'text' : 'password'"
              @click:append="show_password = !show_password"
              :append-icon="show_password ? 'visibility' : 'visibility_off'"
              required
              prepend-icon="lock"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 md6>
            <v-text-field
              v-model="password_confirmation"
              label="ConfirmationMot de passe"
              :type="show_password ? 'text' : 'password'"
              @click:append="show_password = !show_password"
              :append-icon="show_password ? 'visibility' : 'visibility_off'"
              :count="6"
              required
              v-if="password"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field v-model="address_1" label="Addresse" prepend-icon="place" required></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="address_2"
              label="Complément d'adresse"
              prepend-icon="-"
              v-if="address_1"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 md6 v-if="address_1">
            <v-text-field v-model="town" label="Ville" prepend-icon="location_city" required></v-text-field>
          </v-flex>

          <v-flex xs12 md6 v-if="address_1">
            <v-text-field v-model="zip_code" label="Code postal" prepend-icon="-" required></v-text-field>
          </v-flex>

          <v-flex xs12 d-flex v-if="type == 'bailiff'">
            <v-select
              :items="cometence_areas"
              label="Zone de compétence"
              prepend-icon="gavel"
              required
            ></v-select>
          </v-flex>

          <v-flex :class="company_name ? 'xs12 md6' : 'xs12'">
            <v-text-field
              v-model="company_name"
              label="Raison sociale"
              prepend-icon="store_mall_directory"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12 md6 v-if="company_name">
            <v-text-field v-model="siret" label="N° SIRET" prepend-icon="-"></v-text-field>
          </v-flex>

          <v-flex xs12 md6>
            <v-text-field v-model="phone" label="Téléphonne" prepend-icon="phone"></v-text-field>
          </v-flex>

          <v-flex xs12 md6>
            <v-text-field v-model="sponsorship_code" label="Code de parrainage" prepend-icon="face"></v-text-field>
          </v-flex>
        </v-layout>

        <v-btn :disabled="!valid" @click="submit" large color="primary">Se connecter</v-btn>

        <v-btn flat small :to="{ name: 'signin'}">J'ai déjà un compte</v-btn>

        <v-btn flat small secondary>Mot de passe oublié</v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>
<script >
export default {
  data: () => ({
    valid: false,
    show_password: false,
    type: "",
    email: "",
    firstname: "",
    lastname: "",
    address_1: "",
    address_2: "",
    zip_code: "",
    town: "",
    password: "",
    password_confirmation: "",
    siret: "",
    company_name: "",
    cometence_areas: [],
    phone: "",
    emailRules: [v => /.+@.+/.test(v) || "Le courriel n'est pas valide"]
  }),
  methods: {
    submit() {
      // TODO
      // let apiController = this.type == "advocate" ? "advocates" : "bailiffs";
      // this.$http
      //   .post(`${api_url}/${apiController}`, {
      //     advocate: {
      //       email: this.email,
      //       password: this.password,
      //       firstname: this.firstname,
      //       lastname: this.lastname,
      //       address_1: this.address_1,
      //       address_2: this.address_2,
      //       zip_code: this.zip_code,
      //       town: this.town,
      //       siret: this.siret,
      //       company_name: this.company_name
      //     }
      //   })
      //   .then(response => {
      //     // let user_data = response.data.data
      //     // this.$store.dispatch('current_user/signin', user_data)
      //     // let userName = this.$store.getters['current_user/completeName']
      //     // TODO
      //     console.log(response);
      //     this.$store.dispatch("snackbar/display", {
      //       color: "success",
      //       message: `La demande a été transmise`
      //     });
      //     // this.$router.push({ name: 'advocate', params: { id: user_data.id } });
      //   })
      //   .catch(error => {
      //     console.error(error);
      //     this.$store.dispatch("snackbar/display", {
      //       color: "red",
      //       message: "Une erreur est survenue."
      //     });
      //   });
    }
  }
};
</script>
