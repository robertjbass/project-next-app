<!-- //! DEPRICATED - moved to /profile/:user.id with conditional edit info -->
<template>
  <div class="profile">
    <!-- <v-container class="top-spacing">
      <v-card dark class="card">
        <h1>Profile</h1>
        <br />
        <div align="left">
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
          <a
            class="light-blue--text"
            :show="userData.blog"
            :href="userData.blog"
            target="_blank"
            >My Blog</a
          ><br /><br />
          <v-btn :disabled="true" @click="editProfile" color="secondary"
            ><v-icon left>mdi-pencil</v-icon>Edit</v-btn
          ><br /><br />
          Projects:
          <div v-for="project in projectsByUser" :key="project.id">
            <router-link
              class="light-blue--text"
              :to="`./project/${project.id}`"
              >{{ project.title }}</router-link
            >
          </div>
          <br />
        </div>
      </v-card>
    </v-container> -->
  </div>
</template>

<script>
// export default {
//   name: "Profile",
//   methods: {
//     editProfile() {
//       alert(
//         "🐎🐎 Hold your horses, does this page look finished to you?... We're pulling this info from GitHub. You can't edit it here just yet - give it a few days 😉 Until then, you can edit your profile on GitHub"
//       );
//     },
//   },
//   computed: {
//     userData() {
//       return this.$store.getters.user;
//     },
//     userProjects() {
//       return this.$store.getters.loadedProjects;
//     },
//     projectsByUser() {
//       return this.userProjects.filter(
//         (userProject) => userProject.creatorId == this.userData.id
//       );
//     },
//   },
// };
</script>

<style scoped>
/* a {
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
} */
</style>