<template>
  <v-container>
    <v-card>
      <ActsTable />
    </v-card>
  </v-container>
</template>

<script>
import ActsTable from "../components/ActsTable";

export default {
  name: "Acts",
  components: {
    ActsTable
  },
  mounted() {
    if (!this.$store.state.currentUser.token) {
        this.$router.push({ name: 'signin' });
    }
  }
};
</script>
