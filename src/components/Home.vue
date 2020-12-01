<template>
  <div class="home">
    <v-container>
      <v-layout>
        <v-row row wrap>
          <v-flex class="">
            <v-btn large router to="/projects"> Explore Projects </v-btn>
          </v-flex>
          <v-flex class=".col-12 .col-sm-6 .col-md-8 text-center .float-left">
            <v-btn large router to="/projects/new"> Start a Project </v-btn>
          </v-flex>
        </v-row>
      </v-layout>
      <!--  -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-carousel v-model="model">
            <v-carousel-item
              v-for="project in projects"
              :key="project.imageUrl"
              :src="project.id"
            >
              <!-- <v-sheet :color="color" height="100%" tile> -->
              <!-- <v-row class="fill-height" align="center" justify="center"> -->
              <div class="title">{{ project.title }}</div>
              <!-- </v-row> -->
              <!-- </v-sheet> -->
            </v-carousel-item>
          </v-carousel>
        </v-flex></v-layout
      >
      <!--  -->
    </v-container>
  </div>
</template>

<script>
// import Profile from "@/components/Profile.vue";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      model: 0,
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      projects: [
        {
          id: "123",
          title: "UberTeleport",
          bgColor: "cf78cf",
          fontColor: "fff",
          imageUrl: `https://dummyimage.com/600x400/cf78cf/fff.png&text=UberTeleport`,
        },
        {
          id: "124",
          title: "TierZooDaily",
          bgColor: "green",
          fontColor: "fff",
          imageUrl: `https://dummyimage.com/600x400/cf78cf/fff.png&text=UberTeleport2`,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
.title {
  position: absolute;
}
/*  */
</style>