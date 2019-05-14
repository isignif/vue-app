<template>
  <AdvocateInformations :id="$route.params.id"  />
</template>

<script>
import AdvocateInformations from '../components/AdvocateInformations'

export default {
  name: 'Advocate',
  props: {},
  components: {
    AdvocateInformations
  },
}
</script>
