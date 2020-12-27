<template>
  <div class="updateForm">
    <v-container class="top-spacing">
      <v-form @submit.prevent="onEditProject">
        <v-layout>
          <v-row justify="center">
            <v-col cols="12" sm="12" md="8" lg="6">
              <div class="card-background" v-if="this.project.technologies">
                <h1>Create Next App</h1>
                Sumbission Date: {{ dateCreated | date }}
                <v-text-field
                  class="section"
                  id="projectName"
                  ref="projectName"
                  :value="project.title"
                  v-model="projectUpdate.updatedProject.title"
                  :rules="[() => !!projectName || 'This field is required']"
                  :error-messages="errorMessages"
                  label="Project Name"
                  required
                ></v-text-field>
                <v-textarea
                  class="section"
                  id="summary"
                  ref="summary"
                  v-model="projectUpdate.updatedProject.description"
                  :rules="[
                    () =>
                      !!projectUpdate.updatedProject.description ||
                      'This field is required',
                    () =>
                      (!!projectUpdate.updatedProject.description &&
                        projectUpdate.updatedProject.description.length >=
                          15) ||
                      'Just a little bit more info',
                    summaryCheck,
                  ]"
                  label="Project Summary"
                  required
                ></v-textarea>
                <techSelect
                  align="left"
                  usedFor="Edit"
                  :arrayItems="technologies"
                  v-show="!project.technologies.length"
                  :placeholder="'Programming Languages'"
                  @arrayValue="updateLanguages"
                />
                <h3 align="left" v-show="project.technologies.length">
                  Technologies<v-icon
                    @click="toggleEditTech"
                    class="editIcon"
                    small
                    right
                    >mdi-pencil-circle</v-icon
                  >
                </h3>

                <v-combobox
                  class="chip"
                  :disabled="true"
                  v-show="project.technologies.length && !this.editTech"
                  id="anticipatedTechnologies"
                  v-model="project.technologies"
                  :items="items"
                  :rules="[
                    () =>
                      !!numberOfTechnologies ||
                      'Please select at least 1 technology',
                  ]"
                  multiple
                  clearable
                  required
                  dense
                ></v-combobox>
                <div class="clear-tech-btn-wrap">
                  <v-btn
                    color="accentRed"
                    class="clear-tech-btn"
                    align="right"
                    v-show="project.technologies.length"
                    small
                    width="200px"
                    @click="clearTech"
                    >Clear</v-btn
                  >
                </div>
                <v-text-field
                  class="section"
                  id="githubRepo"
                  v-model="projectUpdate.updatedProject.githubRepo"
                  label="GitHub Repo (Optional)"
                  :rules="githubRules"
                  clearable
                  :required="false"
                  hint="This can be added/modified later."
                ></v-text-field>
                <v-text-field
                  class="section"
                  id="productPage"
                  ref="productPage"
                  v-model="projectUpdate.updatedProject.productPage"
                  label="Product Page (Optional)"
                  :rules="productPageRules"
                  hint="This can anything you see fit such as a landing page, YouTube video, temporary url, document from Coda, Slite, Notion, Google Docs, Figma, etc. This can be added/modified later."
                  clearable
                  :required="false"
                ></v-text-field>
                <div class="goals">
                  <ol>
                    <li
                      v-for="(goal, i) in project.goals"
                      :key="goal[i]"
                      align="left"
                      id="goals"
                      ref="goals"
                    >
                      {{ goal }}
                      <v-icon small @click="deleteGoal(i)" color="accentRed"
                        >mdi-close</v-icon
                      >
                    </li>
                    <li
                      v-show="currentGoal"
                      class="pending-goal light-blue--text"
                    >
                      {{ currentGoal
                      }}<v-icon
                        @click="addGoalWithClick"
                        right
                        x-small
                        class="add-goal light-green--text"
                        >mdi-check</v-icon
                      >
                    </li>
                  </ol>
                </div>

                <v-text-field
                  :label="goalCount"
                  required
                  class="goals"
                  v-model="currentGoal"
                  v-on:keyup="listenForNewGoal"
                  hint="Press enter after each goal to add it"
                  persistent-hint
                />
                <v-file-input
                  v-model="projectUpdate.updatedProject.imageRaw"
                  name="imageUrl"
                  id="imageUrl"
                  ref="imageUrl"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-paperclip"
                  label="Project Banner Image"
                  @change="onFilePicked"
                >
                </v-file-input>
                <h3 v-if="this.imageUrl">Project Banner Image</h3>
                <img
                  :src="this.projectUpdate.updatedProject.imageUrl"
                  class="section"
                  width="400px"
                />
                <br />
                <br />
                <v-text-field
                  label="Video Embed URL"
                  class="videoUrl"
                  v-model="projectUpdate.updatedProject.videoUrl"
                  placeholder="https://www.youtube.com/embed/your_video_id"
                  hint="Paste a YouTube embed link in here to embed a video. You can add, update or remove this at any time."
                  persistent-hint
                  append-icon="mdi-youtube red--text"
                />
                <br />
                <div class="videoError" v-if="this.videoError">
                  <a @click="closeWarning">
                    <img width="100%" src="../../assets/images/ytVideo.png" />
                    <p
                      class="pink--text"
                      style="font-size: 0.8rem; font-weight: 600"
                    >
                      {{ errorMessage }}
                    </p>
                  </a>
                </div>
                <v-combobox
                  class="section"
                  label="Duration"
                  :value="project.projectDuration"
                  id="projectDuration"
                  ref="projectDuration"
                  clearable
                  hide-selected
                  persistent-hint
                  small-chips
                  :items="projectDurations"
                  v-model="projectUpdate.updatedProject.projectDuration"
                ></v-combobox>
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                  <v-btn elevation="0" text color="warning" @click="closeForm">
                    <v-icon left>mdi-arrow-left</v-icon>
                    Cancel
                  </v-btn>
                  <v-spacer></v-spacer>
                  <!-- does the same as close -->
                  <v-btn elevation="0" color="info" text @click="closeForm">
                    <v-icon left>mdi-refresh</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    elevation="0"
                    @click="submit"
                    :disabled="submitDisabled"
                    ><v-icon left>mdi-check-bold</v-icon>
                    Submit
                  </v-btn>
                </v-card-actions>
              </div>
            </v-col>
          </v-row>
        </v-layout>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "UpdateForm",
  props: ["project", "id", "thisUser"],
  data() {
    return {
      selectedDuration: "1 Week",
      projectDurations: ["1 Week", "2 Weeks", "1 Month", "Long Term"],
      selectedItems: [],
      errorMessages: "",
      projectName: null,
      formHasErrors: false,
      summary: null,
      search: null,
      githubRepo: "",
      productPage: "",
      currentGoal: "",
      goals: [],
      image: null,
      imageUrl: null,
      videoUrl: null,
      editTech: false,
      videoUrlChanged: false,
      // This isn't a perfect solution but it's a temporary and probably 'good enough' fix for the submit button not otherwise activating when adding new goals
      modifiedGoals: false,
      videoError: false,
      errorMessage: null,
      projectUpdate: {
        projectId: this.id,
        userId: "",
        imageUpdated: false,
        updatedProject: {
          title: this.project.title,
          description: this.project.description,
          technologies: this.project.technologies,
          githubRepo: this.project.githubRepo,
          productPage: this.project.productPage,
          goals: this.project.goals,
          imageUrl: this.project.imageUrl,
          projectDuration: this.project.projectDuration,
          imageRaw: this.project.imageUrl,
          videoUrl: this.project.videoUrl,
        },
      },
    };
  },
  methods: {
    closeWarning() {
      this.videoError = false;
    },
    addGoalWithClick() {
      this.project.goals.push(this.currentGoal);
      this.modifiedGoals = true;
      this.currentGoal = "";
    },
    listenForNewGoal: function (e) {
      if (e.keyCode === 13) {
        this.project.goals.push(this.currentGoal);
        this.modifiedGoals = true;
        this.currentGoal = "";
      }
    },
    deleteGoal(i) {
      this.modifiedGoals = true;
      this.project.goals.splice(i, 1);
    },
    updateLanguages(value) {
      this.project.technologies = value;
    },
    clearTech() {
      this.project.technologies = [];
      this.toggleEditTech;
    },
    toggleEditTech() {
      this.editTech = !this.editTech;
    },
    onFilePicked() {
      const files = event.target.files;
      let filename = files[0].name;
      console.log(filename);
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file with a file type");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.projectUpdate.updatedProject.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.projectUpdate.updatedProject.imageRaw = files[0];
      this.projectUpdate.imageUpdated = true;
    },

    summaryCheck() {
      this.errorMessages =
        this.projectUpdate.updatedProject.summary &&
        !this.projectUpdate.updatedProject.projectName
          ? `Hey! I'm required`
          : "";
      return true;
    },

    closeForm() {
      this.$emit("closeForm");
    },

    submit() {
      if (this.submitDisabled) {
        alert("Please verify all errors are corrected");
      } else {
        this.projectUpdate.userId = this.user.id;
        console.log(this.projectUpdate);

        if (this.projectUpdate.imageUpdated) {
          this.$store.dispatch("updateProjectWithImage", this.projectUpdate);
          console.log("new image provided");
        } else if (!this.projectUpdate.imageUpdated) {
          console.log("image not updated");
          this.$store.dispatch("updateProject", this.projectUpdate);
        } else {
          console.error("unknown state path");
        }
        this.$emit("closeForm");
      }
    },
  },

  computed: {
    videoUrlWatcher() {
      return this.projectUpdate.updatedProject.videoUrl;
    },
    goalCount() {
      return `Goal ${this.project.goals.length + 1}`;
    },

    technologies() {
      return this.$store.getters.technologies;
    },

    submitDisabled() {
      return (
        !this.videoUrlChanged &&
        this.modifiedGoals == false &&
        this.projectUpdate.updatedProject.title == this.project.title &&
        this.projectUpdate.updatedProject.description ==
          this.project.description &&
        this.projectUpdate.updatedProject.technologies ==
          this.project.technologies &&
        this.projectUpdate.updatedProject.githubRepo ==
          this.project.githubRepo &&
        this.projectUpdate.updatedProject.productPage ==
          this.project.productPage &&
        this.projectUpdate.updatedProject.goals == this.project.goals &&
        this.projectUpdate.updatedProject.imageUrl == this.project.imageUrl &&
        this.projectUpdate.updatedProject.projectDuration ==
          this.project.projectDuration
      );
    },

    user() {
      return this.$store.getters.user;
    },

    items() {
      return this.$store.getters.technologies;
    },

    dateCreated() {
      let d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },

    numberOfTechnologies() {
      return this.selectedItems.length;
    },

    githubRules() {
      if (this.githubRepo == null || this.githubRepo == "") {
        return [() => this.githubRepo == null || ""];
      } else {
        return [
          () =>
            this.githubRepo.includes("github") || "This is not a GitHub repo",
          () =>
            this.githubRepo.includes(".com/") ||
            "This is not a valid GitHub Repo URL",
          () =>
            this.githubRepo.length > 15 ||
            "This is not a valid GitHub Repo URL",
        ];
      }
    },

    productPageRules() {
      if (this.productPage == null || this.productPage == "") {
        return [() => this.productPage == null || ""];
      } else {
        return [
          () => this.productPage.includes(".") || "This is not a valid URL",
          () => this.productPage.length > 5 || "Too short",
        ];
      }
    },
  },

  watch: {
    videoUrlWatcher() {
      if (this.projectUpdate.updatedProject.videoUrl.includes(".be/")) {
        this.videoError = true;
        this.projectUpdate.updatedProject.videoUrl = this.projectUpdate.updatedProject.videoUrl
          .split(".be/")
          .join("be.com/embed/");
        this.errorMessage = `You've entered an invalid URL. We've detected a YouTube 'link URL' instead of the 'embed URL'. We've tried to fix this for you, but it's best that you paste the correct URL to be sure. This can be found on YouTube at 'share' → 'embed' after 'src=' in the iframe text area.`;
      } else if (
        this.projectUpdate.updatedProject.videoUrl != this.project.url
      ) {
        this.videoUrlChanged = true;
      }
    },
    user() {
      if (this.user === null || this.user === undefined) {
        this.$router.push("/");
      }
    },

    projectName() {
      this.errorMessages = "";
    },

    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  background-color: #444;
}
li {
  margin: 15px 0;
}
.add-goal {
  cursor: pointer;
}
.goals {
  padding: 8px 0;
}
.updateForm {
  margin: 0;
  padding: 20px;
}

.section {
  padding-top: 15px;
  margin-top: 15px;
}

.editIcon {
  cursor: pointer;
  color: #fd0435;
}

.chip {
  margin: 5px;
}
.clear-tech-btn-wrap {
  display: flex;
  justify-content: flex-end;
}
</style>