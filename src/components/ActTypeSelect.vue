<template>
    <v-select :options="options" label="text" @search="onSearch" v-model="select" box></v-select>
</template>
<script>
import vSelect from 'vue-select'

export default {
    name: 'ActTypeSelect',
    components: {
        vSelect
    },
    created: function() {
      this.onSearch('', null)
    },
    methods: {
      onSearch: function(search, loading) {
        this.$http.get('act_types', { headers: { Authorization: this.$store.state.current_user.token } })
                  .then( response => this.extractActTypeOptionsFromResponse(response.data) )
                  .catch(error => console.error(error))
      },
      extractActTypeOptionsFromResponse: function(responseData) {
        this.options = responseData.data.map(actType => { 
          return {
            id: actType.id,
            text: actType.attributes.name,
          }
        })
      }
    },
    data: function () {
      return {
        options: [],
        select: null,
        loading: false,
      }
    }
}
</script>
