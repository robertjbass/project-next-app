<!-- https://firebase.google.com/docs/auth/web/github-auth
https://fireship.io/courses/vue/auth-anonymous/ -->
<template>
  <div id="app">
    <img
      alt="Logo"
      class="logo"
      src="./assets/images/blackBGWhiteTextThinLighning.png"
    />
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";
export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #000;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

.logo {
  width: 70%;
}
</style>