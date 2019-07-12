<template>
  <v-chip outline :color="getActHistoryStepColor(step)">{{ translateActHistoryStep(step) }}</v-chip>
</template>
<script lang="ts">
export default {
  name: "ActHistoryStep",
  props: ["step"],
  methods: {
    translateActHistoryStep: (step: String): String => {
      switch (step) {
        case "created":
          return "En attente de confirmation";
        case "confirmed":
          return "Confirmé";
        case "read":
          return "AR";
        case "signified":
          return "Signifié";
        case "complete":
          return "Complet";
        case "ask_cancel":
          return "Demande annulation";
        case "archive":
          return "Archivé";
      }

      return "";
    },
    getActHistoryStepColor: (step: String): String => {
      switch (step) {
        case "created":
          return "red";
        case "confirmed":
          return "blue";
        case "read":
          return "blue";
        case "signified":
          return "indigo";
        case "complete":
          return "green";
        case "ask_cancel":
          return "red";
        case "canceled":
          return "red";
        case "archive":
          return "grey";
      }

      return "";
    }
  }
};
</script>
