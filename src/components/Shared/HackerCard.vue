<template>
  <div class="hackerCard">
    <v-card class="card mx-auto" color="#333" dark>
      <v-card-title>
        <v-icon large left> mdi-bookmark-outline </v-icon>
        <!-- <v-icon large left> mdi-bookmark </v-icon> -->
        <span class="title font-weight-light">{{ hacker.username }}</span>
      </v-card-title>

      <v-card-text align="left" class="headline font-weight-bold">
        {{ hacker.description }}
      </v-card-text>

      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img class="elevation-6" alt="" :src="hacker.avatar_url"></v-img>
        </v-list-item-avatar>
        <v-row
          ><v-list-item-title>{{ hacker.name }}</v-list-item-title></v-row
        > </v-list-item
      ><v-list-item>
        <v-row
          ><v-col>{{ hacker.bio }}</v-col></v-row
        >
      </v-list-item>
      <div>
        <v-row><strong>Company: </strong>{{ hacker.company }}</v-row>
        <v-row><strong>GitHub: </strong>{{ hacker.html_url }}</v-row>
        <v-row><strong>Username: </strong>{{ hacker.login }}</v-row>
        <v-row><strong>Name: </strong>{{ hacker.name }}</v-row>

        <v-row
          ><strong>Public Repos ({{ hacker.public_repos }}): </strong
          >{{ hacker.repos_url }}</v-row
        >
        <v-row
          ><strong>Twitter Handle: </strong>{{ hacker.twitter_username }}</v-row
        >
        <v-row><strong>Email: </strong>{{ hacker.email }}</v-row>
      </div>
      <v-row align="center" justify="end">
        <v-icon class="mr-1"> mdi-heart </v-icon>
        <span class="subheading mr-2">{{ hacker.likeCount }}</span>
      </v-row>
      <!-- </v-card-actions> -->
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
    avatarUrl() {
      return "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light";
    },
  },
};
</script>

<style scoped>
h4,
h5 {
  margin: 0;
}
.card {
  background-color: #333;
  padding: 5px;
  padding: 20px;
  margin-bottom: 40px;
}
.top-spacing {
  margin-top: 40px;
}

.headline {
  padding-left: 80px;
}
</style>