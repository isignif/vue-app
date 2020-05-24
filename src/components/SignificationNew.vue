<template>
  <v-layout row wrap class="elevation-3 pa-2 my-4 mx-2" align-center>
    <v-flex sm5 xs12 class="px-2">
      <v-text-field v-model="name" label="Destinataire" prepend-icon="place"></v-text-field>
    </v-flex>
    <v-flex sm6 xs12 fill-height class="px-2">
      <TownSelect v-model="townId" />
    </v-flex>
    <v-flex xs1 class="text-xs-right px-2" fill-height>
      <v-btn text icon small color="red" @click="deleteSignification">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import TownSelect from "./TownSelect";

export default {
  name: "SignificationNew",
  components: {
    TownSelect
  },
  methods: {
    deleteSignification: function() {
      this.$emit("delete");
    },
  },
  data: function() {
    return {
      name: null,
      townId: null
    };
  },
  watch: {
    name: function() {
      this.$emit("name-changed", this.name);
    },
    townId: function() {
      this.$emit("town-changed", this.townId);
    }
  }
};
</script>
