<template>
    <v-layout row class="elevation-3 pa-2 my-4" align-center>
      <v-flex xs5 class="px-2">
        <v-text-field v-model="name" label="Destinataire" prepend-icon="place"></v-text-field>
      </v-flex>
      <v-flex xs6 fill-height class="px-2">
        <TownSelect />
      </v-flex>
      <v-flex xs1 class="text-xs-right px-2" fill-height>
        <v-btn flat icon small color="red" @click="deleteSignification">
          <v-icon>
            delete
          </v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
</template>
<script>
import TownSelect from './TownSelect'

export default {
  name: 'SignificationEdit',
  components: {
    TownSelect
  },
  methods: {
    deleteSignification: function() {
      // todo
    }
  },
  data: function () {
      return {
        name: null
      }
  }
}
</script>
