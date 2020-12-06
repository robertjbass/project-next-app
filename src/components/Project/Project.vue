<template>
  <div class="project">
    <v-container>
      <v-card dark>
        <div class="card">
          <v-card-title>
            <div class="title-image">
              <h4>{{ loadedProject.title }}</h4>
              <br />
              <v-img class="card-image" :src="loadedProject.imageUrl"> </v-img>
            </div>
            <div class="project-info">
              <h4>
                {{ loadedProject.created | date }} -
                {{ loadedProject.projectDuration }}
                <!-- {{ loadedProject.endDate | date }} -->
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
                  <v-col cols="12" margin="auto">
                    <div class="comment-btn-box" align="right">
                      <v-btn class="comment-btn">Comment</v-btn>
                    </div>
                  </v-col>
                </v-row>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-card-text align="left" class="card-text">
                <div class="readme">
                  <h4>Goals</h4>
                  <p>{{ loadedProject.goals }}</p>
                  <strong>GitHub: </strong
                  ><a :href="loadedProject.githubRepo" target="_blank">{{
                    loadedProject.githubRepo
                  }}</a>
                  <br /><br /><strong>Product Page: </strong
                  ><a :href="loadedProject.productPage" target="_blank"
                    >{{ loadedProject.productPage }}<br /><br
                  /></a>
                  <strong>GitHub: </strong>{{ loadedProject.description
                  }}<br /><br />
                  <strong>GitHub: </strong>{{ loadedProject.description
                  }}<br /><br />
                  <strong>GitHub: </strong>{{ loadedProject.description
                  }}<br /><br />
                  <strong>Placeholder for README.md on GitHub</strong> Lorem
                  ipsum dolor sit amet consectetur, adipisicing elit. Illum
                  officiis, harum provident facere voluptatem quam deserunt
                  debitis ipsa, nisi quis deleniti cupiditate voluptatum amet
                  animi doloribus excepturi. Omnis, blanditiis adipisci.
                </div>
              </v-card-text>
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
a {
  text-decoration: none;
  color: accent-blue;
}

h4,
h5 {
  margin: auto;
  display: flex;
  align-self: left;
}
.title-image {
  /* padding: 100px; */
  max-width: 100%;
}
.card {
  background-color: #333;
  padding: 5px;
  width: 100%;
  padding: 20px;
  height: 100%;
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