<template>
  <v-layout fluid align-center row wrap>
    <!-- TODO -->
    <v-flex
        xs12
        pa-2
        v-for="actHistory in this.actHistories"
        :key="actHistory.id"
        >
      <v-card xs12
        :colora="getStepColor(actHistory)" flat
        class="text-xs-right"
      >
        <v-card-title primary-title class="headline pb-0">{{ getHumanReadableStep(actHistory) }}</v-card-title>
        <v-card-text class="pt-0">
          {{ getAuthorName(actHistory) }}
          <span
            v-if="getSignificationTitle(actHistory)"
          >@ {{ getSignificationTitle(actHistory) }}</span>

          <span class="grey--text">{{ getActHistoryDate(actHistory) }}</span>


        </v-card-text>
        <!-- <template v-slot:icon>
          <v-avatar>
            <img src="http://i.pravatar.cc/64">
          </v-avatar>
        </template>-->
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import Vue from "vue";

import { User, IUserDefinition } from "../models/User";
import { ActHistory, IActHistoryDefinition } from "../models/ActHistory";
import { HttpResponse } from "vue-resource/types/vue_resource";

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
    getStepColor(actHistory: IActHistoryDefinition): string {
      return new ActHistory(actHistory).color;
    },
    getHumanReadableStep(actHistory: IActHistoryDefinition): string {
      return new ActHistory(actHistory).humanReadableStep;
    },
    getActHistoryDate(actHistory: IActHistoryDefinition): string {
      return new ActHistory(actHistory).formatedCreatedAt;
    },
    getAuthorName(actHistory: IActHistoryDefinition): string {
      const userId = actHistory.attributes.user_id;

      const userDefinition: IUserDefinition = this.included.find(
        (s: IUserDefinition) => {
          return s.id == userId && s.type === "user";
        }
      );

      const user = new User(userDefinition);

      return user.completeName;
    },
    getSignificationTitle(actHistory: IActHistoryDefinition) {
      const significationId = actHistory.attributes.signification_id;
      const signification = this.included.find(
        s => s.id == significationId && s.type === "signification"
      );

      return signification ? signification.attributes.name : null;
    },
    async fetch() {
      (this.$http.get(`acts/${this.actId}/act_histories`, {
        headers: { Authorization: this.$store.state.currentUser.token }
      }) as Promise<HttpResponse>)
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