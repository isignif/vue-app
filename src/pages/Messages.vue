<template>
  <v-container>
    <v-card>
      <!-- METTRE LES BONS PARAMETRES -->
      <Messages :act_id="this.$route.params.id" :signification_id="this.signification_id" />
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
};
</script>
