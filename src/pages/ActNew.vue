<template>
  <v-container>
    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1">Création des significations</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="currentStep > 2" step="2">Ajout des fichiers</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Confirmation</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-flex>
            <ActTypeSelect v-model="actTypeId" />
            <h2 v-if="significations.length == 1">Signification</h2>
            <h2 v-if="significations.length > 1">Significations</h2>
            <SignificationNew
              :key="signification.timestamp"
              v-for="signification in significations"
              :timestamp="signification.timestamp"
              @delete="deleteSignification(signification.timestamp)"
              @change="updateSignification"
            />
            <p class="text-xs-right">
              <v-btn dark bottom right color="secondary" @click.prevent="addSignification()">
                <v-icon>add</v-icon>ajouter une signification
              </v-btn>
            </p>
            <p class="text-xs-right">
              <v-btn color="primary" @click="finishStep1" :disabled="!isFirstStepValid">Etape suivante</v-btn>
            </p>
          </v-flex>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-layout row wrap>
            <SignificationEdit
              :key="'SignificationEdit' + signification.id"
              v-for="signification in createdSignifications"
              :signification_id="signification.id"
              :act_id="actId"
              :name="signification.attributes.name"
            />
            <p class="text-xs-right">
              <v-btn flat @click="removeAct">Précédent</v-btn>
              <v-btn color="primary" @click="currentStep = 3">Etape suivante</v-btn>
            </p>
          </v-layout>
        </v-stepper-content>

      <v-stepper-content step="3">
        <v-flex class="mb-5">
          <v-text-field
            v-model="reference"
            label="Référence de l'acte"
            required
            prepend-icon="label"
          ></v-text-field>
          <v-text-field
            v-model="reference"
            label="Date limite souhaité"
            required
            prepend-icon="label"
          ></v-text-field>
          <v-checkbox v-model="express" label="Acte urgent" required prepend-icon="timer"></v-checkbox>
          <p class="text-xs-right">
            <v-btn flat @click="currentStep = 2">Précédent</v-btn>
            <v-btn color="primary" @click="finishStep3">Confirmer</v-btn>
          </p>
          <v-dialog v-model="displayFinalConfirmation" width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Confirmation de l'acte</v-card-title>
              <v-card-text>Vous êtes sur le point de confirmer votre acte. Vous vous engagez à vous acquiter des frais liés à cette prestation.</v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="confirmAct">J'accepte</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  </v-container>
</template>

<script>
import ActTypeSelect from "../components/ActTypeSelect";
import SignificationNew from "../components/SignificationNew";
import SignificationEdit from "../components/SignificationEdit";

export default {
  name: "ActNew",
  components: {
    SignificationNew,
    ActTypeSelect,
    SignificationEdit
  },
  methods: {
    addSignification() {
      this.significations.push({
        name: null,
        town: null,
        id: null,
        timestamp: new Date().valueOf()
      });
    },
    updateSignification(significationData) {
      const significationIndex = this.significations.findIndex(
        signification => signification.timestamp == significationData.timestamp
      );
      this.significations[significationIndex] = significationData;
      this.checkValidityFirstStep();
    },
    checkValidityFirstStep() {
      const hasInvalid = this.significations.some(
        signification => !signification.isValid
      );
      this.isFirstStepValid =
        this.actTypeId && this.significations.length > 0 && !hasInvalid;
    },
    deleteSignification: function(timestamp) {
      this.significations = this.significations.filter(
        signification => signification.timestamp != timestamp
      );
    },
    finishStep1: function() {
      const significations = this.significations.map(signification => {
        return {
          town_id: signification.townId,
          name: signification.name
        };
      });

      const parameters = {
        "act[act_type_id]": this.actTypeId,
        "act[reference]": this.reference,
        "act[significations]": significations
      };

      this.$http
        .post("acts", parameters, {
          headers: { Authorization: this.$store.state.currentUser.token }
        })
        .then(response => {
          const responseData = response.data;
          this.actId = responseData.data.id;
          this.createdSignifications = responseData.included.filter(
            inc => inc.type == "signification"
          );
          this.currentStep = 2;
        })
        .catch(error => console.error(error));
    },
    finishStep3: function() {
      const url = `acts/${this.actId}`;

      const headers = {
        headers: { Authorization: this.$store.state.currentUser.token }
      };

      const parameters = {
        "act[act_type_id]": this.actTypeId,
        "act[reference]": this.reference,
        "act[express]": this.express
      };

      this.$http
        .patch(url, parameters, headers)
        .then(() => {})
        .catch(error =>
          this.$store.dispatch(
            "snackbar/displayError",
            "Nous n'avons pas pu mettre à jour votre acte. :("
          )
        );

      this.displayFinalConfirmation = true;
    },
    confirmAct: function() {
      this.displayFinalConfirmation = false;

      const url = `acts/${this.actId}/confirm`;

      const headers = {
        headers: { Authorization: this.$store.state.currentUser.token }
      };

      this.$http
        .post(url, null, headers)
        .then(() => {
          this.displayFinalConfirmation = false;
          this.$router.push({ name: "act", params: { id: this.actId } });
          this.$store.dispatch(
            "snackbar/displaySuccess",
            "L'acte a été cré. Votre demande va être traitée prochainement?"
          );
        })
        .catch(error =>
          this.$store.dispatch("snackbar/displayError", error.message)
        );
    },
    removeAct: function() {
      const url = "acts/" + this.actId;
      this.$http
        .delete(url, {
          headers: { Authorization: this.$store.state.currentUser.token }
        })
        .then(() => {
          this.currentStep = 1;
        })
        .catch(error => console.error(error));
    },
    reloadEstimation() {
      // vue.actPrice = null;
      // if (this.actTypeId === null) {
      //   return;
      // }
      // let json = {
      //   price: 121.23
      // };
      // vue.actPrice = json.price;
      // $.ajax({
      //   url: '<%= Rails.application.routes.url_helpers.estimate_act_path %>',
      //   type: 'POST',
      //   dataType: 'json',
      //   data: {
      //     act: {
      //       act_type_id: this.actType.id,
      //       town_id: vue.towns.map(function(t){ return t.id })
      //     }
      //   },
      //   success: function(json) {
      //     vue.actPrice = json.price
      //   },
      //   errors: function(error) {
      //     alert(error)
      //   },
      // });
    },
    checkValidityStep() {
      if (this.significations.length === 0) {
        return false;
      }

      const unvalidSignifications = this.significations.filter(
        signification => {
          return !signification.town || !signification.name;
        }
      );

      return unvalidSignifications.length === 0;
    }
  },
  watch: {
    significations() {
      this.checkValidityFirstStep();
    }
  },
  data() {
    return {
      createdSignifications: [],
      express: false,
      significations: [
        // {
        //   name: 'toto',
        //   town: 1,
        //   id: 1,
        //   timestamp: 123,
        // },
        // {
        //   name: 'tata',
        //   town: 1,
        //   id: 1,
        //   timestamp: 124,
        // }
      ],
      actId: null,
      valid: false,
      reference: null,
      actTypeId: null,
      actPrice: null,
      currentStep: 1,
      isFirstStepValid: false,
      displayFinalConfirmation: false
    };
  }
};
</script>
<style scoped>
.v-stepper__header {
  box-shadow: none;
}
</style>