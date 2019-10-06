<template>
  <v-card xs12 :colora="actHistory.color" flat class="text-xs-right">
    <v-card-title primary-title class="headline pb-0">{{ actHistory.humanReadableStep }}</v-card-title>
    <v-card-text class="pt-0">
      {{ user ? user.completeName : '???' }}
      <span>@ {{ actHistory.signification }}</span>
      <span class="grey--text">{{ actHistory.formatedCreatedAt }}</span>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { ActHistory } from '../models/ActHistory';
import { User } from '../models/User';

export default Vue.extend({
  name: 'ActHistoryCard',
  props: {
    actHistory: ActHistory
  },
  data() {
    return {
      user: null as User
    }
  },
  mounted() {
    this.actHistory.getUser()
      .then(u => this.user = u);
  }
});
</script>