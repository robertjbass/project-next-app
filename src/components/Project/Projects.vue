<template>
  <div class="projects">
    <v-container class="top-spacing">
      <v-layout>
        <v-row justify="center">
          <v-col cols="10" sm="8" md="8" lg="6">
            <v-card
              dark
              class="card mx-auto"
              v-for="project in loadedProjects"
              :key="project.id"
            >
              <div class="card">
                <v-row>
                  <v-col align="center">
                    <v-card-title primary-title>
                      <div>
                        <h4 class="card-title">
                          <v-icon left> mdi-share-variant </v-icon
                          >{{ project.title }}
                        </h4>
                        <h5 class="card-title-subtitle">
                          {{ project.startDate | date }} -
                          {{ project.endDate | date }}
                        </h5>
                      </div>
                    </v-card-title>

                    <v-img
                      class="card-image"
                      width="300px"
                      :src="project.imageUrl"
                    >
                    </v-img>

                    <p class="description">{{ project.description }}</p>
                  </v-col>
                  <v-col>
                    <v-chip
                      dark
                      color="accentRed--lighten"
                      class="technologies"
                      v-for="technology in project.technologies"
                      :key="technology"
                      link
                      ><v-icon>{{ technology[0].concat(" ") }}</v-icon
                      >{{ technology.substr(1, technology.length - 1) }}</v-chip
                    >
                    <v-card-actions>
                      <v-btn elevation="0" :to="'/project/' + project.id">
                        <v-icon left>mdi-arrow-right-bold</v-icon>
                        Project Details</v-btn
                      >
                    </v-card-actions>
                  </v-col>
                </v-row>
              </div>
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
  name: "Projects",
  computed: {
    ...mapGetters(["loadedProjects", "loadedProject"]),
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
  width: 100%;
  padding: 20px;
  margin-bottom: 40px;
  padding: 0;
  /* margin: 0; */
}
/* .card-image {
} */
.top-spacing {
  margin-top: 40px;
}

.description {
  padding: 10px;
}
</style>