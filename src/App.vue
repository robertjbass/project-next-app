<template>
  <div id="app">
    <v-card dark class="login-card">
      <Navbar />
    </v-card>
    <Drawer />

    <!-- <router-view></router-view> -->
    <!-- <div class="bottom-bar">logout</div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar.vue";
// import Home from "@/components/Home.vue";
import Drawer from "@/components/Drawer.vue";

export default {
  name: "App",
  computed: {
    ...mapGetters(["user", "profile"]),
  },
  components: {
    Navbar,
    Drawer,
    // Home,
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
  width: 40%;
}

.bottom-bar {
  height: 40px;
  position: fixed;
  bottom: 0%;
  width: 100%;
  background-color: #393838;
  opacity: 1;
}
/* .login-card {
} */
</style>