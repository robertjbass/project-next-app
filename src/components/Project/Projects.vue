<template>
  <div class="projects">
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
              md="6"
              v-for="project in sortedProjects"
              :key="project.id"
            >
              <ProjectCard :project="project" :rt="project.id" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
import ProjectCard from "@/components/Shared/ProjectCard.vue";
import _ from "lodash";

export default {
  name: "Projects",
  computed: {
    loadedProjects() {
      return this.$store.getters.loadedProjects;
    },
    sortedProjects() {
      return _.orderBy(this.loadedProjects, "created").reverse();
    },
  },
  components: {
    ProjectCard,
  },
};
</script>

<style scoped>
.all-projects {
  margin: 0 2.5%;
  align-items: stretch;
  margin: 0 2.5% 80px 2.5%;
}
</style>