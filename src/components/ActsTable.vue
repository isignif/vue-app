<template>
  <v-card>
    <Loader v-if="loading" />
    <div v-else>
      <v-card-title>
        Liste des actes
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="acts" class="elevation-1" :search="search">
        <v-progress-linear v-slot:progress color="primary" indeterminate></v-progress-linear>
        <template v-slot:items="props">
          <td>{{ props.item.attributes.reference }}</td>
          <td>{{ props.item.act_type }}</td>
          <td>{{ props.item.significations }}</td>
          <td>{{ props.item.advocate }}</td>
          <td>{{ props.item.bailiffs }}</td>
          <td>{{ props.item.step }}</td>
          <td>
            <v-btn flat small :to="{ name: 'act', params: { id: props.item.id }}">
              Afficher
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </div>
</v-card>
</template>

<script>
import Loader from './Loader'

const axios = require('axios')
const api_url = require('../config').api_url

export default {
  name: 'ActsTable',
  props: {},
  components: {
    Loader
  },
  methods:{
    fetch(){
      axios.get(`${api_url}/acts`, { headers: { Authorization: this.$store.state.logged_user.persistence_token } })
        .then(response => {
          this.acts = response.data.data

          this.loading = false
        })
        .catch(error => {
          // console.error(error)
        })
    }
  },
  mounted(){
    this.fetch()
  },
  data() {
    return {
      loading: true,
      search: '',
      headers: [{
          text: "Référence de l'acte",
          value: 'reference'
        },
        {
          text: "Dénomination de l'acte",
          value: 'act_type'
        },
        {
          text: 'Destinataires',
          value: 'significations'
        },
        {
          text: 'Correspondant',
          value: 'advocate'
        },
        {
          text: 'Huissier de justice ',
          value: 'bailiffs'
        },
        {
          text: 'Etape',
          value: 'step'
        },
        {
          text: 'Date de création',
          value: 'creation_date'
        }
      ],
      acts: []
    }
  }
}
</script>
