<template>
    <v-card pa-5>
        <v-list two-line>
            <v-card-title v-if="!actMessages">Aucun message</v-card-title>
            <template v-for="item in actMessages">
                <v-list-tile :key="item.id">
                    <v-list-tile-content>
                    <v-list-tile-title v-html="item.attributes"><!-- A FAIRE --></v-list-tile-title>
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
    act_id: String,
    signification_id: String
  },
  methods: {
    messages() {
      this.$http
        .get(`acts/${this.act_id}/significations/${this.signification_id}/messages`, {
          headers: {
            Authorization: this.$store.state.currentUser.token
          }
        })
        .then(response => {
          this.actMessages = response.data.data;
        })
        .catch(error => console.error(error));
    }
  },
  mounted() {
    this.messages();
  },
};
</script>
