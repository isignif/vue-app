<template>
  <v-timeline>
    <!-- TODO -->
    <v-timeline-item v-for="n in this.actHistories" :key="n" color="primary">
      <template v-slot:opposite>
        <span>Tus eu perfecto</span>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="headline">Lorem ipsum</v-card-title>
        <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  name: "ActTimeline",
  props: {
    actId: Number
  },
  data: () => ({
    actHistories: []
  }),
  methods: {
    async fetch() {
      this.$http
        .get(`acts/${this.actId}/act_histories`, {
          headers: { Authorization: this.$store.state.currentUser.token }
        })
        .then(res => (this.actHistories = res.data.data))
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