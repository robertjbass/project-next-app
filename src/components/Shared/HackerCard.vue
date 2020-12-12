<template>
  <div class="hackerCard">
    <v-card class="card" color="#333" dark>
      <v-icon left> mdi-bookmark-outline </v-icon>
      <!-- <span class="title font-weight-light">{{ hacker.username }}</span> -->

      <router-link
        :to="'/profile/' + hacker.id"
        style="cursor: pointer"
        class="title font-weight-light light-blue--text"
        >{{ hacker.username }}</router-link
      >

      <v-card-text align="left" class="headline font-weight-bold">
        {{ hacker.description }}
      </v-card-text>

      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img class="elevation-6" alt="" :src="hacker.avatar_url"></v-img>
        </v-list-item-avatar>
        <v-row class="name"
          ><h3>{{ hacker.name }}</h3></v-row
        >
      </v-list-item>
      <v-row
        ><v-icon left>mdi-bio</v-icon>
        <p style="margin: 0; padding: 0; text-align: left">
          {{ hacker.bio }}
        </p></v-row
      >
      <br />
      <v-row v-show="hacker.company"
        ><v-icon left>mdi-domain</v-icon> {{ hacker.company }}</v-row
      >
      <v-row><v-icon left>mdi-github</v-icon> {{ hacker.html_url }}</v-row>
      <v-row><v-icon left>mdi-account</v-icon> {{ hacker.login }}</v-row>
      <v-row v-show="hacker.twitter_username"
        ><v-icon left>mdi-twitter</v-icon> {{ hacker.twitter_username }}</v-row
      >
      <v-row v-if="hacker.blog"
        ><v-icon left>mdi-link-box-outline</v-icon
        ><a class="light-blue--text" :href="blogUrl">{{
          hacker.blog.split("https://www.").join("")
        }}</a></v-row
      >
      <!-- <v-row><strong>Email:</strong> {{ ' '.concat(hacker.email }}</v-row> -->
      <!-- Above (BAD) Below (Good) -->
      <!-- <v-row><strong>Email:</strong> {{ hacker.userEmail }}</v-row> -->
      <v-row
        ><v-icon left>mdi-email-outline</v-icon> {{ hacker.userEmail }}</v-row
      ><br />
      <v-row> {{ hacker.followers }} Followers</v-row>
      <v-row> {{ hacker.public_repos }} Public Repos</v-row>
      <br />
      <h3 align="left">
        {{ projects.length }}
        {{ projects.length == 1 ? "Project" : "Projects" }}
      </h3>
      <v-row v-for="project in projects" :key="project.id">
        <router-link class="light-blue--text" :to="'/project/' + project.id">{{
          project.title
        }}</router-link>
        <div class="duration">
          {{ project.created | date }} - {{ project.projectDuration }}
        </div>
      </v-row>
      <v-row justify="end">
        <v-icon class="mr-1"> mdi-heart-outline </v-icon>
        <div class="subheading mr-2">{{ hacker.likeCount }}</div>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "HackerCard",
  props: {
    hacker: {
      type: Object,
    },
  },
  computed: {
    blogUrl() {
      return "https://".concat(
        this.hacker.blog
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

    avatarUrl() {
      return "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light";
    },
    projects() {
      return this.$store.getters.loadedProjects.filter(
        (project) => project.creatorId == this.hacker.id
      );
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

* {
  font-family: "Fira Code", monospace;
}

h3 {
  padding: 0;
  margin: 0;
}

h4,
h5 {
  margin: 0;
}

v-icon,
strong {
  padding-right: 10px;
}

a {
  text-decoration: none;
}

.name {
  margin: auto;
}

.duration {
  padding-left: 20px;
}

.hackerCard {
  width: 100%;
  /* margin: 5%; */
}
.card {
  background-color: #333;
  /* padding: 5%; */
  padding: 40px;
  margin-bottom: 40px;
  /* margin: 5%; */
}
.top-spacing {
  margin-top: 40px;
}

.headline {
  padding-left: 80px;
}
</style>