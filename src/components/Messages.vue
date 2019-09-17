<template>
    <v-card pa-5>
        <v-list two-line>
            <v-card-title v-if="messages">Aucun message</v-card-title>
            <template v-for="message in messages">
                <v-list-tile :key="message.id">
                    <v-list-tile-content>
                    <v-list-tile-title v-html="message.attributes"><!-- A FAIRE --></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-card>
</template>

<script>
export default {
  name: "Messages",
  props: {
    actId: String,
    significationId: String
  },
  data: () => ({
    messages: []
  }),
  methods: {
    fetch() {
      this.$http
        .get(`acts/${this.actId}/significations/${this.significationId}/messages`, {
          headers: {
            Authorization: this.$store.state.currentUser.token
          }
        })
        .then(response => {
          this.messages = response.data.data;
        })
        .catch(error => console.error(error));
    }
  },
  mounted() {
    this.fetch();
  },
};
</script>
