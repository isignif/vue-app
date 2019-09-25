<template>
  <v-container>
    <v-card>
      <v-select
          v-model="conversationSelected"
          :items="conversations"
          item-text="text"
          item-value="{significationId, actId}"
          label="Conversation"
          persistent-hint
          return-object
          single-line
        ></v-select>
      <Messages
        v-if="conversationSelected !== null"
        :actId="conversationSelected.actId"
        :significationId="conversationSelected.significationId" />
      <v-alert type="info" v-if="conversationSelected === null">
        Sélectionnez une signification pour accéder à sa messagerie.
      </v-alert>
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
      // something like `{actId: 1, significationId: 1, text: "Toto"}`
    ],
    conversationSelected: null,
  }),
  methods: {
    fetch() {
      this.$http
        .get(`significations`, {
          headers: {
            Authorization: this.$store.state.currentUser.token
          }
        })
        .then(response => {
          const significations = response.data.data;

          significations.forEach(signification => {
            const actId = parseInt(signification.relationships.act.data.id);
            const significationName = signification.attributes.name || '???';
            const text = `Acte #${actId} - ${significationName}`;

            this.conversations.push({
              text,
              actId,
              significationId: parseInt(signification.id),
            });

            this.conversations.sort(function(a, b){return b.actId - a.actId});
          });
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
