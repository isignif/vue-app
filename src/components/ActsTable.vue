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
            {{ getActName(props.item) }}<br>
            <span class="grey--text">{{ getActTypeName(props.item.attributes.act_type_id) }}</span>
          </td>
          <td>
            {{ countSignifications(props.item.id) ? `${countSignifications(props.item.id)} signification` : `${countSignifications(props.item.id)} significations` }}
          </td>
          <!-- Huissier de justice -->
          <!-- <td>
            <ul>
              <li :key="bailiffName" v-for="bailiffName in getBailiffsNames(props.item.id)">{{ bailiffName }}</li>
            </ul>
          </td>-->
          <!-- Etape -->
          <td class="text-xs-center">
            <ActHistoryStep :step="props.item.attributes.current_step" />
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
      <!-- dipslay bailiffs -->
      <!-- <template v-slot:expand="props">
        <v-card flat>
          <v-list>
            <template v-for="item in getBailiffsNames(props.item.id)">
              <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
              <v-list-tile :key="item" avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </template>-->
    </v-data-table>
  </v-card>
</template>

<script>
import ActHistoryStep from "./ActHistoryStep";

export default {
  name: "ActsTable",
  props: {},
  components: {
    ActHistoryStep
  },
  methods: {
    fetch() {
      this.$http
        .get(`acts`, {
          headers: { Authorization: this.$store.state.currentUser.token }
        })
        .then(response => {
          this.acts = response.data.data;
          this.actTypes = response.data.included.filter(
            included => included.type == "act_type"
          );
          this.users = response.data.included.filter(
            included =>
              included.type == "advocate" || included.type == "bailiff"
          );
          // this.actHistories = response.data.included.filter((included) => included.type == 'act_histories')
          this.significations = response.data.included.filter(
            included => included.type == "signification"
          );
          this.loading = false;
        })
        .catch(error => console.error(error));
    },
    getActName(act) {
      return act.attributes.reference || `Acte N°${act.id}`;
    },
    getActTypeName(actTypeId) {
      const actType = this.actTypes.find(actType => actType.id == actTypeId);

      if (!actType) {
        return "?";
      }

      const actTypeName = actType.attributes.name;
      // return actTypeName;
      const trunc = actTypeName.substring(0, 40);
      return trunc.length === actTypeName.length ? trunc : trunc + '...';
    },
    countSignifications(actId) {
      const actIdInt = parseInt(actId);

      return this.significations
                .filter(signification => signification.attributes.act_id === actIdInt)
                .length;
    },
    // getuserName(userId) {
    //   const userIdString = userId.toString();
    //   const user = this.users.find(user => user.id === userIdString);

    //   if (user) {
    //     return `${user.attributes.firstname} ${user.attributes.lastname}`;
    //   }

    //   return "?";
    // },
    getBailiffsNames(actId) {
      const actIdInt = parseInt(actId);

      const actBailiffIds = this.significations
        .filter(signification => signification.attributes.act_id === actIdInt)
        .map(signification => parseInt(signification.id));
      return this.users
        .filter(bailiff => actBailiffIds.indexOf(bailiff.id))
        .map(
          bailiff =>
            `${bailiff.attributes.firstname} ${bailiff.attributes.lastname}`
        );
    }
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
