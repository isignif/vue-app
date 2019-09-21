<template>
  <v-timeline>
    <!-- TODO -->
    <v-timeline-item v-for="actHistory in this.actHistories" :key="actHistory.id" color="primary">
      <template v-slot:opposite>
        <span>{{ getAuthorDate(actHistory) }}</span>
      </template>
      <v-card class="elevation-2">
        <v-card-title v-if="getSignificationTitle(actHistory)">
          {{ getSignificationTitle(actHistory) }}
        </v-card-title>
        <v-card-text>
          {{ actHistory.attributes.step }}
          
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script lang="ts">
import Vue from "vue";

import { User, IUserDefintion } from '../models/User';


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
    getAuthorDate(actHistory): string {
      const userId = actHistory.attributes.user_id;

      const userDefinition: IUserDefintion = this.included.find((s: IUserDefintion) => {
        return s.id == userId && s.type === 'user';
      });

      const user = new User(userDefinition);

      return user.completeName;
    },
    getSignificationTitle(actHistory) {
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