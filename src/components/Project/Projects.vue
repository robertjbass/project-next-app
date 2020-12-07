<template>
  <div class="projects">
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
import ProjectCard from "@/components/Shared/ProjectCard.vue";

export default {
  name: "Projects",
  computed: {
    loadedProjects() {
      return this.$store.getters.loadedProjects;
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
}
</style>