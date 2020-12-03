<template>
  <div class="home">
    <img src="../assets/images/project-next-app-banner-3.png" />
    <v-container>
      <v-layout>
        <v-row justify="space-between">
          <v-col>
            <v-btn large router to="/projects"> Explore Projects </v-btn>
          </v-col>
          <v-col>
            <v-btn large router to="/projects/new"> Start a Project </v-btn>
          </v-col>
        </v-row>
      </v-layout>
      <h1>Featured Projects</h1>
      <v-layout class="carousel" style="cursor: pointer">
        <v-carousel
          v-model="model"
          :show-arrows="false"
          cycle
          class="carousel"
          height="400"
        >
          <v-carousel-item
            v-for="project in featuredProjects"
            :key="project.id"
            :src="images"
            @click="onLoadProject(project.id)"
            hide-on-leave
          >
            <div class="title">{{ project.title }}</div>
            <div class="user">{{ project.username }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-layout>
      <v-layout class="all-projects">
        <v-row>
          <div
            v-for="project in loadedProjects"
            :key="project.id"
            width="40%"
            class="project-display"
          >
            <h3>{{ project.title }} by {{ project.username }}</h3>
            <br />
            <div class="desc">
              <p class="desc">{{ project.description }}</p>
              <br />
              <v-chip
                ma-2
                class="technologies"
                v-for="technology in project.technologies"
                :key="technology"
                link
                ><v-icon>{{ technology[0].concat(" ") }}</v-icon
                >{{ technology.substr(1, technology.length - 1) }}</v-chip
              >
            </div>
            <br />
          </div>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// import Profile from "@/components/Profile.vue";
import { mapGetters } from "vuex";
// import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      model: 0,
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    };
  },
  methods: {
    onLoadProject(id) {
      this.$router.push("/project/" + id);
    },
  },
  computed: {
    ...mapGetters(["featuredProjects", "loadedProject", "loadedProjects"]),
    projects() {
      return this.featuredProjects;
      // return this.$store.getters.featuredProjects;
    },
    images() {
      return `https://dummyimage.com/2:2x1080/${
        this.projects[this.model].bgColor
      }/${this.projects[this.model].fontColor}.jpg&text=${
        this.projects[this.model].title
      }`;
    },
  },
};
</script>

<style scoped>
.user {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1.5em;
  padding: 5px;
}

.carousel {
  padding-bottom: 100px;
}

.title {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 5px;
}

.all-projects {
  margin: 0 5%;
  display: flex;
}

.project-display {
  margin: auto;
  text-align: left;
  height: 250px;
  padding-bottom: 100px;
}

.desc {
  max-width: 300px;
  text-align: left;
}
</style>