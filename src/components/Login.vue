<template>
  <div class="login">
    <h3>
      {{ this.isUserLoggedIn ? this.ghEmail : "Login" }}
    </h3>
    <br />
    <div class="signin" v-if="!this.user">
      <v-btn
        large
        class="gh-button ma-2 white--text"
        @click="this.signInWithGH"
      >
        GitHub
        <v-icon right> mdi-github </v-icon>
      </v-btn>
    </div>
    <div class="signout" v-else>
      <v-btn light @click="this.signOut">SignOut</v-btn>
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
    signInWithGH() {
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
      if (this.user) {
        return this.user.user.uid;
      } else {
        return "";
      }
    },
    displayName() {
      if (this.user) {
        return this.user.user.displayName;
      } else {
        return "";
      }
    },
    photoURL() {
      if (this.user) {
        return this.user.user.photoURL;
      } else {
        return "";
      }
    },
    ghEmail() {
      if (this.user) {
        return this.user.user.email;
      } else {
        return "";
      }
    },
    ghEmailEencodedURI() {
      return this.ghEmail.split("@").join("%40");
    },
    providerId() {
      if (this.user) {
        return this.user.user.providerId;
      } else {
        return "";
      }
    },
    emailVerified() {
      if (this.user) {
        return this.user.user.emailVerified;
      } else {
        return "";
      }
    },
    profileBio() {
      if (this.user) {
        return this.user.additionalUserInfo.profile.bio;
      } else {
        return "";
      }
    },
    currentUser() {
      if (this.auth.currentUser) {
        return this.auth.currentUser.email;
      } else {
        return null;
      }
    },
    isUserLoggedIn() {
      return this.$store.state.user.loggedIn;
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