<template>
  <div>
    <Loader v-if="loading" />
    <v-layout row wrap  v-if="act && loading === false">
      <v-flex xs10 class="pa-3 white elevation-2">
        <div>
          <h1>Acte n° {{ act.id }}</h1>

          <p> Il s'agit d'une demande de "Acte de saisie-attribution", créée par Romain NICOLAS le {{ act.createdAt }}. Il a été estimé à 131.52 €. La référence du demandeur est "".</p>

          <p>Cet acte est à facturer à:</p>
          <address>
            {{ act.billRecipient }} {{ act.billEmail }}<br/>
            SIRET: {{ act.billSiret }}<br/>
            {{ act.billAddress }}, {{ act.billZipCode }}, {{ act.billTown }}
          </address>

          <div v-if="act.comment">
            <p>Le demandeur a ajouté le commentaire suivant:</p>
            <blockquote>
              <p>{{ act.comment }}</p>
            </blockquote>
          </div>


          <h2>Significations</h2>
          <SignificationInformations
              v-for="signification in significations"
              :key="signification.id"
              :signification="signification"
          />
        </div>
      </v-flex>
      <v-flex xs2>
        <ActTimeline :actId="Number(this.$route.params.id)" />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Loader from "../components/Loader";
import { Act, Signification } from 'isignif-client';
import ActTimeline from "../components/ActTimeline";
import SignificationInformations from "../components/SignificationInformations";

export default {
  name: "ActInformations",
  components: {
    Loader,
    ActTimeline,
    SignificationInformations
  },
  methods: {
    fetch() {
      Act.get(this.$route.params.id, this.$store.state.currentUser.token)
        .then(act =>  {
          this.act = act;
          return this.act.getSignifications();
        })
        .then(significations => this.significations = significations)
        .catch(error => console.error(error))
        .finally(() => this.loading = false);
    }
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      loading: true,
      act: null,
      significations: [],
    };
  }
};
</script>
