<template>
  <div class="home">
    <img src="../assets/images/project-next-app-banner-3.png" width="100%" />
    <v-container>
      <v-layout>
        <v-row justify="space-between">
          <v-col>
            <!-- color="accentRed" -->
            <v-btn class="page-btn" large router to="/projects">
              Explore Projects
            </v-btn>
          </v-col>
          <v-col>
            <!-- color="accentBlue" -->
            <v-btn
              class="page-btn"
              v-if="userIsAuthenticated"
              large
              router
              @click="toNextApp()"
            >
              Start a Project
            </v-btn>
            <!-- color="accentBlue" -->
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
      <!-- <div
        v-for="project in featuredProjects"
        :key="project.id"
        class="projectsToDisplay"
      >
        <ProjectCard :project="project" :rt="`./project/${project.id}`" />
      </div> -->
    </v-container>

    <v-layout class="all-projects">
      <!-- <v-row align="center"> -->
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="project in loadedProjects"
          :key="project.id"
        >
          <!-- <v-col
            cols="12"
            sm="8"
            md="6"
            lg="4"
            xl="4"
            offset-sm="2"
            offset-md="0"
            offset-lg="0"
            offset-xl="0"
            v-for="project in loadedProjects"
            :key="project.id"
          > -->
          <ProjectCard :project="project" :rt="`./project/${project.id}`" />
          <!-- <div class="project-display">
              <v-card dark>
                <div class="projects">
                  <h3
                    class="heading"
                    style="cursor: pointer"
                    @click="onLoadProject(project.id)"
                  >
                    {{ project.title }} by {{ project.username }}
                  </h3>
                  <div class="desc">
                    <img class="image" :src="project.imageUrl" />
                    <p class="description">{{ project.description }}</p>
                    <div>
                      <v-chip
                        dark
                        color="accentRed--lighten"
                        class="technologies"
                        v-for="technology in project.technologies"
                        :key="technology"
                        link
                        ><v-icon>{{ technology[0].concat(" ") }}</v-icon
                        >{{
                          technology.substr(1, technology.length - 1)
                        }}</v-chip
                      >
                    </div>
                  </div>
                </div>
              </v-card>
            </div> -->
        </v-col>
      </v-row>
    </v-layout>
    <!-- </v-container> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectCard from "@/components/Shared/ProjectCard.vue";
// import axios from "axios";
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
  /* display: flex; */
  /* flex-grow: 1; */
  /* margin: auto; */
  align-items: stretch;
  /* height: 100%; */
}

/* .project-display {
  width: 100%;
} */

/* .projects {
  background-color: #333;
  border: solid;
  border-width: 1px;
  padding: 30px;
} */
/* .desc {
  text-align: left;
}

.description {
  padding: 10px;
} */

/* .heading {
  padding-bottom: 10px;
  text-align: center;
}

.page-btn {
  width: 400px;
}

.image {
  max-width: 300px;
  min-width: 100px;
  display: flex;
  margin: auto;
  max-height: 200px;
} */

/* .page-btn {
  color: white;
} */
</style>