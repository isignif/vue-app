<template>
  <v-flex xs12 class="mx-2 my-4">
    <v-card class="elevation-1">
      <v-toolbar>
        <v-toolbar-title>Signification: {{ signification.name }}</v-toolbar-title>
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
        <v-alert type="info" dense outlined :value="actFiles.length === 0">
          Vous n'avez pas de pièce jointe pour cette signification.
        </v-alert>
      </v-card-text>
      <v-card-text>
        <ActFileNew
          :significationId="significationId"
          :actId="actId"
          @created="onActFileCreated"
        />
      </v-card-text>
    </v-card>
  </v-flex>
</template>
<script>
import { Act, Signification } from 'isignif-client';
import ActFileNew from "./ActFileNew";

export default {
  name: "SignificationEdit",
  components: {
    ActFileNew
  },
  props: {
    significationId: Number,
    actId: Number,
  },
  data() {
    return {
      signification: new Signification,
      files: [],
      actFiles: []
    };
  },
  methods: {
    onActFileCreated(actFile) {
      this.signification
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
  },
  mounted() {
    Signification.get(this.actId, this.significationId, this.$store.state.currentUser.token)
      .then(s => this.signification = s)
      .catch(error => {
        console.error(error);
        this.$toast.error("Une erreur est survenue lors de la récupération de sinformation de la signification");
      });
  }
};
</script>
