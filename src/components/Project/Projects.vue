<template>
  <div class="projects">
    <v-container class="top-spacing">
      <v-layout>
        <v-row>
          <v-card
            dark
            class="card"
            v-for="project in loadedProjects"
            :key="project.id"
          >
            <div class="card">
              <v-container fluid>
                <v-layout>
                  <v-row>
                    <v-col
                      cols="4"
                      sm="4"
                      md="4"
                      lg="3"
                      xl="3"
                      offset-md="2"
                      offset-lg="2"
                    >
                      <v-img
                        class="card-image"
                        :src="project.imageUrl"
                        height="130px"
                      >
                      </v-img>
                    </v-col>
                    <v-col cols="7" sm="6" md="4" lg="4">
                      <v-card-title primary-title>
                        <div>
                          <h4 class="card-title">{{ project.title }}</h4>
                          <h5 class="card-title-subtitle">
                            {{ project.endDate | date }}
                          </h5>
                        </div>
                      </v-card-title>
                      <v-card-actions
                        ><v-btn elevation="0" :to="'/project/' + project.id">
                          <v-icon left>mdi-arrow-right-bold</v-icon>
                          Project Details</v-btn
                        ></v-card-actions
                      >
                    </v-col>
                  </v-row>
                </v-layout>
              </v-container>
            </div>
          </v-card>
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
}
.top-spacing {
  margin-top: 40px;
}
</style>