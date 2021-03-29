<template>
  <v-card max-width="344">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{
          act.name
        }}</v-list-item-title>
        <div class="overline mb-4">Créé par {{ advocate.completeName }}</div>
        <v-list-item-subtitle
          >Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle
        >
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text @click="goToAct">Voir</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ActHistoryStep from "./ActHistoryStep";
import { Act } from "isignif-client";

export default {
  props: {
    act: Act,
  },
  components: {},
  methods: {
    fetch() {
      // TODO
      this.act
        .getAdvocate()
        .then((a) => (this.advocate = a))
        .catch((e) => console.error(e));
    },
    goToAct() {
      this.$router.push({ name: "act", params: { id: this.act.id } });
    },
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      loading: true,
      advocate: [],
      // significations: [],
      // actHistories: [],
      // bailiffs: [],
    };
  },
};
</script>
