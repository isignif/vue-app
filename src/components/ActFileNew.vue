<template>
  <v-layout row wrap class="pa-2 my-4 mx-2" align-center>
      <v-text-field v-model="name" label="Nom" v-if="files" required></v-text-field>
      <input v-show="false" type="file" multiple="true" ref="inputUpload" @change="onFileChange" />
      <v-btn text @click="files = null" v-if="files">
        <v-icon>attachment</v-icon>&nbsp;{{ filesNames }}
      </v-btn>
      <v-btn text @click="$refs.inputUpload.click()" v-else>
        <v-icon>cloud_upload</v-icon>&nbsp; Ajouter une pièce jointe
      </v-btn>
      <v-btn color="primary"
          @click="onSubmit"
          v-if="files">
        <v-icon>check</v-icon>
        Confirmer
      </v-btn>
  </v-layout>
</template>
<script>
import { ActFile } from 'isignif-client';
import { mapState } from 'vuex';

export default {
  name: "ActFileNew",
  props: {
    significationId: Number,
    actId: Number
  },
  data() {
    return {
      actFile: new ActFile(),
      name: "Document à signifier",
      files: null
    };
  },
  computed: {
    ...mapState('currentUser', {
      token: state => state.token,
    }),
    filesNames: function() {
      if (!this.files) return;

      const names = [];

      for (let i = 0; i < this.files.length; i++) {
        const file = this.files.item(i);
        names.push(file.name);
      }

      return names.join(', ');
    }
  },
  methods: {
    onFileChange() {
      this.files = this.$refs.inputUpload.files;
    },
    onSubmit() {
      const actFile = new ActFile();
      actFile.token = this.token;
      actFile.files = this.files;
      actFile.name = this.name;

      if (!actFile.files) {
        return this.$toast.error("Vous n'avez pas attaché de fichiers.");
      }
      if (!actFile.name) {
        return this.$toast.error("Vous devez spécifier un nom.");
      }

      this.actFile
        .save()
        .then(response => {
          this.$toast.success("Le fichier a été ajouté.");
          this.$emit("created", this.actFile);
        })
        .catch(error => {
          console.error(error);
          this.$toast.error("Le fichier n'a pas pu être ajouté.");

        });
    }
  }
};
</script>
