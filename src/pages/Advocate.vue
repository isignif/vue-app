<template>
  <v-container>
    <AdvocateInformations :id="$route.params.id" />


    <div v-if="$route.params.id == $store.state.current_user.id">

      <v-btn flat color="warning" @click="signout">
        <span>Se déconnecter</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>

    </div>

  </v-container>
</template>

<script>
import AdvocateInformations from '../components/AdvocateInformations'

export default {
  name: 'Advocate',
  props: {},
  components: {
    AdvocateInformations
  },
  methods: {
    signout() {
      this.$store.dispatch('current_user/signout')
      this.$router.push({ name: 'home'})
    }
  }
}
</script>
