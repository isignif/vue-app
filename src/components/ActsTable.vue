<template>
  <v-card>
    <v-card-title>
      Liste des actes
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="acts"
      class="elevation-1"
      :search="search"
      :loading="loading"
    >
      <v-progress-linear v-slot:progress color="primary" indeterminate></v-progress-linear>
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <!-- Référence de l'acte -->
          <td>
            {{ props.item.name }}<br>
            <span class="grey--text">{{ props.item.getActType() }}</span>
          </td>
          <td>
            {{ countSignifications(props.item.id) ? `${countSignifications(props.item.id)} signification` : `${countSignifications(props.item.id)} significations` }}
          </td>
          <!-- Etape -->
          <td class="text-xs-center">
            <ActHistoryStep :step="props.item.currentStep" />
          </td>
          <!-- Date de création -->
          <td class="text-xs-right">
            <v-btn flat small :to="{ name: 'act', params: { id: props.item.id }}">
              Voir
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ActHistoryStep from "./ActHistoryStep";
import { Act } from '../isignifClient/src/Act';

export default {
  name: "ActsTable",
  props: {},
  components: {
    ActHistoryStep
  },
  methods: {
    fetch() {

      this.loading = true;

      Act.all(this.$store.state.currentUser.token)
      .then(acts => this.acts = acts)
      .catch(e => {
        this.$toast.error(`Une erreur est survenue. (${e.message})`);
        console.error(e);
        })
        .finally(() => this.loading = false);
    },
    countSignifications(actId) {
      return 666;
      // const actIdInt = parseInt(actId);

      // return this.significations
      //           .filter(signification => signification.attributes.act_id === actIdInt)
      //           .length;
    },
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      loading: true,
      search: "",
      actTypes: [],
      advocates: [],
      significations: [],
      actHistories: [],
      bailiffs: [],
      headers: [
        {
          text: "Référence de l'acte",
          value: "reference"
        },
        // {
        //   text: "Correspondant",
        //   value: "advocate"
        // },
        // {
        //   text: "Huissier de justice",
        //   value: "bailiffs"
        // },
        {
          text: "Etape",
          value: "step"
        }
        // {
        //   text: 'Date de création',
        //   value: 'creation_date'
        // }
      ],
      acts: []
    };
  }
};
</script>
