<template>
  <div class="hackerProfile">
    <v-container class="top-spacing">
      <v-card dark class="card">
        <h1>Profile</h1>

        <!-- {{ this.id }} -->
        <!-- <pre align="left">{{ this.userData }}</pre> -->
        <!-- <br /> -->

        <div align="left">
          <!--  -->
          <!-- // todo: debug
          create an action to follow or unfollow using:
                //* this.$store.dispatch("followProject", projectId);
      //* this.$store.dispatch("unfollowProject", projectId);
           -->
          <!-- <v-btn @click="testDatabase">test</v-btn> -->
          <!--  -->
          <img class="avatar" width="15%" :src="userData.photoURL" /><br />
          <strong>Name: </strong>{{ userData.name }}<br />
          <div :show="userData.company">
            <strong>Company: </strong>{{ userData.company }}
          </div>
          <strong>Username: </strong>{{ userData.username }}<br />
          <strong>Email: </strong>{{ userData.userEmail }}<br />
          <strong>Location: </strong>{{ userData.location }}<br /><br />
          <strong>Bio: </strong>{{ userData.bio }}<br />
          <br />
          <strong>Twitter Handle: </strong>{{ userData.twitter_username }}<br />
          <strong>Public Repos: </strong>{{ userData.public_repos }}<br />
          <strong>GitHub Followers: </strong>{{ userData.followers }}<br />
        </div>
        <br />
        <div class="links" align="left">
          <!-- <a class="light-blue--text" :href="userData.repos_url" target="_blank"
            >My Repos</a
          ><br />
          <a class="light-blue--text" :href="userData.url" target="_blank"
            >My GitHub</a
          ><br />
          <a class="light-blue--text" :href="userData.gists_url" target="_blank"
            >My Gists</a -->
          <br />
          <!--  -->
          <a
            class="light-blue--text"
            :show="userData.blog"
            :href="this.blogUrl"
            target="_blank"
            >My Blog</a
          >
          <!-- <a
            class="light-blue--text"
            :show="userData.blog"
            :href="userData.blog"
            target="_blank"
            >My Blog</a
          > -->
          <br /><br />
          <!-- // todo - allow editing -->
          <div
            class="editButton"
            v-if="this.loggedInUser.id == this.userData.id"
          >
            <v-btn :disabled="true" @click="editProfile" color="secondary"
              ><v-icon left>mdi-pencil</v-icon>Edit</v-btn
            ><br /><br />
          </div>
          Projects:
          <div v-if="projectsByUser.length > 0">
            <div v-for="project in projectsByUser" :key="project.id">
              <router-link
                class="light-blue--text"
                :to="`../project/${project.id}`"
                >{{ project.title }}</router-link
              >
            </div>
          </div>
          <div v-else>No projects yet</div>
          <br />
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HackerProfile",
  props: ["id"],
  data() {
    return {
      hacker: null,
    };
  },
  // mounted() {
  //   this.$store.dispatch("setHackerProfile", this.id);
  // },
  methods: {
    // testDatabase() {
    // this.$store.dispatch("followProject", "u1iBIEKY0ueLnuz8hQqw");
    // this.$store.dispatch("unfollowProject", "u1iBIEKY0ueLnuz8hQqw");
    // },
    editProfile() {
      alert(
        "🐎🐎 Hold your horses, does this page look finished to you?... We're pulling this info from GitHub. You can't edit it here just yet - give it a few days 😉 Until then, you can edit your profile on GitHub"
      );
    },
  },
  computed: {
    blogUrl() {
      return "https://".concat(
        this.userData.blog
          .split("https://www.")
          .join("")
          .split("http://www.")
          .join("")
          .split("https://")
          .join("")
          .split("http://")
          .join("")
          .split("www.")
          .join("")
      );
    },

    loggedInUser() {
      return this.$store.getters.user;
    },

    user() {
      return this.$store.getters.hackers;
    },

    userData() {
      return this.user.filter((hacker) => hacker.id == this.id)[0];
    },

    userProjects() {
      return this.$store.getters.loadedProjects;
    },

    projectsByUser() {
      return this.userProjects.filter(
        (userProject) => userProject.creatorId == this.userData.id
      );
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.top-spacing {
  margin-top: 40px;
  padding: 0 5%;
}
.avatar {
  border-radius: 50%;
}
.card {
  padding: 5% 10%;
}
</style>