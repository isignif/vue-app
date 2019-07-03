<template>
  <v-card>
    <v-form v-model="valid">
      <v-container>
        <v-layout row wrap>

          <v-flex xs12>
            <ActTypeSelect />
          </v-flex>

          <v-flex xs12>
            <h2 v-if="significations.length == 1">Signification</h2>
            <h2 v-if="significations.length > 1">Significations</h2>
            <SignificationEdit :key="signification.timestamp" v-for="signification in significations" />
          </v-flex>

          <v-btn
              absolute
              dark
              fab
              bottom
              right
              color="pink"
              @click.prevent="addSignification()"
            >
              <v-icon>add</v-icon>
            </v-btn>

        </v-layout>

       


        <v-layout row wrap v-if="actType && significations.length > 0">
         

          <v-flex xs12>
            <h2>Informations secondaires</h2>
          </v-flex>

          <v-flex xs12>
            <v-text-field v-model="reference" label="Référence de l'acte" required prepend-icon="label"></v-text-field>
            <v-text-field v-model="reference" label="Date limite souhaité" required prepend-icon="label"></v-text-field>
            <v-text-field v-model="reference" label="Acte urgent" required prepend-icon="label"></v-text-field>
          </v-flex>

          <v-flex xs12 class="text-xs-right">
            <v-btn large color="primary">
              <v-icon>add</v-icon>
              Créer la signification
            </v-btn>
          </v-flex>

        </v-layout>


      </v-container>
    </v-form>

    
    
  </v-card>
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
    addSignification: function() {
      this.significations.push({
        town: null,
        id: null,
        timestamp: new Date().valueOf(),
      })
    },
    deleteSignification: function(timestamp) {
      this.significations = this.significations.filter(signification => signification.timestamp != timestamp)
    },
    reloadEstimation: function() {
      vue.actPrice = null;

      if (this.actType === null) {
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
    
    
  },
  data: function () {
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
      town: null,
      // towns: [],
      townsOptions: [],
      actTypesOptions: [
        { name: "Acte de saisie conservatoire sur les biens meubles corporels" },
        { name: "Acte de saisie conservatoire sur les biens meubles corporels" }

      ],
      reference: null,
      actType: null,
      actPrice: null,
    }
  }
}
</script>
