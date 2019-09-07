<template>
  <v-flex xs12 class="mx-2 my-4">
    <v-card class="elevation-3">
      <v-toolbar card>
        <v-toolbar-title>{{ name }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-list v-if="actFiles.length > 0">
          <template v-for="actFile in actFiles">
            <div :key="'actfile' + actFile.id">
              <v-list-tile>
                <v-list-tile-content>{{ actFile.attributes.name }}</v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple @click="deleteActFile(actFile.id)">
                    <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
            </div>
          </template>
        </v-list>
        <v-alert type="info" dense outline :value="actFiles.length === 0">
          Vous n'avez pas de pièce jointe pour cette signification.
        </v-alert>
      </v-card-text>
      <v-card-text>
        <ActFileNew
          :signification_id="signification_id"
          :actId="actId"
          @created="onActFileCreated"
        />
      </v-card-text>
    </v-card>
  </v-flex>
</template>
<script>
import ActFileNew from "./ActFileNew";

export default {
  name: "SignificationEdit",
  components: {
    ActFileNew
  },
  props: {
    signification_id: String,
    actId: String,
    name: String
  },
  data() {
    return {
      files: [],
      actFiles: []
    };
  },
  methods: {
    onActFileCreated(actFile) {
      this.actFiles.push(actFile);
    },
    deleteActFile(actFileId) {
      const url = `acts/${this.actId}/act_files/${actFileId}`;

      const headers = {
        headers: { Authorization: this.$store.state.currentUser.token }
      };

      this.$http
        .delete(url, headers)
        .then(() => {
          this.actFiles = this.actFiles.filter(
            actFile => actFile.id != actFile.id
          );
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
