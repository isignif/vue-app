<template>
  <v-flex xs12 class="mx-2 my-4">
    <v-card class="elevation-3">
      <v-card-title primary-title>
        <div class="headline">{{ name }}</div>
      </v-card-title>
      <v-card-text>
        <v-list>
          <template v-for="file in files">
            <div :key="file.timestamp">
              <v-list-tile>
                <v-list-tile-content>{{ file.name }}</v-list-tile-content>
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
        <ActFileNew :signification_id="id" />
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>
import ActFileNew from "./ActFileNew";

export default {
  name: "SignificationAddActFile",
  components: {
    ActFileNew
  },
  props: {
    id: String,
    name: String
  },
  data() {
    return {
      files: []
    };
  }
};
</script>
