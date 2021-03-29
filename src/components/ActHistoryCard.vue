<template>
  <v-card xs12 :colora="actHistory.color" flat class="text-xs-right">
    <v-card-title primary-title class="headline pb-0">{{
      actHistory.humanReadableStep
    }}</v-card-title>
    <v-card-text class="pt-0">
      {{ user ? user.completeName : "???" }}
      <span>@ {{ actHistory.signification }}</span>
      <span class="grey--text">{{ createdAt }}</span>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { ActHistory, User } from "isignif-client";
import { dateFmt } from "../utils/formatters.utils";

export default Vue.extend({
  name: "ActHistoryCard",
  props: {
    actHistory: ActHistory,
  },
  data() {
    return {
      user: undefined as User,
      createdAt: "",
    };
  },
  mounted() {
    console.log(this.actHistory);
    this.actHistory.getUser().then((u) => (this.user = u));
    this.createdAt = dateFmt.format(new Date(this.actHistory.createdAt));
  },
});
</script>