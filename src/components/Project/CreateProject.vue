<template>
  <div class="createProject">
    <v-container>
      <v-form @submit.prevent="onCreateProject" :lazy-validation="true">
        <v-layout>
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
              <v-card ref="form" dark min-width="400px">
                <div class="card-background">
                  <v-card-text>
                    <h1>Create Next App</h1>
                    Sumbission Date: {{ dateCreated }}
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
                    <v-combobox
                      id="anticipatedTechnologies"
                      ref="anticipatedTechnologies"
                      v-model="selectedItems"
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
                    <v-textarea
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
                    ></v-textarea>
                    <v-text-field
                      v-model="imageUrl"
                      name="imageUrl"
                      label="Image URL"
                      id="imageUrl"
                      ref="imageUrl"
                    >
                    </v-text-field>
                    <h3 v-if="this.imageUrl">Project Banner Image</h3>
                    <img :src="imageUrl" width="400px" />
                    <v-combobox
                      label="Starting Duration (1 week default)"
                      id="projectDuration"
                      ref="projectDuration"
                      clearable
                      hide-selected
                      persistent-hint
                      small-chips
                      :items="projectDurations"
                      v-model="selectedDuration"
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
                      type="submit"
                      elevation="0"
                      @click="submit"
                      :disabled="!submitEnabled"
                      ><v-icon>mdi-check-bold</v-icon>
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
      selectedDuration: "1 Week",
      projectDurations: ["1 Week", "2 Weeks", "1 Month", "Long Term"],
      selectedItems: [],
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "Angular",
        "Vue.js",
        "React.js",
        "Preact",
        "SQL",
        "MongoDB",
        "Azure",
      ],
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
    };
  },

  computed: {
    submitEnabled() {
      return (
        this.projectName &&
        this.summary &&
        this.selectedItems &&
        this.goals &&
        this.selectedDuration
      );
    },
    form() {
      return {
        projectName: this.projectName,
        summary: this.summary,
        anticipatedTechnologies: this.selectedItems,
        githubRepo: this.githubRepo,
        productPage: this.productPage,
        emailAddress: "", //todo - add,
        created: this.dateCreated,
        goals: this.goals,
        imageUrl: this.imageUrl,
        projectDuration: this.selectedDuration,
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
  },

  watch: {
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
    onCreateProject() {
      // const projectData = this.form;
      this.$store.dispatch("createProject", this.form);
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
      this.goals = null;
      this.image = null;
      this.imageUrl = null;
    },
    submit() {
      this.formHasErrors = false;
      if (this.submitEnabled) {
        console.log(this.form);
      } else {
        alert("Please verify all errors are corrected");
      }
    },
  },
};
</script>

<style scoped>
.card-background {
  background-color: #333;
}
</style>