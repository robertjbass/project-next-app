<template>
  <div dark id="app" @click="closeSideNav">
    <v-app>
      <v-toolbar max-height="64px" color="#393838" class="toolbar">
        <v-app-bar-nav-icon
          color="#fff"
          @click.native.stop="sideNav = !sideNav"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="title">
          <router-link to="/" tag="span" style="cursor: pointer" class="title">
            <div class="logo-box">
              <img class="logo" src="../src/assets/images/nextAppLogo.png" />
            </div>
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
            ><v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <router-view />
      <!-- <DataStore class="temp" /> -->
      <!-- //? add temporary tag if drawer starts being open by default -->
      <v-navigation-drawer absolute dark v-model="sideNav" width="256">
        <v-list-item @click.native.stop="sideNav = !sideNav">
          <v-list-item-content>
            <v-list-item-title class="title">
              <v-icon left color="warning" style="cursor: pointer"
                >mdi-close</v-icon
              >
              Project Next App
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ this.userIsAuthenticated ? "Signed In" : "Not Signed In" }}
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
          <v-list-item
            v-show="this.userIsAuthenticated"
            dense
            nav
            link
            @click="signOut"
          >
            <v-list-item-icon>
              <v-icon left>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Log Out</v-list-item-content>
          </v-list-item>

          <!-- <v-list-item dense>
            <v-list-item-icon>
              <v-icon left>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{
              this.userIsAuthenticated ? "Signed In" : "Not Signed In"
            }}</v-list-item-content>
          </v-list-item> -->
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      loggedIn: false,
      right: null,
      sideNav: false,
      userProfileData: null,
    };
  },
  methods: {
    closeSideNav() {
      if (this.sideNav) {
        this.sideNav = false;
      }
    },
    signOut() {
      this.$store.dispatch("signOut");
      if (this.$route.name != "Home") {
        this.$router.push("/signup").catch((error) => {
          if (error.name == "NavigationDuplicated") {
            throw error;
          }
        });
      }
      this.sideNav = false;
    },
  },
  mounted() {
    (() => {
      axios
        .get(
          `https://v1.nocodeapi.com/bbass/airtable/OWBByjdlNVhiKRiR?tableName=Users&view=User%20Profiles`
        )
        .then(async (res) => {
          this.userProfileData = await res.data.records;
          // console.log(this.userProfileData);
        })
        .catch((err) => {
          console.error(err);
        });
    })();
  },
  watch: {
    routerWatch(from, to) {
      if (this.sideNav && from !== to) {
        this.sideNav = false;
      }
    },
    userIsAuthenticated() {
      if (!this.userIsAuthenticated && this.$route.path != "/") {
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapGetters(["user"]),
    routerWatch() {
      return this.$route.path;
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
    },
    menuItems() {
      if (this.userIsAuthenticated) {
        return [
          {
            icon: "mdi-information-outline",
            title: "About",
            link: "/about",
          },
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
            icon: "mdi-plus",
            title: "Next App",
            link: "/project/new",
          },
          {
            icon: "mdi-github",
            title: "Profile",
            link: "/profile/" + this.user.id,
          },
        ];
      } else {
        return [
          {
            icon: "mdi-github",
            title: "Sign in",
            link: "/signup",
          },
          // {
          //   icon: "mdi-github",
          //   title: "Sign in",
          //   link: "/signin",
          // },
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

@import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

* {
  font-family: "Fira Code", monospace;
}

a {
  color: white;
}

.logo-box {
  margin: auto;
  display: flex;
}

.logo {
  height: 50px;
  align-self: center;
}

.toolbar {
  height: 100px;
}

.title {
  color: #fff;
  font-family: monospace;
  text-decoration: none;
}
</style>