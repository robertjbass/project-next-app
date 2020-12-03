<template>
  <div class="createProject">
    <v-container class="form" dark>
      <v-form>
        <v-layout>
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
              <v-card ref="form">
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
                  <v-text-field
                    id="summary"
                    ref="summary"
                    v-model="summary"
                    :rules="[
                      () => !!summary || 'This field is required',
                      () =>
                        (!!summary && summary.length >= 15) ||
                        'Project summary must be at least 15 characters',
                      summaryCheck,
                    ]"
                    label="Project Summary"
                    counter="15"
                    required
                  ></v-text-field>
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
                  <v-text-field
                    id="goals"
                    ref="goals"
                    v-model="goals"
                    :rules="[
                      () => !!goals || 'This field is required',
                      () =>
                        (!!goals && goals.length >= 15) ||
                        'Project goals must be at least 15 characters',
                    ]"
                    label="Project Goals"
                    counter="15"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="imageUrl"
                    name="imageUrl"
                    label="Image"
                    id="imageUrl"
                    ref="imageUrl"
                  >
                  </v-text-field>
                  <img :src="imageUrl" />
                </v-card-text>
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                  <v-btn text> Cancel </v-btn>
                  <v-spacer></v-spacer>
                  <v-slide-x-reverse-transition>
                    <v-tooltip v-if="formHasErrors" left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          class="my-0"
                          v-bind="attrs"
                          @click="resetForm"
                          v-on="on"
                        >
                          <v-icon>mdi-refresh</v-icon>
                        </v-btn>
                      </template>
                      <span>Refresh form</span>
                    </v-tooltip>
                  </v-slide-x-reverse-transition>
                  <v-btn color="primary" text @click="submit"> Submit </v-btn>
                </v-card-actions>
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
    name() {
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
        this.summary && !this.projectName ? `Hey! I'm required` : "";

      return true;
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    submit() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
    },
  },
};
</script>

<style scoped>
.form {
  padding: 0 10%;
}
</style>