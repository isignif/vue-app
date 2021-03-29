<template>
  <v-container>
    <v-row>
      <v-col>
        <p>{{ signification.name }}</p>
      </v-col>
      <v-col v-if="bailiff">
        <p><i>traité par</i>&nbsp;{{ bailiff.completeName }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Signification, User } from "isignif-client";

export default Vue.extend({
  name: "SignificationInformations",
  props: {
    signification: Signification,
  },
  data() {
    return {
      bailiff: null as User,
    };
  },
  mounted() {
    this.signification.getBailiff().then((b) => (this.bailiff = b));
  },
});
</script>