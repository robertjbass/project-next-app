<template>
  <div class="login">
    <h3>Login</h3>
    <br />
    <v-btn
      large
      class="gh-button ma-2 white--text"
      @click="auth.signInWithPopup(provider)"
    >
      GitHub
      <v-icon right> mdi-github </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { auth, provider } from "../firebase";

console.log(auth);

export default {
  name: "Login",
  data() {
    return {
      auth,
      provider,
    };
  },
};
</script>

<style scoped>
.login {
  background-color: #222;
  padding: 5%;
  margin: 0 10%;
  border-radius: 1.2rem;
}
.gh-button {
  padding-top: 0;
  margin: 0;
  border: 0;
}
</style>