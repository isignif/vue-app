<template>
  <v-card>
    <v-toolbar card>
      <v-toolbar-title>Ajouter une pièce jointe</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="text-xs-right">
      <v-text-field v-model="name" label="Nom" required></v-text-field>
      <input v-show="false" type="file" ref="inputUpload" @change="onFileChange" />
      <v-btn @click="files = null" v-if="files">
        {{ files.name }}
        <v-icon>attachment</v-icon>
      </v-btn>
      <v-btn color="secondary" @click="$refs.inputUpload.click()" v-else>
        <v-icon>add</v-icon>Charger le fichier
      </v-btn>
      <v-btn color="primary" @click="onSubmit" :disabled="!name || !files">
        <v-icon>send</v-icon>Envoyer
      </v-btn>
    </v-card-text>
  </v-card>
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
