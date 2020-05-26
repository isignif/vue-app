<template>
  <v-layout row wrap class="pa-2 my-4 mx-2" align-center>
    <v-card outlined xs12 class="px-2" v-for="file in actFiles" :key="file.id">
        {{ file.name }}
    </v-card>
    <v-flex xs12 class="px-2">
            <ActFileNew
              v-if="actId"
              :actId="actId"
              @created="loadActFiles"
            />
    </v-flex>
  </v-layout>
</template>
<script>
import { ActFile } from 'isignif-client';
import ActFileNew from "./ActFileNew";
import { mapState } from 'vuex';

export default {
  components: {
    ActFileNew
  },
  props: {
    significationId: Number,
    actId: Number
  },
  data() {
    return {
      actFiles: [],
    };
  },
  computed: {
    ...mapState('currentUser', {
      token: state => state.token,
    }),
  },
  methods: {
    loadActFiles() {
        ActFile.all(this.actId, this.token)
            .then(files => this.actFiles = files)
            .catch(error => {
                console.error(error);
                this.$toast.error("Une erreur est survenue lors de la récupération des documents liés à l'acte.");
            });
    },
  },
  mounted() {
      this.loadActFiles();
  }
};
</script>
