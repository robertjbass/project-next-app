<template>
  <div class="updateForm">
    <v-container class="top-spacing">
      <v-form @submit.prevent="onEditProject">
        <v-layout>
          <v-row justify="center">
            <v-col cols="12" sm="12" md="8" lg="6">
              <div class="card-background">
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
                <v-combobox
                  class="section"
                  id="anticipatedTechnologies"
                  ref="anticipatedTechnologies"
                  v-model="projectUpdate.updatedProject.technologies"
                  :items="items"
                  label="Anticipated Technologies"
                  :rules="[
                    () =>
                      !!numberOfTechnologies ||
                      'Please select at least 1 technology',
                  ]"
                  multiple
                  chips
                  clearable
                  required
                ></v-combobox>
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
                <v-textarea
                  class="section"
                  id="goals"
                  ref="goals"
                  v-model="projectUpdate.updatedProject.goals"
                  :rules="[
                    () =>
                      !!projectUpdate.updatedProject.goals ||
                      'This field is required',
                    () =>
                      (!!projectUpdate.updatedProject.goals &&
                        projectUpdate.updatedProject.goals.length >= 15) ||
                      'Just a little bit more information',
                  ]"
                  label="Project Goals"
                  required
                ></v-textarea>
                <!-- <v-text-field
                  class="section"
                  v-model="projectUpdate.updatedProject.imageUrl"
                  name="imageUrl"
                  label="Image URL"
                  id="imageUrl"
                  ref="imageUrl"
                >
                </v-text-field> -->
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
                  <!-- :rules="[
                    (value) =>
                      !value ||
                      value.size < 2000000 ||
                      'Image size should be less than 2 MB!',
                  ]" -->
                  <!--  -->
                </v-file-input>
                <h3 v-if="this.imageUrl">Project Banner Image</h3>
                <img
                  :src="this.projectUpdate.updatedProject.imageUrl"
                  class="section"
                  width="400px"
                />
                <!-- :src="projectUpdate.updatedProject.imageUrl" -->
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
                  <v-btn elevation="0" text color="warning">
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
      goals: null,
      image: null,
      imageUrl: null,
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
        },
      },
    };
  },
  methods: {
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
      this.goals = null;
      this.image = null;
      this.imageUrl = null;
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
    submitDisabled() {
      return (
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
  /* margin-top: 20px; */
  padding: 0;
  background-color: #444;
}
.updateForm {
  margin: 0;
  padding: 20px;
}

.section {
  padding-top: 15px;
  margin-top: 15px;
}
/* .card-background {
  background-color: #333;
} */
/* .top-spacing {
  margin-top: 40px;
} */
</style>