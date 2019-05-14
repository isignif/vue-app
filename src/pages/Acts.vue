<template>
  <v-container>
    <h1>Mes actes</h1>
    <v-card>
      <ActsTable />
    </v-card>
  </v-container>
</template>

<script>
import ActsTable   from '../components/ActsTable'

export default {
  name: 'Acts',
  components: {
    ActsTable
  },
}
</script>
