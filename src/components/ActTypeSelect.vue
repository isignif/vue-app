<template>
  <v-autocomplete :items="options" label="Type d'acte à signifier" item-value="id" v-model="select"></v-autocomplete>
</template>
<script>
import { ActType } from 'isignif-client';

export default {
  name: "ActTypeSelect",
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      this.loading = true;

      ActType.all(this.$store.state.currentUser.token)
        .then(actTypes => {
          this.options = actTypes.map(actType => ({
            id: actType.id,
            text: actType.name
          }));
        })
        .catch(e => this.$toast.error(`Une erreur est survenue. (${e.message})`))
        .finally(() => this.loading = false);
    },
  },
  data: function() {
    return {
      options: [],
      select: null,
      loading: false
    };
  },
  watch: {
    select: function(value) {
      this.$emit("input", parseInt(value));
      this.$emit("change");
    }
  }
};
</script>
