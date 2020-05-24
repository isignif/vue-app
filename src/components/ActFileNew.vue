<template>
  <v-layout row wrap class="pa-2 my-4 mx-2" align-center>
      <v-text-field v-model="name" label="Nom" v-if="files" required></v-text-field>
      <input v-show="false" type="file" ref="inputUpload" @change="onFileChange" />
      <v-btn text @click="files = null" v-if="files">
        <v-icon>attachment</v-icon>&nbsp;{{ files.name }}
      </v-btn>
      <v-btn text @click="$refs.inputUpload.click()" v-else>
        <v-icon>cloud_upload</v-icon>&nbsp; Ajouter une pièce jointe
      </v-btn>
      <v-btn color="primary" @click="onSubmit" :disabled="!name || !files" v-if="files">
        <v-icon>check</v-icon>
        Confirmer
      </v-btn>
  </v-layout>
</template>
<script>
export default {
  name: "ActFileNew",
  props: {
    signification_id: String,
    act_id: String
  },
  data() {
    return {
      name: "",
      files: null
    };
  },
  methods: {
    onFileChange() {
      this.files = this.$refs.inputUpload.files[0];
    },
    onSubmit() {
      let formData = new FormData();
      formData.append("act_file[files]", this.files);
      formData.append("act_file[name]", this.name);
      formData.append("act_file[signification_id]", this.signification_id);

      const url = `acts/${this.act_id}/act_files`;

      const headers = {
        headers: { Authorization: this.$store.state.currentUser.token }
      };

      this.$http
        .post(url, formData, headers)
        .then(response => {
          this.$emit("created", response.data.data);
          this.files = null;
          this.name = null;
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
