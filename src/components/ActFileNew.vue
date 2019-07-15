<template>
  <form>
    <input v-show="false" type="file" ref="inputUpload" />
    <v-btn bottom right small color="secondary" @click="$refs.inputUpload.click()">
      <v-icon>add</v-icon>ajouter un fichier
    </v-btn>
  </form>
</template>
<script>
export default {
  name: "ActFileNew",
  props: {
    signification_id: String
  }
};
</script>
