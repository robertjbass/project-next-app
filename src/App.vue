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
    <div class="bottomBar">
      <!-- <v-btn @click="this.logout">LogOut</v-btn> -->
      <!-- {{ this.currentUser }}
      <br /><br /> -->
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
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