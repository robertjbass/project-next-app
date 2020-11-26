<template>
  <div id="app">
    <img
      alt="Logo"
      class="logo"
      src="./assets/images/blackBGWhiteTextThinLighning.png"
    />
    <router-view></router-view>
    <div class="bottomBar"></div>
  </div>
</template>

<script>
import { auth } from "./firebase";

export default {
  name: "App",
  data() {
    return {
      auth,
    };
  },
  methods: {
    logout() {
      auth.signOut();
    },
    checkUser() {
      console.log(this.currentUser);
    },
  },
  computed: {
    currentUser() {
      return this.auth.currentUser;
    },
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