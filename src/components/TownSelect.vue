<template>
  <v-autocomplete
    :items="options"
    label="Ville"
    v-model="select"
    item-text="text"
    item-value="id"
    :loading="loading"
    hide-no-data
    cache-items
    :search-input.sync="search"
  ></v-autocomplete>
</template>
<script>
// https://vuetifyjs.com/en/components/autocompletes#asynchronous-items
// https://egndigital.com/vuetify-autocomplete-with-remote-search/
export default {
  name: "TownSelect",
  created: function() {
    this.onSearch("", null);
  },
  methods: {
    onSearch: function(search) {
      this.loading = true;

      this.$http
        .post("towns/search", { term: search })
        .then(response => (this.options = response.data))
        .catch(error => {
          console.error(error);
          this.$toast.error("Une erreur est survenue durant la recherche de la ville");
        })
        .finally(() => (this.loading = false));
    }
  },
  watch: {
    select: function(value) {
      this.$emit("input", value);
    },
    search: function(value) {
      value && value !== this.select && this.onSearch(value);
    }
  },
  data: function() {
    return {
      search: "",
      select: null,
      options: [],
      loading: false
    };
  }
};
</script>
