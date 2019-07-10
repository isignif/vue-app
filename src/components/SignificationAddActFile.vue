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
        <v-btn bottom right small color="secondary">
          <v-icon>add</v-icon>ajouter un fichier
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  name: "SignificationAddActFile",
  props: {
    name: String
  },
  data() {
    return {
      files: [
        {
          timestamp: 123456,
          name: "toto.png"
        },
        {
          timestamp: 123457,
          name: "tota.png"
        }
      ]
    };
  }
};
</script>
