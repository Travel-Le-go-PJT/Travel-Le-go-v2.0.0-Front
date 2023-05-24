<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view />
  </div>
</template>
<script>
import HeaderNav from "@/components/HeaderNav";
export default {
  name: "App",
  components: {
    HeaderNav,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  padding: 0 !important;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

