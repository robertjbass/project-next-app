<template>
  <div class="project">
    <v-container>
      <Alert v-show="error" :text="error" />
      <v-card dark class="card">
        <div class="heading">
          <h4 v-if="project.title" align="center">
            {{ project.title }} by {{ project.name }}
          </h4>
        </div>
        <div class="subtitle">
          <v-icon large class="gh-icon" dark>mdi-github</v-icon>
          <div class="username">
            {{ project.username || "" }}<br /><v-icon small left color="yellow"
              >mdi-star</v-icon
            >{{ repoData ? repoData.stargazers_count : "" }}
          </div>
          <div class="stars" v-if="repoData"></div>
          <app-project-follow-dialog :project="project" />
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
            ><a
              :href="project.productPage"
              target="_blank"
              class="light-blue--text"
              >Project URL</a
            >
          </div>
          <div v-if="project.githubRepo" class="gh-link">
            <v-icon dark>mdi-github</v-icon
            ><a
              :href="project.githubRepo"
              target="_blank"
              class="light-blue--text"
              >GitHub Repo</a
            >
            <br /><br />
          </div>
        </div>

        <div
          class="projectBelongsToLoggedInUser"
          v-if="projectBelongsToLoggedInUser"
        >
          <div class="edit">
            <EditButtons
              :thisUser="projectBelongsToLoggedInUser"
              :project="project"
              :user="user"
              v-on:edit="onEditClicked"
              v-on:reportUpdate="newUpdate"
              >{{ editDialog ? "Close Edit" : "Edit" }}</EditButtons
            >
            <div v-if="projectBelongsToLoggedInUser" class="update-form">
              <UpdateForm
                :thisUser="projectBelongsToLoggedInUser"
                :id="id"
                v-if="editDialog"
                :project="project"
                v-on:updateProject="updateProject"
                v-on:closeForm="onSubmitClicked"
              />
            </div>
            <br />
            <h3>Update Log</h3>
            <div class="update-log">
              <v-row v-of="numberOfComments > 0">
                <v-col cols="8" offset="2" align="center">
                  <v-simple-table>
                    <thead>
                      <tr v-show="numberOfComments">
                        <th><v-icon left>mdi-note-text</v-icon>Update Log</th>
                        <th class="text-left">Date</th>
                        <th class="text-left">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Project Created - {{ project.projectDuration }}</td>
                        <td class="text-left">
                          {{ project.created | date }}
                        </td>
                        <td class="text-left">Project Created</td>
                      </tr>
                      <tr
                        v-for="(update, i) in project.updates"
                        :key="update.note"
                      >
                        <td>Update {{ i + 1 }}</td>
                        <td>{{ update.date | date }}</td>
                        <td>{{ update.goal ? "✅ " : "" }}{{ update.note }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
        <br /><br />
        <div v-if="repoData">
          <v-switch
            flat
            v-model="readmeMd"
            :label="`Toggle ${readmeMd ? 'Rendered' : 'Markdown'}`"
          ></v-switch>
          <v-row v-if="readme" class="md-area">
            <v-col v-if="readmeMd" cols="12">
              <h3 class="md-title" align="center">README.md</h3>
              <hr />
              <div class="readme-render-box">
                <pre class="readme white--text" align="left" width="100%"
                  >{{ readme }}
            </pre
                >
              </div>
            </v-col>
            <v-col v-else cols="12">
              <h3 class="md-title" align="center">README</h3>
              <hr />
              <div class="readme-render-box">
                <div class="readme-render white--text" v-markdown>
                  {{ readme }}
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row v-else><h3>No README.md file available</h3></v-row>
          <br />
        </div>
        <hr />
        <br />
        <!-- {{ project.comments }} -->
        <div class="comments" v-show="this.project.comments">
          <!-- <div class="comment" v-for="comment in comments" :key="comment.id">
            {{ comment }} -->
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">User</th>
                  <th class="text-left">Date</th>
                  <th class="text-left">Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="comment in project.comments" :key="comment.id">
                  <td align="left">{{ comment.authorName }}</td>
                  <td align="left">{{ comment.date | date }}</td>
                  <td align="left">{{ comment.comment }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <!-- </div> -->
        </div>
        <br />
        <div class="comment-btn-box" align="right">
          <!--  -->
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <!-- // todo - ENABLE THIS -->
                <v-btn
                  color="primary"
                  :disabled="false"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Comment
                </v-btn>
              </template>
              <v-card dark>
                <v-card-title>
                  <span class="headline"
                    ><v-icon left>mdi-message</v-icon>Comment</span
                  >
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          label="Comment"
                          required
                          v-model="commentText"
                          >{{ commentText }}</v-textarea
                        >
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="closeDialog">
                    Close
                  </v-btn>
                  <v-btn
                    v-show="commentText"
                    color="green darken-1"
                    text
                    @click="saveComment"
                  >
                    Comment
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <!-- // todo - fix comments -->
          <!-- {{ newComment }} -->
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Alert from "@/components/Shared/Alert.vue";
import EditButtons from "@/components/Project/EditButtons.vue";
import UpdateForm from "@/components/Project/UpdateForm.vue";

export default {
  name: "Project",
  data() {
    return {
      // todo - can't find comment data
      readmeMd: false,
      editDialog: false,
      error: null,
      repoData: null,
      readme: false,
      commentText: "",
      dialog: false,
    };
  },
  props: ["id"],
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    saveComment() {
      this.$store.dispatch("addComment", {
        projectId: this.id,
        comments: this.comments,
        comment: {
          id: this.numberOfComments,
          date: this.todayDateFormatted,
          commentText: this.commentText,
          authorName: this.user.username || this.user.name,
        },
      });
      this.commentText = "";
      this.dialog = false;
    },
    onSubmitClicked() {
      this.editDialog = !this.editDialog;
    },
    updateProject() {
      this.$router.go();
    },
    onEditClicked() {
      this.editDialog = !this.editDialog;
    },
    newUpdate() {
      alert("Report New Update");
    },
    getGitHubInfo() {
      let ghUsername = this.project.username;
      let repo = this.project.githubRepo;
      if (repo) {
        repo = repo
          .split("https://www.github.com/")
          .join("")
          .split("https://github.com/")
          .join("")
          .split("github.com/")
          .join("");
        repo = repo.split("/")[1];
        repo = repo.split(" ")[0];
      }
      console.log(ghUsername);

      axios
        .get(`https://api.github.com/repos/${this.project.username}/${repo}`)
        .then((results) => {
          try {
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
          this.readme = res.data.trim();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    comment() {
      console.log(this.newComment);
      // alert(
      //   "We know you're excited to comment - but we didn't finish that feature yet. Try Slack instead!"
      // );
    },
  },
  mounted() {
    this.getGitHubInfo();
  },
  computed: {
    comments() {
      if (this.project.comments) {
        return this.project.comments;
      } else {
        return [];
      }
    },
    newComment() {
      let comment = {
        author: this.user.username,
        date: this.todayDate,
        comment: this.commentText,
      };
      return comment;
    },
    todayDateFormatted() {
      let d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    numberOfComments() {
      if (this.comments) {
        return this.comments.length + 1;
      } else {
        return 1;
      }
    },
    projectBelongsToLoggedInUser() {
      return this.project.creatorId == this.user.id;
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
  color: white;
}

h4,
h5 {
  margin: auto;
  display: flex;
  align-self: left;
}

a {
  text-decoration: none;
  color: white;
}

.follow-dialog {
  align-content: right;
}

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
  padding-left: 10px;
}

.comment-btn-box {
  display: flex;
  margin: auto;
  padding: 0;
}

.projectCard {
  border: white solid 2px;
  width: 100%;
  background-color: #333;
  margin: 20px 0;
  height: 100%;
}

.md-area {
  min-height: 600px;
}

/* // todo this word wrap isn't working so I cut it off instead  */
.readme {
  padding: 5px 20px;
  contain: content;
  display: flex;
  resize: auto;
  background-color: #000;
  height: 100%;
  border: 1px white dashed;
}

.readme-render-box {
  width: 100%;
  height: 100%;
  min-height: 620px;
  padding-bottom: 50px;
}

.readme-render {
  text-align: left;
  padding: 5px 20px;
  resize: none;
  background-color: #000;
  width: 100%;
  overflow: auto;
  min-height: 100%;
  border: 1px white dashed;
  text-decoration: none white;
  color: white;
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