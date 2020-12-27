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
      <InfoBannerMini />
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
    <h2>Recent Projects</h2>
    <v-layout class="all-projects">
      <v-row>
        <v-col
          cols="12"
          xs="12"
          sm="10"
          md="10"
          lg="8"
          offset-sm="1"
          offset-md="1"
          offset-lg="2"
          offset-xl="2"
        >
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
              offset-lg="0"
              offset-xl="0"
              v-for="project in sortedProjects"
              :key="project.id"
            >
              <ProjectCard :project="project" :rt="project.id" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-layout>
    <v-row>
      <v-col>
        <router-link style="text-decoration: none" to="/projects" align="center"
          ><v-btn>See More...</v-btn></router-link
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectCard from "@/components/Shared/ProjectCard.vue";
import InfoBannerMini from "@/components/About/InfoBannerMini.vue";
import _ from "lodash";

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
    InfoBannerMini,
  },
  computed: {
    ...mapGetters([
      "featuredProjects",
      "loadedProject",
      "loadedProjects",
      "user",
      "loading",
      "featuredExtended",
    ]),
    sortedProjects() {
      return _.orderBy(this.loadedProjects, "created").reverse();
    },
    projects() {
      return this.featuredProjects;
    },
    userIsAuthenticated() {
      return this.user !== null && this.user !== undefined;
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
  margin: 0 2.5% 20px 2.5%;
  padding: 0 0 20px 0;
  align-items: stretch;
}
</style>