<template>
  <v-container>
    <AdvocateInformations :id="$route.params.id" />

    <div v-if="$route.params.id == $store.state.currentUser.id">
      <v-btn text color="warning" @click="signout">
        <span>Se déconnecter</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import AdvocateInformations from "../components/AdvocateInformations";

export default {
  name: "Advocate",
  props: {},
  components: {
    AdvocateInformations
  },
  methods: {
    signout() {
      this.$store.dispatch("currentUser/signout");
      this.$router.push({ name: "home" });
    }
  }
};
</script>
