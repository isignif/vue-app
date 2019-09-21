<template>
  <v-timeline>
    <!-- TODO -->
    <v-timeline-item v-for="actHistory in this.actHistories" :key="actHistory.id" color="primary">
      <template v-slot:opposite>
        <span>{{ getAuthorName(actHistory) }}</span>
      </template>
      <v-card class="elevation-1">
        <v-card-title>
          <strong>
            {{ getHumanReadableStep(actHistory) }}
          </strong>
          <span v-if="getSignificationTitle(actHistory)">
            @ {{ getSignificationTitle(actHistory) }}
          </span>
        </v-card-title>
        <v-card-text>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script lang="ts">
import Vue from "vue";

import { User, IUserDefinition } from '../models/User';
import { ActHistory, IActHistoryDefinition } from '../models/ActHistory';


export default Vue.extend({
  name: "ActTimeline",
  props: {
    actId: Number
  },
  data: () => ({
    actHistories: [],
    included: []
  }),
  methods: {
    getHumanReadableStep(actHistory: IActHistoryDefinition): string {
      return (new ActHistory(actHistory)).humanReadableStep;
    },
    getAuthorName(actHistory: IActHistoryDefinition): string {
      const userId = actHistory.attributes.user_id;

      const userDefinition: IUserDefinition = this.included.find((s: IUserDefinition) => {
        return s.id == userId && s.type === 'user';
      });

      const user = new User(userDefinition);

      return user.completeName;
    },
    getSignificationTitle(actHistory: IActHistoryDefinition) {
      const significationId = actHistory.attributes.signification_id;
      const signification = this.included.find(s => s.id == significationId && s.type === 'signification');

      return signification ? signification.attributes.name : null;
    },
    async fetch() {
      this.$http
        .get(`acts/${this.actId}/act_histories`, {
          headers: { Authorization: this.$store.state.currentUser.token }
        })
        .then(res => {
          this.actHistories = res.data.data;
          this.included = res.data.included;
        })
        .catch(e =>
          this.$toast.error(`Une erreur est survenue. (${e.message})`)
        );
    }
  },
  mounted() {
    this.fetch();
  }
});
</script>