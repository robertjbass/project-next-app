<template>
  <div class="login">
    <h3>Login</h3>
    <br />
    <h1>{{ this.currentUser }}</h1>
    <div class="signin" v-if="!this.user">
      <v-btn large class="gh-button ma-2 white--text" @click="this.loginWithGH">
        GitHub
        <v-icon right> mdi-github </v-icon>
      </v-btn>
    </div>
    <div class="signout" v-else>
      <v-btn light @click="this.signOut">SignOut</v-btn>
    </div>

    <!--  -->
    <!-- {{ this.currentUser }}
    <div class="signOut" v-show="this.currentUser != 'Signed Out'"></div> -->
    <!--  -->
    <!-- <div class="checkUser">
      <h3>{{ this.currentUser }}</h3>
    </div> -->
    <!--  -->
    <div class="userInfo" v-if="this.user">
      uid: {{ this.uid }}
      <br />
      displayName: {{ this.displayName }}
      <br />
      photoURL: {{ this.photoURL }}
      <br />
      ghEmail: {{ this.ghEmail }}
      <br />
      providerId: {{ this.providerId }}
      <br />
      emailVerified: {{ this.emailVerified }}
      <br />
      airtableUrlByEmail: {{ this.airtableUrlByEmail }}
      <br />
      ghEmailEencodedURI: {{ this.ghEmailEencodedURI }}
      <br />
      airtableData: {{ this.airtableData }}
      <br />
      profileBio: {{ this.profileBio }} <br /><br />
    </div>
  </div>
</template>

<script>
import { auth, provider } from "../firebase";
import axios from "axios";

console.log(auth);

export default {
  name: "Login",
  data() {
    return {
      auth,
      provider,
      user: null,
      airtableData: null,
    };
  },
  methods: {
    loginWithGH() {
      auth.signInWithPopup(provider).then((user) => {
        this.user = user;
        console.log(user);
        this.getAirtableUsers();
      });
    },
    addNewUserToAirtable() {
      let url =
        "https://v1.nocodeapi.com/bbass/airtable/OWBByjdlNVhiKRiR?tableName=Users";
      let params = [
        {
          Name: this.displayName,
          Active: true,
          Email: this.ghEmail,
          ProfileSummary: this.profileBio,
          ProfilePicURL: this.photoURL,
          FirebaseUID: this.uid,
        },
      ];
      axios
        .post(url, params)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getAirtableUsers() {
      let url = this.airtableUrlByEmail;
      axios
        .get(url)
        .then(async (res) => {
          console.log(res);
          this.airtableData = await res.data.records;
          if (this.airtableData.length == 0) {
            console.log("New User");
            this.addNewUserToAirtable();
            // todo - redirect user
          } else {
            console.log("Existing User");
            // todo - redirect user
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    signOut() {
      this.auth.signOut();
      console.log(this.currentUser);
      this.$router.go();
    },
  },
  computed: {
    airtableUrlByEmail() {
      return `https://v1.nocodeapi.com/bbass/airtable/OWBByjdlNVhiKRiR?tableName=Users&view=User%20Data&filterByFormula=email%20%3D%20%22${this.ghEmailEencodedURI}%22`;
    },
    uid() {
      return this.user.user.uid;
    },
    displayName() {
      return this.user.user.displayName;
    },
    photoURL() {
      return this.user.user.photoURL;
    },
    ghEmail() {
      return this.user.user.email;
    },
    ghEmailEencodedURI() {
      return this.ghEmail.split("@").join("%40");
    },
    providerId() {
      return this.user.user.providerId;
    },
    emailVerified() {
      return this.user.user.emailVerified;
    },
    profileBio() {
      return this.user.additionalUserInfo.profile.bio;
    },
    currentUser() {
      if (this.auth.currentUser) {
        return this.auth.currentUser.email;
      } else {
        return null;
      }
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