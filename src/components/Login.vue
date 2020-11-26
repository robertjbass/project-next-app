<template>
  <div class="login">
    <h3>Login</h3>
    <br />
    <v-btn large class="gh-button ma-2 white--text" @click="this.login">
      GitHub
      <v-icon right> mdi-github </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { auth } from "../firebase";

console.log(auth);

export default {
  name: "Login",
  data() {
    return {
      provider: "",
    };
  },
  methods: {
    login() {
      this.provider = new auth.GithubAuthProvider();
      console.log(this.provider);
      auth()
        .signInWithPopup(this.provider)
        .then((result) => {
          let token = result.credential.accessToken;
          console.log(token);
          // The signed-in user info.
          let user = result.user;
          console.log(user);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
          // The email of the user's account used.
          const email = error.email;
          console.log(email);
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          console.log(credential);
        });
    },
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