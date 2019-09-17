<template>
  <v-container>
    <v-card>

      <v-select
          v-model="conversationSelected"
          :items="conversations"
          item-text="actId"
          item-value="{significationId, actId}"
          label="Conversation"
          persistent-hint
          return-object
          single-line
        ></v-select>

      <!-- METTRE LES BONS PARAMETRES -->
      <Messages
        v-if="conversationSelected"
        :actId="conversationSelected.actId"
        :significationId="conversationSelected.significationId" />
    </v-card>
  </v-container>
</template>
<script>
import Loader from "../components/Loader";
import Messages from "../components/Messages";

export default {
  name: "Inbox",
  components: {
    Messages
  },
  mounted() {
    this.fetch();
  },
  data: () => ({
    conversations: [
      // something like `{actId: 1, significationId: 1}`
    ],
    conversationSelected: null,
  }),
  methods: {
    fetch() {
      this.$http
        .get(`acts`, {
          headers: {
            Authorization: this.$store.state.currentUser.token
          }
        })
        .then(response => {
          const acts = response.data.data;

          acts.forEach(act => {
            act.relationships.significations.data.forEach(signification => {
              this.conversations.push({
                actId: act.id,
                significationId: signification.id,
              })
            });
          });
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
