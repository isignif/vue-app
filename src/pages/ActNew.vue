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
            <ActTypeSelect v-model="act.actTypeId" />
            <h2 v-if="significations.length == 1">Signification</h2>
            <h2 v-if="significations.length > 1">Significations</h2>
            <SignificationNew
              :key="i"
              v-for="(signification, i) in significations"
              @delete="removeSignification(signification)"
              @name-changed="(n) => signification.name = n"
              @town-changed="(n) => signification.townId = n"
            />
            <p class="text-xs-right">
              <v-btn dark bottom right color="secondary" @click.prevent="addSignification()">
                <v-icon>add</v-icon>ajouter une signification
              </v-btn>
            </p>
            <p class="text-xs-right">
              <v-btn color="primary" @click="finishStep1">Etape suivante</v-btn>
            </p>
          </v-flex>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-layout row wrap>
            <ActFilesTable
              v-if="act.id"
              :actId="act.id"
            />
            <p class="text-xs-right">
              <v-btn text @click="removeAct">Précédent</v-btn>
              <v-btn color="primary" @click="currentStep = 3">Etape suivante</v-btn>
            </p>
          </v-layout>
        </v-stepper-content>

      <v-stepper-content step="3">
        <v-flex class="mb-5">
          <v-text-field
            v-model="act.reference"
            label="Référence de l'acte"
            required
            prepend-icon="label"
          ></v-text-field>
          <v-text-field
            v-model="act.reference"
            label="Date limite souhaité"
            required
            prepend-icon="label"
          ></v-text-field>
          <v-checkbox v-model="act.express" label="Acte urgent" required prepend-icon="timer"></v-checkbox>
          <p class="text-xs-right">
            <v-btn text @click="currentStep = 2">Précédent</v-btn>
            <v-btn color="primary" @click="finishStep3">Confirmer</v-btn>
          </p>
          <v-dialog v-model="displayFinalConfirmation" width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Confirmation de l'acte</v-card-title>
              <v-card-text>Vous êtes sur le point de confirmer votre acte. Vous vous engagez à vous acquiter des frais liés à cette prestation.</v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="confirmAct">J'accepte</v-btn>
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
import { Act, Signification } from 'isignif-client';
import ActTypeSelect from "../components/ActTypeSelect";
import SignificationNew from "../components/SignificationNew";
import ActFilesTable from "../components/ActFilesTable";

export default {
  name: "ActNew",
  components: {
    SignificationNew,
    ActTypeSelect,
    ActFilesTable
  },
  methods: {
    addSignification() {
      this.significations.push(new Signification());
    },
    deleteSignification: function(timestamp) {
      this.significations = this.significations.filter(
        signification => signification.timestamp != timestamp
      );
    },
    finishStep1: function() {
      if (!this.act.actTypeId) {
        return this.$toast.error("Vous n'avez pas renseigné le type d'acte à signifier.");
      }
      if (this.significations.length === 0) {
        return this.$toast.error('Cet acte ne possède pas de significations.')
      }
      if (this.significations.some(s => !s.name || !s.townId)) {
        return this.$toast.error('Cet acte possède des significations incomplètes.')
      }

      this.act.save()
        .then(() => {
          const saves = this.significations.map((signification) => {
            signification.actId = this.act.id;
            signification.token = this.act.token;
            return signification.save();
          });

          return Promise.all(saves);
        })
        .catch(error => {
          console.error(error);
          this.$toast.error("Une erreur est survenue lors de la création de l'acte.");
        })
        .then(() => this.currentStep = 2)
        .catch(error => {
          console.error(error);
          this.$toast.error("Une erreur est survenue lors de la création des significations.");
        });
    },
    finishStep3: function() {
      // const url = `acts/${this.actId}`;

      // const headers = {
      //   headers: { Authorization: this.$store.state.currentUser.token }
      // };

      // const parameters = {
      //   "act[act_type_id]": this.actTypeId,
      //   "act[reference]": this.reference,
      //   "act[express]": this.express
      // };

      // this.$http
      //   .patch(url, parameters, headers)
      //   .then(() => {})
      //   .catch(error =>
      //     this.$toast.error("Nous n'avons pas pu mettre à jour votre acte. :(")
      //   );

      // this.displayFinalConfirmation = true;
    },
    confirmAct: function() {
      this.displayFinalConfirmation = false;

      act.confirm()
        .then(() => {
          this.displayFinalConfirmation = false;
          this.$router.push({ name: "act", params: { id: this.actId } });
          this.$toast.success("L'acte a été cré. Votre demande va être traitée prochainement?");
        })
        .catch(error => this.$toast.error(error.message));
    },
    removeAct: function() {
      this.act.remove()
        .then(() => {
          this.currentStep = 1;
          this.significations.forEach(s => s.id = undefined);
        })
        .catch(error => console.error(error));
    },
    removeSignification: function (signification) {
      const index = this.significations.findIndex((s) => {
        return s.name == signification.name && s.townId == signification.townId
      });

      this.significations.splice(index, 1);

      if (signification.id) {
        signification.remove();
      }
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
  data() {
    return {
      createdSignifications: [],
      significations: [],
      valid: false,
      act: new Act,
      actPrice: null,
      currentStep: 1,
      isFirstStepValid: false,
      displayFinalConfirmation: false
    };
  },
  mounted() {
    this.act.token = this.$store.state.currentUser.token;
  }
};
</script>
<style scoped>
.v-stepper__header {
  box-shadow: none;
}
</style>