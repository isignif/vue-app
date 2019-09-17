<template>
  <v-container>
    <v-card>
      <!-- METTRE LES BONS PARAMETRES -->
      <Messages :actId="this.$route.params.id" :significationId="this.signification_id" />
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
