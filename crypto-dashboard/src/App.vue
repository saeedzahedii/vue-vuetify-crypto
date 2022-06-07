<template>
  <v-app>
    <nav-bar />
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Questrial");

* {
  font-family: "Questrial";
}

body,
html {
  margin: 0px;
  padding: 0px;
}
.row{
  display: unset;
}
</style>
