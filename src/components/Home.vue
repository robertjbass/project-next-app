<template>
  <div class="home">
    <img src="../assets/images/project-next-app-banner-3.png" />
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
              to="/project/new"
            >
              Start a Project
            </v-btn>
            <!-- color="accentBlue" -->
            <v-btn class="page-btn" v-else large router to="/signup">
              Start
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
        <v-row align="center">
          <v-col
            cols="12"
            sm="9"
            offset-sm="2"
            offset-md="0"
            offset-lg="0"
            offset-xl="0"
            md="6"
            lg="4"
            xl="4"
            v-for="project in loadedProjects"
            :key="project.id"
          >
            <!--   -->
            <div class="project-display">
              <!-- height="600px" -->
              <v-card dark>
                <div class="projects">
                  <h3
                    class="heading"
                    style="cursor: pointer"
                    @click="onLoadProject(project.id)"
                  >
                    {{ project.title }} by {{ project.username }}
                  </h3>
                  <!-- <br /> -->
                  <div class="desc">
                    <img :src="project.imageUrl" width="100%" />
                    <p>{{ project.description }}</p>
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
                  <!-- <br /> -->
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  },
  computed: {
    ...mapGetters([
      "featuredProjects",
      "loadedProject",
      "loadedProjects",
      "user",
    ]),
    projects() {
      return this.featuredProjects;
      // return this.$store.getters.featuredProjects;
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
  margin: 0 5%;
  display: flex;
}

.project-display {
  margin: auto;
  text-align: left;
}
.projects {
  background-color: #333;
  border: solid;
  border-width: 1px;
  padding: 30px;
  height: 600px;
}
.desc {
  text-align: left;
}

.heading {
  padding-bottom: 10px;
  text-align: center;
}

.page-btn {
  width: "400px";
}

/* .page-btn {
  color: white;
} */
</style>