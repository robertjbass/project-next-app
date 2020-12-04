
<template>
  <div class="signup">
    <v-container>
      <v-form @submit.prevent="onSignupWithGH" :lazy-validation="true">
        <v-layout>
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
              <v-card ref="form" dark min-width="400px" height="1000">
                <h1>Signup</h1>

                <div class="signin" :v-if="true">
                  <!-- <div class="signin" v-if="!this.user.loggedIn"> -->
                  <!-- <v-btn
                    class="gh-button ma-2 white--text"
                    @click="this.signInWithGH"
                  > -->
                  <v-btn class="gh-button ma-2 white--text" type="submit">
                    <!-- {{ this.user.loggedIn ? "logout" : "login" }} -->
                    <v-icon right> mdi-github </v-icon>
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-layout>
      </v-form>
    </v-container>

    <!-- <v-container>
      <v-card dark > </v-card>
    </v-container> -->
  </div>
</template>

<script>
// import mapGetters from "vuex";
export default {
  name: "Signup",
  methods: {
    onSignupWithGH() {
      this.$store.dispatch("signUserUp");
    },
  },
  computed: {
    // ...mapGetters(["user"]),
    user() {
      return this.$store.getters.user;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        console.log(value, "routerPush");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
</style>