<template>
  <div dark id="app">
    <v-app>
      <v-toolbar height="50px" color="#393838" class="toolbar">
        <v-app-bar-nav-icon
          color="#fff"
          @click.native.stop="sideNav = !sideNav"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="title">
          <router-link to="/" tag="span" style="cursor: pointer" class="title">
            <!-- project(() => nextApp('💡')) -->
            (() => nextApp('💡'))
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            elevation="0"
            v-for="item in menuItems"
            :key="item.title"
            class="btn-nav"
            dark
            :to="item.link"
            ><v-icon left>{{ item.icon }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <router-view />
      <!-- //? add temporary tag if drawer starts being open by default -->
      <v-navigation-drawer absolute dark v-model="sideNav" width="256">
        <!-- height="100vh" -->
        <v-list-item @click.native.stop="sideNav = !sideNav">
          <v-list-item-content>
            <v-list-item-title class="title">
              <v-icon left color="warning" style="cursor: pointer"
                >mdi-close</v-icon
              >
              Project Next App
            </v-list-item-title>
            <v-list-item-subtitle>
              Start something new... again
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item
            v-for="item in this.menuItems"
            :key="item.title"
            router
            :to="item.link"
            link
          >
            <v-list-item-icon>
              <v-icon left>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ item.title }}</v-list-item-content>
          </v-list-item>
          <v-list-item dense nav link>
            <v-list-item-icon>
              <v-icon left>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Log Out</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// todo - move to vuex
// import firebase from "firebase/app";
// import "firebase/auth";

import axios from "axios";
// import { auth } from "./firebase";
// console.log(auth);

export default {
  name: "App",
  data() {
    return {
      // auth,
      loggedIn: false,
      right: null,
      sideNav: false,
      userProfileData: null,
    };
  },
  // methods: {
  // todo - move to vuex
  // logout() {
  //   firebase
  //     .auth()
  //     // auth
  //     .signOut()
  //     .then(() => {
  //       console.log("Logged Out");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // },
  // },
  mounted() {
    (() => {
      axios
        .get(
          `https://v1.nocodeapi.com/bbass/airtable/OWBByjdlNVhiKRiR?tableName=Users&view=User%20Profiles`
        )
        .then(async (res) => {
          this.userProfileData = await res.data.records;
          console.log(this.userProfileData);
        })
        .catch((err) => {
          console.error(err);
        });
    })();
  },
  computed: {
    ...mapGetters(["user"]),
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    menuItems() {
      if (this.userIsAuthenticated) {
        return [
          {
            icon: "mdi-head-lightbulb-outline",
            title: "Hackers",
            link: "/hackers",
          },
          {
            icon: "mdi-code-tags",
            title: "Projects",
            link: "/projects",
          },
          {
            icon: "mdi-github",
            title: "Profile",
            link: "/profile",
          },
          {
            icon: "mdi-folder-plus-outline",
            title: "Next App",
            link: "/project/new",
          },
          // {
          //   icon: "mdi-logout-variant",
          //   title: "Log Out",
          //   link: "/logout",
          // },
        ];
      } else {
        return [
          {
            icon: "mdi-github",
            title: "Sign up",
            link: "/signup",
          },
          {
            icon: "mdi-github",
            title: "Sign in",
            link: "/signin",
          },
        ];
      }
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

.toolbar {
  height: 100px;
}

.title {
  color: #fff;
  font-family: monospace;
  text-decoration: none;
}

/* .btn-nav {
  width: 160px;
} */
</style>