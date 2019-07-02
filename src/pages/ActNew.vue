<template>
  <v-card>
    <v-form v-model="valid">
      <v-container>
        <v-layout row wrap>

          <v-flex xs12>
            <h2>Informations principales</h2>
          </v-flex>

          <v-flex xs12>
            <label>Quel acte souhaitez-vous signifier?</label>
            <v-select v-model="actType" :options="actTypesOptions" label="name"></v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap v-if="actType">

          <v-flex xs12>
            <h2>Significations</h2>
          </v-flex>

          <v-flex xs12>
            <v-select :options="townsOptions" label="text" @search="onSearchTown" v-model="town"></v-select>
            <p class="text-xs-right">
              <v-btn @click.prevent="addSignification(town)" flat class="ma-0" v-if="town">
                <v-icon>add_circle_outline</v-icon>
                ajouter la signification
              </v-btn>
            </p>
          </v-flex>
        
        </v-layout>


        <v-layout row wrap v-if="actType && significations.length > 0">
          <v-flex xs12>
            <v-data-table :headers="headers" :items="significations" :hide-actions="true" class="elevation-1">
              <template v-slot:items="props">
                <td><v-text-field v-model="name" label="Destinataire" prepend-icon="place"></v-text-field></td>
                <td>{{ props.item.town }}</td>
                <td>
                  <v-icon small @click="deleteSignification(props.item.timestamp)">
                    delete
                  </v-icon>
                </td>
              </template>
              <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="warning" outline>
                  Ajoutez une ville (autant de fois qu'il y a de destinaires)
                </v-alert>
              </template>
            </v-data-table>
          </v-flex>

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
import vSelect from 'vue-select'

export default {
  name: 'ActNew',
  components: {
    vSelect
  },
  created: function() {
    this.onSearchTown('', null)
    this.onSearchActType('', null)
  },
  methods: {
    addSignification: function(town) {
      this.significations.push({
        town: town.text,
        id: town.id,
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
    onSearchActType: function(search, loading) {
      this.$http.get('act_types', { headers: { Authorization: this.$store.state.current_user.token } })
                .then( response => this.extractActTypeOptionsFromResponse(response.data) )
                .catch(error => console.error(error))
    },
    onSearchTown: function(search, loading) {
      if (loading) {
        loading(true);
      }
      this.townsOptions = [{
          "text": "Hostiaz (01110)",
          "id": 1342
        },
        {
          "text": "Sault brenaz (01150)",
          "id": 1331
        },
        {
          "text": "Chazey sur ain (01150)",
          "id": 1334
        },
        {
          "text": "Leaz (01200)",
          "id": 1221
        },
        {
          "text": "Brenaz (01260)",
          "id": 1102
        },
        {
          "text": "Chazey bons (01300)",
          "id": 1007
        },
        {
          "text": "Malafretaz (01340)",
          "id": 1042
        },
        {
          "text": "Outriaz (01430)",
          "id": 3014
        },
        {
          "text": "Seillonnaz (01470)",
          "id": 1325
        },
        {
          "text": "Ordonnaz (01510)",
          "id": 1268
        },
        {
          "text": "Bazoches sur vesles (02220)",
          "id": 3444
        },
        {
          "text": "Azy sur marne (02400)",
          "id": 2771
        },
        {
          "text": "Chazemais (03370)",
          "id": 7492
        },
        {
          "text": "Sazeret (03390)",
          "id": 27010
        },
        {
          "text": "Mazirat (03420)",
          "id": 27037
        },
        {
          "text": "Mazerier (03800)",
          "id": 7400
        },
        {
          "text": "Lazer (05300)",
          "id": 17946
        },
        {
          "text": "Coaraze (06390)",
          "id": 18021
        },
        {
          "text": "Chazeaux (07110)",
          "id": 18301
        },
        {
          "text": "Balazuc (07120)",
          "id": 18317
        },
        {
          "text": "Mazan l abbaye (07510)",
          "id": 28925
        },
        {
          "text": "Bazeilles (08140)",
          "id": 29217
        },
        {
          "text": "Mazerny (08430)",
          "id": 29166
        },
        {
          "text": "Les mazures (08500)",
          "id": 31532
        },
        {
          "text": "Cazaux (09120)",
          "id": 25489
        },
        {
          "text": "Cazavet (09160)",
          "id": 26845
        },
        {
          "text": "Contrazy (09230)",
          "id": 26977
        },
        {
          "text": "Mazeres (09270)",
          "id": 33539
        },
        {
          "text": "Le mas d azil (09290)",
          "id": 26907
        },
        {
          "text": "Daumazan sur arize (09350)",
          "id": 26904
        },
        {
          "text": "Cazenave serres et allens (09400)",
          "id": 26918
        },
        {
          "text": "Cazals des bayles (09500)",
          "id": 26847
        },
        {
          "text": "Aucazein (09800)",
          "id": 25441
        },
        {
          "text": "Bonac irazein (09800)",
          "id": 25450
        },
        {
          "text": "St nazaire d aude (11120)",
          "id": 11416
        },
        {
          "text": "Mazuby (11140)",
          "id": 11284
        },
        {
          "text": "Montazels (11190)",
          "id": 11235
        },
        {
          "text": "Paraza (11200)",
          "id": 11488
        },
        {
          "text": "Peyrefitte du razes (11230)",
          "id": 28510
        },
        {
          "text": "Mazerolles du razes (11240)",
          "id": 11523
        },
        {
          "text": "Bellegarde du razes (11240)",
          "id": 11525
        },
        {
          "text": "Fenouillet du razes (11240)",
          "id": 11528
        },
        {
          "text": "Donazac (11240)",
          "id": 11531
        },
        {
          "text": "Belveze du razes (11240)",
          "id": 11534
        },
        {
          "text": "Gramazie (11240)",
          "id": 11537
        },
        {
          "text": "Villebazy (11250)",
          "id": 11334
        },
        {
          "text": "Esperaza (11260)",
          "id": 9701
        },
        {
          "text": "Cazalrenoux (11270)",
          "id": 11359
        },
        {
          "text": "St couat du razes (11300)",
          "id": 11252
        },
        {
          "text": "Villarzel du razes (11300)",
          "id": 11253
        }
      ]

      if (loading) loading(false)

      // TODO: Activate CORS
      // let postRequest = {
      //   url: 'https://test.isignif.fr/towns/search',
      //   data: { term: search },
      //   method: 'POST'
      // }
      // axios(postRequest)
      //   .then(function(response) {
      //     vue.townsOptions = json
      //     vue.actPrice = null
      //   })
      //   .catch(function(error) {
      //     alert(error);
      //   })
      //   .then(function() {
      //     if (loading) loading(false)
      //   })


    },
    extractActTypeOptionsFromResponse: function(responseData) {
      this.actTypesOptions = responseData.data.map(actType => { 
        return {
          id: actType.id,
          name: actType.attributes.name,
        }
      })
    }
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
