<template>
  <div class="login">
    <div class="email">
      <h3 class="upper-left" v-if="this.user.loggedIn">
        {{ this.user.data.email }}
      </h3>
    </div>
    <div class="signin" v-if="!this.user.loggedIn">
      <v-btn class="gh-button ma-2 white--text" @click="this.signInWithGH">
        {{ this.user.loggedIn ? "logout" : "login" }}
        <v-icon right> mdi-github </v-icon>
      </v-btn>
    </div>
    <div class="gh-button ma-2 white--text" v-else>
      <v-btn light @click="this.signOut">SignOut</v-btn>
    </div>
  </div>
</template>

<script>
import { auth, provider } from "../firebase";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      auth,
      provider,
      authUser: null,
      airtableData: null,
      ghUsername: null,
    };
  },
  methods: {
    signInWithGH() {
      auth.signInWithPopup(provider).then((authUser) => {
        this.authUser = authUser;
        this.ghUsername = authUser.additionalUserInfo.username;
        this.getAirtableUsers();
      });
    },
    getAirtableUsers() {
      console.log(url);
      let url = this.airtableUrlByEmail;
      axios
        .get(url)
        .then(async (res) => {
          this.airtableData = await res.data.records;
          if (this.airtableData.length == 0) {
            console.log("New User");
            this.addNewUserToAirtable();
          } else {
            console.log("Existing User");
            this.$store.dispatch(
              "fetchProfile",
              await res.data.records[0].fields
            );
          }
        })
        .finally(() => {
          // todo - redirect user
          // this.$router.push("profile");
        })
        .catch((err) => {
          console.error(err);
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
          GitHubUsername: this.ghUsername,
        },
      ];
      axios
        .post(url, params)
        .then(async (res) => {
          this.$store.dispatch("fetchProfile", await res.data[0].fields);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    signOut() {
      this.auth.signOut();
      this.$router.go();
      this.$store.dispatch("fetchProfile", null);
    },
  },
  watch: {
    user() {
      if (!this.user) {
        this.signOut();
      }
    },
  },
  computed: {
    ...mapGetters(["user", "profile"]),
    airtableUrlByEmail() {
      return `https://v1.nocodeapi.com/bbass/airtable/OWBByjdlNVhiKRiR?tableName=Users&view=User%20Data&filterByFormula=email%20%3D%20%22${this.ghEmailEencodedURI}%22`;
    },
    uid() {
      if (this.authUser) {
        return this.authUser.user.uid;
      } else {
        return "";
      }
    },
    displayName() {
      if (this.authUser) {
        return this.authUser.user.displayName;
      } else {
        return "";
      }
    },
    photoURL() {
      if (this.authUser) {
        return this.authUser.user.photoURL;
      } else {
        return "";
      }
    },
    ghEmail() {
      if (this.authUser) {
        return this.authUser.user.email;
      } else {
        return "";
      }
    },
    ghEmailEencodedURI() {
      return this.ghEmail.split("@").join("%40");
    },
    providerId() {
      if (this.authUser) {
        return this.authUser.user.providerId;
      } else {
        return "";
      }
    },
    emailVerified() {
      if (this.authUser) {
        return this.authUser.user.emailVerified;
      } else {
        return "";
      }
    },
    profileBio() {
      if (this.user.loggedIn) {
        return this.authUser.additionalUserInfo.profile.bio;
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
      return this.user.loggedIn;
    },
  },
};
</script>

<style scoped>
.upper-left {
  font-size: 0.8rem;
}
.login {
  background-color: #393838;
  padding: 5px 2.5%;
  margin: auto;
  display: flex;
  flex: wrap;
  padding-left: 2.5%;
}
.email {
  margin: auto;
  text-align: left;
  justify-content: left;
  width: 90%;
}
.signout {
  margin: auto;
}
.gh-button {
  margin: 10px;
}
</style>