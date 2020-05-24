<template>
  <v-layout row wrap class="pa-2 my-4 mx-2" align-center>
    {{ actFile }}
      <v-text-field v-model="actFile.name" label="Nom" v-if="actFile.files" required></v-text-field>
      <input v-show="false" type="file" ref="inputUpload" @change="onFileChange" />
      <v-btn text @click="actFile.files = null" v-if="actFile.files">
        <v-icon>attachment</v-icon>&nbsp;{{ actFiles.files }}
      </v-btn>
      <v-btn text @click="$refs.inputUpload.click()" v-else>
        <v-icon>cloud_upload</v-icon>&nbsp; Ajouter une pièce jointe
      </v-btn>
      <v-btn color="primary"
          @click="onSubmit"
          :disabled="!actFile.name || !actFile.files"
          v-if="actFile.files">
        <v-icon>check</v-icon>
        Confirmer
      </v-btn>
  </v-layout>
</template>
<script>
import { ActFile } from 'isignif-client';

export default {
  name: "ActFileNew",
  props: {
    significationId: Number,
    actId: Number
  },
  data() {
    return {
      actFile: new ActFile(),
      // name: "",
      // files: null
    };
  },
  methods: {
    onFileChange() {
      console.log(this.$refs.inputUpload.files)
      this.actFile.files = this.$refs.inputUpload.files;
    },
    onSubmit() {
      this.actFile.token = this.$store.state.currentUser.token;

      this.actFile
        .save()
        .then(response => {
          this.$emit("created", this.actFile);
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
