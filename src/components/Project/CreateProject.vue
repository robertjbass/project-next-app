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
                    <v-combobox
                      id="anticipatedTechnologies"
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
                    <!-- // todo - 
                    https://vuetifyjs.com/en/components/file-inputs/#show-size 
                    -->
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
                    ></v-file-input>
                    <!-- placeholder="Select a banner image" -->
                    <!-- <v-text-field
                      v-model="imageUrl"
                      name="imageUrl"
                      label="Image URL"
                      id="imageUrl"
                      ref="imageUrl"
                    > -->
                    <!-- </v-text-field> -->
                    <h3 v-if="this.imageUrl">Project Banner Image</h3>
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
// import uuidv4 from "uuid";
// import { storage } from "../../firebase";
export default {
  name: "CreateProject",
  data() {
    return {
      // selectedDuration: "2 Weeks",
      // projectDurations: ["1 Week", "2 Weeks", "1 Month", "Long Term"],
      //       selectedItems: [],
      //       errorMessages: "",
      //       projectName: "Project NextApp",
      //       formHasErrors: false,
      //       summary:
      //         '"Project Next App" is a hub for developers to find their creative spark in a gamified weekly hackathon to add structure to side projects, learning new technologies, and meeting developers.',
      //       search: null,
      //       githubRepo: "https://github.com/716green/project-next-app",
      //       productPage: "https://projectnext.app",
      //       goals: `1️⃣ Get a full and complete understanding of Vuex state management. Currently, my knowledge is functional at best making debugging very hard.
      // 2️⃣ Solidify my understanding of Firestore. I've used it but never felt comfortable with it.
      // 3️⃣ Implement Firebase storage. Storage is one of the features I've yet to try out.
      // 4️⃣ Learn GitHub OAuth authentication. In order to integrate with GitHub, I need to authenticate with OAuth (or OAuth2) with GitHub. I've only ever done this with Google, or with an email/password combo so far.
      // 5️⃣ Get this app live and hosted as a proof of concept within 1 week
      // 6️⃣ Learn Vuetify grid. I've never taken the time to learn a grid system like Bootstrap or anything similar and then I tell people I'm not a 'front-end developer' because I don't like UI/UX. It's become a serious requirement for most projects and it's time I finally learn and understand it. I don't want to use that as an excuse for bad UI going into 2021.
      // 7️⃣ Create a logo with Figma. Right now, the temporary logo is text that says: project(() => {NextApp('💡')}. I need to learn to mock-up quick logos. I want to have a basic understanding of Figma going into 2021.`,
      //       image: null,
      //       imageUrl: null,
      //       imageRaw: null,
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
      goals: null,
      image: null,
      imageUrl: null,
      imageRaw: null,
    };
  },
  methods: {
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
      this.goals = null;
      this.image = null;
      this.imageUrl = null;
    },
    submit() {
      if (!this.submitEnabled) {
        alert("Please verify all errors are corrected");
      }
    },
  },
  computed: {
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
        this.goals &&
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
        // imageUrl: this.imageUrl,
        image: this.imageRaw,
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
.card-background {
  background-color: #333;
}
.top-spacing {
  margin-top: 40px;
}
</style>