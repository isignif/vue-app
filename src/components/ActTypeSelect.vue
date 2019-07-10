<template>
  <v-autocomplete :items="options" label="Type d'acte à signifier" item-value="id" v-model="select"></v-autocomplete>
</template>
<script>
export default {
  name: "ActTypeSelect",
  created: function() {
    this.onSearch("", null);
  },
  methods: {
    onSearch: function(search, loading) {
      this.$http
        .get("act_types", {
          headers: { Authorization: this.$store.state.current_user.token }
        })
        .then(response => this.extractActTypeOptionsFromResponse(response.data))
        .catch(error => console.error(error));
    },
    extractActTypeOptionsFromResponse: function(responseData) {
      this.options = responseData.data.map(actType => {
        return {
          id: actType.id,
          text: actType.attributes.name
        };
      });
    }
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
    }
  }
};
</script>
