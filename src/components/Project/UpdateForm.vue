<template>
  <div class="UpdateForu">
    <v-container class="top-spacing">
      <v-form @submit.prevent="onEditProject">
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
                      :value="project.title"
                      v-model="projectUpdate.updatedProject.title"
                      :rules="[() => !!projectName || 'This field is required']"
                      :error-messages="errorMessages"
                      label="Project Name"
                      required
                    ></v-text-field>
                    <v-textarea
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
                      id="githubRepo"
                      v-model="projectUpdate.updatedProject.githubRepo"
                      label="GitHub Repo (Optional)"
                      :rules="githubRules"
                      clearable
                      :required="false"
                      hint="This can be added/modified later."
                    ></v-text-field>
                    <v-text-field
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
                    <v-text-field
                      v-model="projectUpdate.updatedProject.imageUrl"
                      name="imageUrl"
                      label="Image URL"
                      id="imageUrl"
                      ref="imageUrl"
                    >
                    </v-text-field>
                    <h3 v-if="this.imageUrl">Project Banner Image</h3>
                    <img
                      :src="projectUpdate.updatedProject.imageUrl"
                      width="400px"
                    />
                    <v-combobox
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
                  </v-card-text>
                  <v-divider class="mt-12"></v-divider>
                  <v-card-actions>
                    <v-btn elevation="0" text color="warning">
                      <v-icon>mdi-arrow-left</v-icon>
                      Cancel
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn elevation="0" color="info" text @click="resetForm">
                      <v-icon>mdi-refresh</v-icon>
                      Clear
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      elevation="0"
                      @click="submit"
                      :disabled="submitDisabled"
                      ><v-icon>mdi-check-bold</v-icon>
                      Submit
                    </v-btn>
                  </v-card-actions>
                  {{ submitDisabled }}
                  <!-- PROJECT: {{ this.project }} <br /><br />
                  UPDATED PROJECT: {{ this.updatedProject }} -->
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
        updatedProject: {
          title: this.project.title,
          description: this.project.description,
          technologies: this.project.technologies,
          githubRepo: this.project.githubRepo,
          productPage: this.project.productPage,
          goals: this.project.goals,
          imageUrl: this.project.imageUrl,
          projectDuration: this.project.projectDuration,
        },
      },
    };
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
    // form() {
    //   return {
    //     projectName: this.projectName,
    //     summary: this.summary,
    //     anticipatedTechnologies: this.selectedItems,
    //     githubRepo: this.githubRepo,
    //     productPage: this.productPage,
    //     emailAddress: this.user.email,
    //     created: this.dateCreated,
    //     goals: this.goals,
    //     imageUrl: this.imageUrl,
    //     projectDuration: this.selectedDuration,
    //   };
    // },
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
  methods: {
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
      } else if (this.thisUser) {
        // Nobody should ever be able to do this... but just in case someone screws with the source code - we'll let them know that we know what they're upto
        alert("This project isn't yours to edit! Nice try!")
      } else {
        this.projectUpdate.userId = this.user.id;
        console.log(this.projectUpdate);
        this.$store.dispatch("updateProject", this.projectUpdate);
      }
    },
  },
};
</script>

<style scoped>
.card-background {
  background-color: #333;
}
.top-spacing {
  margin-top: 40px;
}
</style>