<template>
  <v-layout fluid align-center row wrap>
    <!-- TODO -->
    <v-flex
        xs12
        pa-2
        v-for="actHistory in this.actHistories"
        :key="actHistory.id"
        >
        <ActHistoryCard :actHistory="actHistory" />
      <!-- <v-card xs12
        :colora="actHistory.color"
        flat
        class="text-xs-right"
      >
        <v-card-title primary-title class="headline pb-0">{{ actHistory.humanReadableStep }}</v-card-title>
        <v-card-text class="pt-0">
          {{ actHistory.user ? actHistory.user.completeName : '???' }}
          <span>@ {{ actHistory.signification }}</span>
          <span class="grey--text">{{ actHistory.formatedCreatedAt }}</span>
        </v-card-text>
      </v-card> -->
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import Vue from "vue";

import { User } from "../isignifClient/src/User";
import ActHistoryCard from './ActHistoryCard.vue';
import { ActHistory } from '../isignifClient/src/ActHistory';
import { HttpResponse } from "vue-resource/types/vue_resource";

export default Vue.extend({
  name: "ActTimeline",
  props: {
    actId: Number
  },
  components: {
    ActHistoryCard,
  },
  data: () => ({
    loading: false,
    actHistories: [],
    included: []
  }),
  methods: {
    async fetch() {
      this.loading = true;

      ActHistory.fromAct(this.actId, this.$store.state.currentUser.token)
        .then(actHistories =>  this.actHistories = actHistories)
        .catch(e => this.$toast.error(`Une erreur est survenue. (${e.message})`))
        .finally(() => this.loading = false);
    }
  },
  mounted() {
    this.fetch();
  }
});
</script>