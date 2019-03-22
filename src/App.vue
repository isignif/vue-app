<template>
  <div id="app">

    <NavBar/>
    <div class="container">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    NavBar
  }
}
</script>
