<template>
  <div class="profile">
    <v-container class="top-spacing">
      <v-card dark height="1000">
        <h1>The User Profile Page</h1>
        <br />
        <!-- <h3>will be ready in a day or 2 😉</h3> -->
        <!-- <pre align="left">
        {{ userData }}
        </pre> -->
        <div align="left">
          <img width="25%" :src="userData.photoURL" /><br />
          Name: {{ userData.name }}<br />
          <div :show="userData.company">Company: {{ userData.company }}</div>
          Username: {{ userData.username }}<br />
          Email: {{ userData.email }}<br />
          Location: {{ userData.location }}<br /><br />
          Bio: {{ userData.bio }}<br />
          <br />
          Twitter Handle: {{ userData.twitter_username }}<br />
          Public Repos: {{ userData.public_repos }}<br />
          GitHub Followers: {{ userData.followers }}<br />
          <!-- avatar_url: -->
          <!-- <img :src="userData.avatar_url" /> public gists count: -->
          <!-- {{ userData.public_gists }} -->
          <a class="light-blue--text" :href="userData.repos_url">My Repos</a
          ><br />
          <a class="light-blue--text" :href="userData.url">My GitHub</a><br />
          <a class="light-blue--text" :href="userData.gists_url">My Gists</a
          ><br />
          <a
            class="light-blue--text"
            :show="userData.blog"
            :href="userData.blog"
            >My Blog</a
          ><br /><br />
          <v-btn @click="editProfile" color="secondary"
            ><v-icon left>mdi-pencil</v-icon>Edit</v-btn
          ><br /><br />
          Projects: {{ userData.projects }}<br />
        </div>

        <!-- <div class="userInfo" v-for="(data, i) in userData" :key="i">
          {{ data.name }}
        </div> -->
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Profile",
  methods: {
    editProfile() {
      alert(
        "🐎🐎 Hold your horses, does this page look finished to you?... We're pulling this info from GitHub. You can't edit it here just yet - give it a few days 😉 Until then, you can edit your profile on GitHub"
      );
    },
  },
  computed: {
    userData() {
      return this.$store.getters.user;
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
}
</style>