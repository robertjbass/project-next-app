<template>
  <div class="hackers">
    <v-container class="top-spacing">
      <h1>Hackers</h1>
      <v-layout>
        <v-row justify="center">
          <v-col cols="10" sm="8" md="8" lg="6">
            <v-card
              v-for="hacker in hackers"
              :key="hacker.id"
              class="card mx-auto"
              color="#333"
              dark
            >
              <v-card-title>
                <v-icon large left> mdi-bookmark-outline </v-icon>
                <!-- <v-icon large left> mdi-bookmark </v-icon> -->
                <span class="title font-weight-light">{{
                  hacker.username
                }}</span>
              </v-card-title>

              <v-card-text align="left" class="headline font-weight-bold">
                {{ hacker.description }}
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img class="elevation-6" alt="" :src="avatarUrl"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content align="left">
                    <v-list-item-title>{{ hacker.name }}</v-list-item-title>
                  </v-list-item-content>

                  <v-row align="center" justify="end">
                    <v-icon class="mr-1"> mdi-heart </v-icon>
                    <span class="subheading mr-2">{{ hacker.likeCount }}</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Hackers",
  data() {
    return {
      hackers: [
        {
          id: "1",
          imageUrl: `https://dummyimage.com/600x400/00f4f4/000.png&text=UberTeleport`,
          username: "716green",
          name: "Bob Bass",
          description: "A developer...",
          technologies: [
            "JavaScript",
            "MariaDB",
            "Firebase",
            "Nginx",
            "Cloud Functions",
            "Vue.js",
          ],
          githubRepo: "github.com/a/b",
          productPage: "coda.io/@narro/abcdefg",
          startDate: "2021-01-20",
          endDate: "2021-12-01",
          goals: "Learn Stuff",
          projectDuration: "7 Days",
          likeCount: 30,
        },
        {
          id: "2",
          imageUrl:
            "https://dummyimage.com/600x400/cf78cf/000.png&text=TierZooDaily",
          username: "PotatoBug111",
          name: "Sam Salmon",
          description: "A developer...",
          technologies: ["C++", "GPT-3", "Tensorflow"],
          githubRepo: "github.com/a/b",
          productPage: "coda.io/@narro/abcdefg",
          startDate: "2021-01-20",
          endDate: "2021-12-02",
          goals: "Learn Stuff",
          projectDuration: "7 Days",
          likeCount: 9,
        },
        {
          id: "3",
          imageUrl: `https://dummyimage.com/600x400/5cf/fff.png&text=Pigma`,
          username: "WebMaster2021",
          name: "Fiona Flounder",
          description: "A developer...",
          technologies: ["WebGL", "MongoDB", "Java"],
          githubRepo: "github.com/a/b",
          productPage: "coda.io/@narro/abcdefg",
          startDate: "2021-01-20",
          endDate: "2021-12-02",
          goals: "Learn Stuff",
          projectDuration: "7 Days",
          likeCount: 6,
        },
        {
          id: "4",
          imageUrl:
            "https://dummyimage.com/600x400/cf78cf/fff.png&text=MoonwalkShoes",
          username: "Jackson5",
          name: "Tammy Trout",
          description: "A developer...",
          technologies: ["HTML", "CSS", "PHP"],
          githubRepo: "github.com/a/b",
          productPage: "coda.io/@narro/abcdefg",
          startDate: "2021-01-20",
          endDate: "2021-12-02",
          goals: "Learn Stuff",
          projectDuration: "7 Days",
          likeCount: 22,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["loadedProjects", "loadedProject"]),
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