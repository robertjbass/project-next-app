<template>
  <div class="home">
    <img src="../assets/images/project-next-app-banner-3.png" width="100%" />
    <v-container>
      <v-layout>
        <v-row justify="space-between">
          <v-col>
            <v-btn class="page-btn" large router to="/projects">
              Explore Projects
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              class="page-btn"
              v-if="userIsAuthenticated"
              large
              router
              @click="toNextApp()"
            >
              Start a Project
            </v-btn>
            <v-btn class="page-btn" v-else large router to="/signup">
              Get Started
            </v-btn>
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
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="purple"
          ></v-progress-circular>
          <v-carousel-item
            v-for="project in featuredProjects"
            :key="project.id"
            :src="project.imageUrl"
            @click="onLoadProject(project.id)"
            hide-on-leave
          >
            <div class="title">{{ project.title }}</div>
            <div class="user">{{ project.username }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-layout>
    </v-container>

    <v-layout class="all-projects">
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="project in loadedProjects"
          :key="project.id"
        >
          <ProjectCard :project="project" :rt="`./project/${project.id}`" />
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectCard from "@/components/Shared/ProjectCard.vue";

export default {
  name: "Home",
  data() {
    return {
      model: 0,
    };
  },
  methods: {
    onLoadProject(id) {
      this.$router.push("/project/" + id);
    },
    toNextApp() {
      this.$router.push("/project/new/");
    },
  },
  components: {
    ProjectCard,
  },
  computed: {
    ...mapGetters([
      "featuredProjects",
      "loadedProject",
      "loadedProjects",
      "user",
      "loading",
    ]),
    projects() {
      return this.featuredProjects;
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
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
  padding-bottom: 50px;
}

.title {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 5px;
}

.all-projects {
  margin: 0 2.5%;
  align-items: stretch;
}
</style>