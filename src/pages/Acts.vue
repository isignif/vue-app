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
  }
};
</script>
