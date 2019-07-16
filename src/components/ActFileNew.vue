<template>
  <v-layout align-center row fill-height>
    <v-flex>
      <v-text-field v-model="name" label="Name" required></v-text-field>
    </v-flex>
    <v-flex>
      <input v-show="false" type="file" ref="inputUpload" @change="onFileChange" />
      <v-btn color="secondary" @click="$refs.inputUpload.click()">
        <v-icon>add</v-icon>Charger le fichier
      </v-btn>
      <v-btn color="primary" @click="onSubmit">
        <v-icon>add</v-icon>Ajouter
      </v-btn>
    </v-flex>
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
      files: ""
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
        headers: { Authorization: this.$store.state.current_user.token }
      };

      this.$http
        .post(url, formData, headers)
        .then(response => console.log(response))
        .catch(error => console.error(error));
    }
  }
};
</script>
