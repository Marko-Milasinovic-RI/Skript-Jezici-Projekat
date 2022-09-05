<template>
  <div id="VUE Vebsajt">
  <Navigacija/>
    <router-view/>
  </div>
</template>

<script>
import Navigacija from './views/Navigacija.vue'

export default {
  name: 'App',
  components: {
    Navigacija
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
