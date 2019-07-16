<template>
  <v-flex xs12 class="mx-2 my-4">
    <v-card class="elevation-3">
      <v-card-title primary-title>
        <div class="headline">{{ name }}</div>
      </v-card-title>
      <v-card-text>
        <v-list>
          <template v-for="actFile in actFiles">
            <div :key="'actfile' + actFile.id">
              <v-list-tile>
                <v-list-tile-content>{{ actFile.attributes.name }}</v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
            </div>
          </template>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <ActFileNew
          :signification_id="signification_id"
          :act_id="act_id"
          @created="onActFileCreated"
        />
      </v-card-actions>
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
    act_id: String,
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
    }
  }
};
</script>
