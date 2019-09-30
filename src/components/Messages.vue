<template>
  <div>
    <Loader v-if="loading" />
    <v-card
        class="ma-2"
        v-for="message in messages"
        :key="message.id"
        max-width="400"
      >
      <v-card-title class="grey--text py-0">AUTHOR HERE</v-card-title>
      <v-card-text class="d-flex">
        {{ message.attributes.content }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Messages",
  props: {
    actId: Number,
    significationId: Number
  },
  data: () => ({
    loading: false,
    messages: []
  }),
  watch: {
    significationId() { this.fetch(); },
  },
  methods: {
    fetch() {
      this.loading = true;
      this.$http
        .get(`acts/${this.actId}/significations/${this.significationId}/messages`, {
          headers: {
            Authorization: this.$store.state.currentUser.token
          }
        })
        .then(response => this.messages = response.data.data)
        .catch(e => this.$toast.error(`Impossible de récupérrer les messages (${e.message})`))
        .finally(() => this.loading = false);
    }
  },
  mounted() {
    this.fetch();
  },
};
</script>
