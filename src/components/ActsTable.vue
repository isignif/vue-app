<template>
  <v-card>
    <Loader v-if="loading" />
    <v-card-title>
      Liste des actes
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-row>
      <v-col v-for="act in acts" :key="act.id">
        <ActCard :act="act" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Loader from "./Loader";
import ActCard from "./ActCard";
import { Act } from "isignif-client";

export default {
  name: "ActsTable",
  props: {},
  components: {
    ActCard,
    Loader,
  },
  methods: {
    fetch() {
      this.loading = true;

      Act.all(this.$store.state.currentUser.token)
        .then((acts) => (this.acts = acts))
        .catch((e) => {
          this.$toast.error(`Une erreur est survenue. (${e.message})`);
          console.error(e);
        })
        .finally(() => (this.loading = false));
    },
    countSignifications(actId) {
      return 666;
      // const actIdInt = parseInt(actId);

      // return this.significations
      //           .filter(signification => signification.attributes.act_id === actIdInt)
      //           .length;
    },
  },
  watch: {
    search: function () {
      console.log(this.search);
    },
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      loading: true,
      search: "",
      actTypes: [],
      // advocates: [],
      // significations: [],
      // actHistories: [],
      // bailiffs: [],
      headers: [
        {
          text: "Référence de l'acte",
          value: "reference",
        },
        // {
        //   text: "Correspondant",
        //   value: "advocate"
        // },
        // {
        //   text: "Huissier de justice",
        //   value: "bailiffs"
        // },
        {
          text: "Etape",
          value: "step",
        },
        // {
        //   text: 'Date de création',
        //   value: 'creation_date'
        // }
      ],
      acts: [],
    };
  },
};
</script>
