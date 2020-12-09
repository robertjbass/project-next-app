<template>
  <div class="project">
    <v-container>
      <!-- <UpdateForm :editDialog="editDialog" /> -->
      <Alert v-show="error" :text="error" />

      <v-card dark class="card">
        <div class="heading">
          <h4 v-if="project.title" align="center">
            {{ project.title }} by {{ project.name }}
          </h4>
          <div class="stars" v-if="repoData">
            <v-icon color="accentRed">mdi-star</v-icon
            >{{ repoData.stargazers_count || "" }}
          </div>
        </div>
        <div class="subtitle">
          <v-icon large class="gh-icon" dark>mdi-github</v-icon>
          <div class="username">{{ project.username || "" }}</div>
        </div>
        <h4>
          {{ project.created | date }} -
          {{ project.projectDuration }}
        </h4>
        <div
          class="banner-image"
          :style="`background-image:url('${project.imageUrl}')`"
        ></div>
        <br />
        <h4>Goals</h4>
        <p align="left">{{ project.goals }}</p>
        <br />
        <h4 align="left">Technologies</h4>
        <v-chip
          color="#fd0435"
          label
          link
          class="technologies"
          small
          v-for="technology in project.technologies"
          :key="technology"
          >{{ technology }}</v-chip
        >
        <br />
        <br />
        <div class="repoData" v-if="repoData">
          <h5>Primary Repo Language: {{ repoData.language || "" }}</h5>
          <br />
        </div>

        <div class="description">
          <h4 align="left">Description</h4>
          {{ project.description }}
        </div>
        <br />
        <div class="links">
          <div v-show="project.productPage" class="product-link">
            <v-icon dark>mdi-link</v-icon
            ><a :href="project.productPage" class="light-blue--text"
              >Project URL</a
            >
          </div>
          <div v-if="project.githubRepo" class="gh-link">
            <v-icon dark>mdi-github</v-icon
            ><a :href="project.githubRepo" class="light-blue--text"
              >GitHub Repo</a
            >
            <br /><br />
          </div>
        </div>
        <div class="projectBelongsToLoggedInUser" v-if="projectBelongsToLoggedInUser">
          <div class="edit">
            <EditButtons
            :thisUser="projectBelongsToLoggedInUser"
              :project="project"
              :user="user"
              v-on:edit="onEditClicked"
              v-on:reportUpdate="newUpdate"
              >{{ editDialog ? "Close Edit" : "Edit" }}</EditButtons
            >
            <div class="updateForm">
              <UpdateForm
              :thisUser="projectBelongsToLoggedInUser"
                :id="this.id"
                v-show="editDialog"
                :project="project"
                v-on:updateProject="this.updateProject"
              />
            </div>
          </div>
        </div>
        <br /><br />
        <div v-if="repoData">
          <!-- {{ project.githubRepo }} -->
          <!-- <pre align="left">
          {{ repoData }}
          </pre> -->
          <h3 align="left">README.md</h3>
          <hr />
          <div>
            <pre class="readme" align="left">
            <code>{{ this.readme }}
            </code>
            </pre>
          </div>
          <hr />
          <br />
          <div class="comment-btn-box" align="right">
            <v-btn class="comment-btn" @click="comment">Comment</v-btn>
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Alert from "@/components/Shared/Alert.vue";
import EditButtons from "@/components/Shared/EditButtons.vue";
import UpdateForm from "@/components/Project/UpdateForm.vue";
export default {
  name: "Project",
  data() {
    return {
      editDialog: false,
      error: null,
      repoData: null,
      readme: null,
    };
  },
  props: ["id"],
  methods: {
    updateProject() {
      // console.log("Update Project");
      console.log("UPDATE SUBMISSION MADE");
    },
    onEditClicked() {
      // alert("Edit Clicked");
      this.editDialog = !this.editDialog;
    },
    newUpdate() {
      alert("Report New Update");
    },
    getGitHubInfo() {
      let ghUsername = this.project.username;
      let repo = this.project.githubRepo;
      repo = repo
        .split("https://www.github.com/")
        .join("")
        .split("https://github.com/")
        .join("")
        .split("github.com/")
        .join("");
      repo = repo.split("/")[1];
      repo = repo.split(" ")[0];
      console.log(ghUsername);

      axios
        .get(`https://api.github.com/repos/${this.project.username}/${repo}`)
        .then((results) => {
          try {
            console.log(results.data);
            this.repoData = results.data;
            this.getReadme();
          } catch {
            console.log("unable to reach github");
          }
        })
        .catch(() => {
          console.log(
            "Unable to reach repo - repo doesn't exist or is set to private"
          );
          this.error =
            "Unable to reach repo - repo doesn't exist or is set to private";
        });
    },
    getReadme() {
      axios
        .get(
          `https://raw.githubusercontent.com/${this.repoData.full_name}/${this.repoData.default_branch}/README.md`
        )
        .then((res) => {
          this.readme = res.data;
          // this.renderMD();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    comment() {
      alert(
        "We know you're excited to comment - but we didn't finish that feature yet. Try Slack instead!"
      );
    },
    // renderMD() {
    //   let params = {
    //     text: this.readme,
    //     mode: "markdown",
    //   };
    //   axios
    //     .post(`https://api.github.com/markdown/raw`, { params })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // },
  },
  mounted() {
    this.getGitHubInfo();
  },
  computed: {
    projectBelongsToLoggedInUser() {
      return this.project.creatorId == this.user.id
    },
    project() {
      return this.$store.getters.loadedProject(this.id);
    },
    user() {
      return this.$store.getters.user;
    },
  },
  components: {
    Alert,
    EditButtons,
    UpdateForm,
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
/* .title-image {
  max-width: 100%;
} */

/* .banner-image {
  width: 100%;
} */

.repoData {
  text-align: left;
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

a {
  text-decoration: none;
  color: white;
}

/* .debug {
  text-align: left;
} */

.projectCard {
  border: white solid 2px;
  width: 100%;
  background-color: #333;
  margin: 20px 0;
  height: 100%;
}

/* // todo this word wrap isn't working so I cut it off instead  */
.readme {
  contain: content;
  display: flex;
  /* flex: wrap; */
  white-space: wrap;
  background-color: #fbe5e150;
  /* width: 100%; */
  /* word-wrap: break-word; */
  /* margin: auto; */
}

.transparent {
  background-image: linear-gradient(#111111cc, #333333cc);
  border-radius: 1.2rem;
  width: 100%;
}

.banner-image {
  width: 100%;
  position: static;
  height: 250px;
  background-size: cover;
  background-size: 100%;
  background-position: right 0px bottom 50%;
}

.dates {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border: solid rgb(87, 81, 81) 2px;
  font-size: 1.1em;
  border-radius: 0.2em;
  width: 300px;
  margin: 0;
  display: flex;
  padding: 0;
  justify-content: center;
}

.tech-wrap {
  min-width: 100px;
}

.technologies {
  position: relative;
  flex: wrap;
  color: #ffffff;
  width: 115px;
  font-size: 1rem;
  justify-content: center;
  margin: 5px;
}

.heading {
  padding: 10px 0;
  width: 70%;
  display: flex;
  margin: auto;
}

.stars {
  width: 20%;
}

.subtitle {
  display: flex;
  padding: 0;
}

.gh-icon {
  padding: 0;
  padding-left: 10px;
  width: 5%;
}

.username {
  padding: 0 0 0 15px;
  text-align: left;
  width: 45%;
  align-self: center;
  font-weight: 550;
}

.description {
  font-size: large;
  text-align: left;
}

.links {
  padding: 0;
  display: flex;
}

.product-link,
.gh-link {
  width: 50%;
}

.goals {
  text-align: left;
}
</style>