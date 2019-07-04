<template>
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
          <v-flex
            class="mb-5"
            height="200px"
          >
            <ActTypeSelect v-model="actTypeId" />
            <h2 v-if="significations.length == 1">Signification</h2>
            <h2 v-if="significations.length > 1">Significations</h2>
            <SignificationEdit
              :key="signification.timestamp"
              v-for="signification in significations"
              :timestamp="signification.timestamp"
              @delete="deleteSignification(signification.timestamp)"
              @change="updateSignification"
            />
            <p class="text-xs-right">
              <v-btn dark bottom right  @click.prevent="addSignification()">
                <v-icon>add</v-icon>
                ajouter une signification
              </v-btn>
            </p>
          </v-flex>

          <v-btn color="primary" @click="currentStep = 2" v-if="isFirstStepValid">Etape suivante</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn color="primary" @click="currentStep = 3">Continue</v-btn>
          <v-btn flat @click="currentStep = 1">précédent</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-flex class="mb-5" >
            <v-text-field v-model="reference" label="Référence de l'acte" required prepend-icon="label"></v-text-field>
            <v-text-field v-model="reference" label="Date limite souhaité" required prepend-icon="label"></v-text-field>
            <v-text-field v-model="reference" label="Acte urgent" required prepend-icon="label"></v-text-field>
          </v-flex>

          <v-btn color="primary" @click="currentStep = 1">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import ActTypeSelect from '../components/ActTypeSelect'
import SignificationEdit from '../components/SignificationEdit'

export default {
  name: 'ActNew',
  components: {
    SignificationEdit,
    ActTypeSelect
  },
  methods: {
    
    addSignification() {
      this.significations.push({
        name: null,
        town: null,
        id: null,
        timestamp: new Date().valueOf(),
      })
    },
    updateSignification(significationData) {
      const significationIndex = this.significations.findIndex(signification => signification.timestamp == significationData.timestamp)
      this.significations[significationIndex] = significationData
      this.checkValidityFirstStep()
    },
    checkValidityFirstStep() {
      this.isFirstStepValid = this.significations.filter(signification => !signification.isValid).length === 0
    },
    deleteSignification: function(timestamp) {
      this.significations = this.significations.filter(signification => signification.timestamp != timestamp)
    },
    reloadEstimation() {
      vue.actPrice = null;

      if (this.actTypeId === null) {
        return;
      }

      let json = {
        "price": 121.23
      }
      vue.actPrice = json.price

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
        return false 
      }

      const unvalidSignifications = this.significations.filter(signification => {
        return !signification.town || !signification.name
      })

      return unvalidSignifications.length === 0
    }
  },
  watch: {
    significations() {
      this.checkValidityFirstStep()
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Destinataire',
          align: 'left',
          sortable: false,
          value: 'zip_code',
        },
        {
          text: 'Ville',
          align: 'left',
          sortable: false,
          value: 'town'
        },
      ],
      significations: [ ],
      valid: false,
      reference: null,
      actTypeId: null,
      actPrice: null,
      currentStep: 1,
      isFirstStepValid: false,
    }
  }
}
</script>
