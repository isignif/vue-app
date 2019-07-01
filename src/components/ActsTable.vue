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
          <td>
            {{ props.item.attributes.reference }}
            
          </td>
          <td>{{ getActTypeName(props.item.attributes.act_type_id) }}</td>
          <td>{{ props.item.significations }}</td>
          <td>{{ getuserName(props.item.attributes.advocate_id) }}</td>
          <td>
          </td>
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

export default {
  name: 'ActsTable',
  props: {},
  components: {
    Loader
  },
  methods:{
    fetch(){
      this.$http.get(`acts`, { headers: { Authorization: this.$store.state.current_user.token } })
        .then(response => {
          this.acts = response.data.data
          this.actTypes = response.data.included.filter((included) => included.type == 'act_type')
          this.users = response.data.included.filter((included) => included.type == 'advocate' || included.type == 'bailiff')
          this.actHistories = response.data.included.filter((included) => included.type == 'act_histories')
          this.significations = response.data.included.filter((included) => included.type == 'act_histories')
          this.loading = false
        })
        .catch(error => console.error(error))
    },
    getActTypeName(actTypeId) {
      const actType = this.actTypes.find( actType => actType.id == actTypeId )

      if (actType) {
        return actType.attributes.name
      }
    },
    getuserName(userId) {
      const user = this.users.find( user => user.id == userId )

      if (user) {
        return `${user.attributes.firstname} ${user.attributes.lastname}` 
      }
    }
  },
  mounted(){
    this.fetch()
  },
  data() {
    return {
      loading: true,
      search: '',
      actTypes: [],
      advocates: [],
      significations: [],
      actHistories: [],
      bailiffs: [],
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
