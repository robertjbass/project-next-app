import { mapGetters } from 'vuex';
<template>
  <div class="project">
    <v-container>
      <v-card dark>
        <div class="card">
          <v-card-title>
            <div class="title-image">
              <h4>{{ loadedProject.title }}</h4>
              <br />
              <v-img
                class="card-image"
                :src="loadedProject.imageUrl"
                height="130px"
              >
              </v-img>
            </div>
            <div class="project-info">
              <h4>
                {{ loadedProject.startDate }} - {{ loadedProject.endDate }}
              </h4>
              <h5>Technologies</h5>
              <v-chip
                v-for="technology in loadedProject.technologies"
                link
                :key="technology"
                >{{ technology }}</v-chip
              >
            </div>
            <v-card-text align="left" class="card-text">
              {{ loadedProject.description }}
            </v-card-text>
            <div>
              <v-card-actions>
                <v-row>
                  <!-- <v-col cols="12"></v-col> -->
                  <!-- <v-spacer></v-spacer> -->
                  <v-col cols="12" offset="8" margin="auto">
                    <div class="comment-btn-box" align="right">
                      <v-btn class="comment-btn">Comment</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card-actions>
            </div>
          </v-card-title>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Project",
  props: ["id"],
  computed: {
    loadedProject() {
      return this.$store.getters.loadedProject(this.id);
    },
  },
};
</script>

<style scoped>
h4,
h5 {
  margin: auto;
  display: flex;
  align-self: left;
}
.title-image {
  padding-right: 10px;
  max-width: 400px;
}
.card {
  background-color: #333;
  padding: 5px;
  width: 100%;
  padding: 20px;
}

.card-text {
  padding: 10px 0;
}

.project-info {
  padding-left: "10";
}

.comment-btn-box {
  display: flex;
  margin: auto;
  padding: 0;
}
</style>