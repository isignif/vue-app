<template>
  <v-snackbar v-model="display" bottom :color="color">
    {{ message }}
    <v-btn flat @click="hide">Close</v-btn>
  </v-snackbar>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Snackbar",
  computed: {
    ...mapState("snackbar", {
      display: state => state.display,
      color: state => state.color,
      message: state => state.message
    })
  },
  watch: {
    display: function(val, _oldVal) {
      if (val === true) {
        setTimeout(() => {
          this.hide();
        }, 5000);
      }
    }
  },
  methods: {
    hide() {
      this.$store.dispatch("snackbar/close");
    }
  },
  // TODO computed here for logged user
  data() {
    return {
      // nothin
    };
  }
};
</script>
