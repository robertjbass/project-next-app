<template>
  <div class="createProject">
    <v-container class="top-spacing">
      <v-form @submit.prevent="onCreateProject">
        <v-layout>
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
              <v-card ref="form" dark min-width="400px">
                <div class="card-background">
                  <v-card-text>
                    <h1>Create Next App</h1>
                    Sumbission Date: {{ dateCreated | date }}
                    <v-text-field
                      id="projectName"
                      ref="projectName"
                      v-model="projectName"
                      :rules="[() => !!projectName || 'This field is required']"
                      :error-messages="errorMessages"
                      label="Project Name"
                      required
                    ></v-text-field>
                    <v-textarea
                      id="summary"
                      ref="summary"
                      v-model="summary"
                      :rules="[
                        () => !!summary || 'This field is required',
                        () =>
                          (!!summary && summary.length >= 15) ||
                          'Just a little bit more info',
                        summaryCheck,
                      ]"
                      label="Project Summary"
                      required
                    ></v-textarea>
                    <br />
                    <techSelect
                      align="left"
                      usedFor="Edit"
                      :arrayItems="technologies"
                      v-show="!selectedItems.length"
                      :placeholder="'Programming Languages'"
                      @arrayValue="updateLanguages"
                    />
                    <h3 align="left" v-show="selectedItems.length">
                      Technologies
                    </h3>

                    <v-combobox
                      class="chip"
                      :disabled="true"
                      v-show="selectedItems.length"
                      id="anticipatedTechnologies"
                      v-model="selectedItems"
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
                        v-show="selectedItems.length"
                        small
                        width="200px"
                        @click="clearTech"
                        ><v-icon left>mdi-close</v-icon>Clear</v-btn
                      >
                    </div>
                    <v-text-field
                      id="githubRepo"
                      v-model="githubRepo"
                      label="GitHub Repo (Optional)"
                      :rules="githubRules"
                      clearable
                      :required="false"
                      hint="This can be added/modified later."
                    ></v-text-field>
                    <v-text-field
                      id="productPage"
                      ref="productPage"
                      v-model="productPage"
                      label="Product Page (Optional)"
                      :rules="productPageRules"
                      hint="This can anything you see fit such as a landing page, YouTube video, temporary url, document from Coda, Slite, Notion, Google Docs, Figma, etc. This can be added/modified later."
                      clearable
                      :required="false"
                    ></v-text-field>
                    <!-- <v-textarea
                      id="goals"
                      ref="goals"
                      v-model="goals"
                      :rules="[
                        () => !!goals || 'This field is required',
                        () =>
                          (!!goals && goals.length >= 15) ||
                          'Just a little bit more information',
                      ]"
                      label="Project Goals"
                      required
                    ></v-textarea> -->
                    <div class="goals">
                      <ol>
                        <li
                          v-for="(goal, i) in goals"
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
                    <!-- :placeholder="goalCount" -->

                    <v-file-input
                      ref="fileInput"
                      :rules="[
                        (value) =>
                          !value ||
                          value.size < 2000000 ||
                          'Image size should be less than 2 MB!',
                      ]"
                      accept="image/png, image/jpeg, image/bmp"
                      prepend-icon="mdi-paperclip"
                      label="Project Banner Image"
                      @change="onFilePicked"
                      required
                      hint="Please select any image. It can be a screenshot, a gradient, a theme, or anything else that you'd like. Take a look at unsplash.com if you need help."
                      :persistent-hint="true"
                    ></v-file-input>
                    <br />
                    <br />
                    <v-text-field
                      label="Video Embed URL"
                      class="videoUrl"
                      v-model="videoUrl"
                      placeholder="https://www.youtube.com/embed/your_video_id"
                      hint="Paste a YouTube embed link in here to embed a video. You can add, update or remove a video at any time in your project settings."
                      persistent-hint
                      append-icon="mdi-youtube red--text"
                    />
                    <br />
                    <div class="videoError" v-if="this.videoError">
                      <a @click="closeWarning">
                        <img
                          width="100%"
                          src="../../assets/images/ytVideo.png"
                        />
                        <p
                          class="pink--text"
                          style="font-size: 0.8rem; font-weight: 600"
                        >
                          {{ errorMessage }}
                        </p>
                      </a>
                    </div>
                    <br />
                    <div v-if="videoUrl" class="video">
                      <iframe
                        max-width="100%"
                        width="400"
                        :src="videoUrl"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>

                    <h3 v-if="imageUrl">Project Banner Image</h3>
                    <img :src="imageUrl" width="400px" />
                    <v-combobox
                      label="Starting Duration"
                      id="projectDuration"
                      ref="projectDuration"
                      clearable
                      hide-selected
                      persistent-hint
                      small-chips
                      hint="We recommend 2 weeks - 1 week to plan, 1 week to execute and evolve. You can update this if your plans change."
                      :items="projectDurations"
                      v-model="selectedDuration"
                    ></v-combobox>
                  </v-card-text>
                  <v-divider class="mt-12"></v-divider>
                  <v-card-actions>
                    <v-btn to="/" elevation="0" text color="warning">
                      <v-icon left>mdi-arrow-left</v-icon>
                      Cancel
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn elevation="0" color="info" text @click="resetForm">
                      <v-icon left>mdi-refresh</v-icon>
                      Clear
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      type="submit"
                      elevation="0"
                      @click="submit"
                      :disabled="!submitEnabled"
                      ><v-icon left>mdi-check-bold</v-icon>
                      Submit
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-layout>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CreateProject",
  data() {
    return {
      selectedDuration: "2 Weeks",
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
      imageRaw: null,
      videoUrl: null,
      videoError: false,
      errorMessage: null,
    };
  },
  methods: {
    closeWarning() {
      this.videoError = false;
    },
    addGoalWithClick() {
      this.goals.push(this.currentGoal);
      this.currentGoal = "";
    },
    deleteGoal(i) {
      this.goals.splice(i, 1);
    },
    listenForNewGoal: function (e) {
      if (e.keyCode === 13) {
        this.goals.push(this.currentGoal);
        this.currentGoal = "";
      }
    },
    clearTech() {
      this.selectedItems = [];
    },
    updateLanguages(value) {
      this.selectedItems = value;
    },
    onCreateProject() {
      if (!this.imageRaw) {
        // todo - add something here
        console.log("Placeholder image will be used");
      }
      this.$store.dispatch("createProject", this.form);
      console.log(this.form);
      this.$router.push("/projects/");
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
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.imageRaw = files[0];
    },
    summaryCheck() {
      this.errorMessages =
        this.summary && !this.projectName ? `Hey! I'm required` : "";

      return true;
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      this.selectedItems = [];
      this.errorMessages = "";
      this.projectName = null;
      this.formHasErrors = false;
      this.summary = null;
      this.search = null;
      this.githubRepo = "";
      this.productPage = "";
      this.goals = [];
      this.image = null;
      this.imageUrl = null;
      this.videoUrl = null;
    },
    submit() {
      if (!this.submitEnabled) {
        alert("Please verify all errors are corrected");
      }
    },
  },
  computed: {
    goalCount() {
      return `Goal ${this.goals.length + 1}`;
    },
    user() {
      return this.$store.getters.user;
    },
    items() {
      return this.$store.getters.technologies;
    },
    submitEnabled() {
      return (
        this.projectName &&
        this.summary &&
        this.selectedItems &&
        this.goals.length > 0 &&
        this.selectedDuration &&
        this.imageRaw
      );
    },
    form() {
      return {
        projectName: this.projectName,
        summary: this.summary,
        anticipatedTechnologies: this.selectedItems,
        githubRepo: this.githubRepo,
        productPage: this.productPage,
        emailAddress: this.user.email,
        created: this.dateCreated,
        goals: this.goals,
        image: this.imageRaw,
        projectDuration: this.selectedDuration,
        videoUrl: this.videoUrl,
      };
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
    technologies() {
      return this.$store.getters.technologies;
    },
  },

  watch: {
    videoUrl() {
      if (this.videoUrl.includes(".be/")) {
        this.videoError = true;
        this.videoUrl = this.videoUrl.split(".be/").join("be.com/embed/");
        this.errorMessage = `You've entered an invalid URL. We've detected a
        YouTube 'link URL' instead of the 'embed URL'. We've
        tried to fix this for you, but it's best that you
        paste the correct URL to be sure. Reference the image
        below for context. Click the image below to close this
        warning. If you see the video preview, no further
        action is required.`;
      }
    },

    // Only gets rid of whitespace
    selectedItems() {
      let mostRecentEntry = this.selectedItems[this.selectedItems.length - 1];
      if (mostRecentEntry.split(" ").join("").length == 0) {
        this.selectedItems.pop(
          this.selectedItems[this.selectedItems.length - 1]
        );
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
.goals {
  padding: 8px 0;
}

.add-goal {
  cursor: pointer;
}

.pending-goal {
  font-weight: 600;
}

.chip {
  margin: 5px;
}
.card-background {
  background-color: #333;
}
.top-spacing {
  margin-top: 40px;
}
.clear-tech-btn-wrap {
  display: flex;
  justify-content: flex-end;
}
</style>