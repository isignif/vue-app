<template>
  <v-container>
    <v-card>
      <v-form v-model="valid">
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-radio-group v-model="type" required :rules="requiredRules" row>
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
              <v-text-field v-model="firstname" label="Prénom" required prepend-icon="person" :rules="requiredRules"></v-text-field>
            </v-flex>

            <v-flex xs12 md6 v-if="email">
              <v-text-field v-model="lastname" label="Nom" required :rules="requiredRules"></v-text-field>
            </v-flex>

            <v-flex :class="password ? 'xs12 md6' : 'xs12'">
              <v-text-field
                v-model="password"
                label="Mot de passe"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                required
                :rules="requiredRules"
                prepend-icon="lock"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                v-model="password_confirmation"
                label="ConfirmationMot de passe"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :count="6"
                required
                :rules="requiredRules"
                v-if="password"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field v-model="address1" label="Addresse" prepend-icon="place" required :rules="requiredRules"></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="address2"
                label="Complément d'adresse"
                prepend-icon="-"
                v-if="address1"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6 v-if="address1">
              <v-text-field v-model="town" label="Ville" prepend-icon="location_city" required :rules="requiredRules"></v-text-field>
            </v-flex>

            <v-flex xs12 md6 v-if="address1">
              <v-text-field v-model="zipCode" label="Code postal" prepend-icon="-" required :rules="requiredRules"></v-text-field>
            </v-flex>

            <v-flex xs12 d-flex v-if="type == 'bailiff'">
              <v-select
                :items="cometence_areas"
                label="Zone de compétence"
                prepend-icon="gavel"
                required
              ></v-select>
            </v-flex>

            <v-flex :class="companyName ? 'xs12 md6' : 'xs12'">
              <v-text-field
                v-model="companyName"
                label="Raison sociale"
                prepend-icon="store_mall_directory"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6 v-if="companyName">
              <v-text-field v-model="siret" label="N° SIRET" prepend-icon="-"></v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field v-model="phone" label="Téléphonne" prepend-icon="phone"></v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field v-model="sponsorship_code" label="Code de parrainage" prepend-icon="face"></v-text-field>
            </v-flex>
          </v-layout>

          <v-btn :disabled="!valid" @click="submit" large color="primary">Créer son compte</v-btn>

          <v-btn flat small :to="{ name: 'signin'}">J'ai déjà un compte</v-btn>

          <v-btn flat small secondary>Mot de passe oublié</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>
<script >
export default {
  data: () => ({
    valid: false,
    showPassword: false,
    type: "",
    email: "",
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    zipCode: "",
    town: "",
    password: "",
    password_confirmation: "",
    siret: "",
    companyName: "",
    cometence_areas: [],
    phone: "",
    emailRules: [v => /.+@.+/.test(v) || "Le courriel n'est pas valide"],
    requiredRules: [(v) => !!v || 'Ce champ est obligatoire'],
  }),
  methods: {
    submit() {
      let apiController = this.type == "advocate" ? "advocates" : "bailiffs";
      this.$http
        .post(apiController, {
          advocate: {
            email: this.email,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            address_1: this.address1,
            address_2: this.address2,
            zip_code: this.zipCode,
            town: this.town,
            siret: this.siret,
            company_name: this.companyName
          }
        })
        .then(response => {
          this.$toast.success(`Votre compte a été crée. Un email de confirmation vous a été envoyé.`);
          this.$router.push({ name: 'home' });
        })
        .catch(error => {
          console.error(error);
          this.$toast.error(`Une erreur est survenue. (${error.message})`);
        });
    }
  }
};
</script>
