<template>
  <div class="techList">
    <v-card v-if="this.technologies" class="card" dark>
      <v-text-field
        prepend-icon="mdi-magnify"
        placeholder="start typing to search"
        class="search"
        v-model="searchValue"
      />
      <!-- <p v-for="technology in technologies" :key="technology">
        <br />
        {{
          technology.technology
            .concat(" ")
            .concat(technology.keywords.toString())
        }} 
      </p>-->
      <v-btn small class="accentRed" v-show="addNew" @click="addTechnology">{{
        addNew ? "add " + addNew : ""
      }}</v-btn
      ><br />
      {{ partialMatches.length }}/{{ technologies.length }}
      <!--  -->
      <div class="exactMatch" v-if="exactMatch.length">
        <h3 align="left">Exact Match</h3>
        <div v-for="match in exactMatch" :key="match.id" align="left">
          <router-link
            style="text-decoration: none; font-weight: 700; font-size: 1.5rem"
            class="accentBlue--text"
            :to="'../technology/' + removeSpecialChars(match.technology)"
            >{{ match.technology }} </router-link
          >- {{ match.categories.toString() }}
          <hr />
        </div>
      </div>
      <br />
      <div class="includesMatch">
        <div v-for="match in keywordAddedSearch" :key="match.id" align="left">
          <!-- <div v-for="match in partialMatches" :key="match.id" align="left"> -->
          <router-link
            style="text-decoration: none; font-weight: 700; font-size: 1.5rem"
            class="light-blue--text"
            :to="'../technology/' + removeSpecialChars(match.technology)"
            >{{ match.technology }} </router-link
          >- {{ match.categories.toString() }}
        </div>
      </div>
    </v-card>
    <v-card dark class="card" v-if="addTech">
      <h2>Adding a new technology</h2>
      <ol align="left">
        <li>
          Make sure that the technology is formatted properly including
          capitalization and punctuation (ie: Visual Studio Code, Node.js).
          Check the official documentation if unsure
        </li>
        <li>
          Formatting will be reviewed by an admin however, you will be able to
          use it immediately
        </li>
        <li>
          Please verify that this technology isn't currently listed. Adding a
          duplicate technology will result in the table relationship being
          abandoned
        </li>
        <li>
          Please don't add anything too obscure. Technologies should only be
          listed here if they're likely to be used by future developers
        </li>
        <li>
          Do your best to match the appropriate category. If the technology fits
          more than 1 category, use your best judgment
        </li>
      </ol>
      <v-text-field v-model="newTechToAdd" />
      <v-combobox
        v-model="category"
        :items="[
          'Automation',
          'Compiler/Preprocessor/Packager',
          'Database/ORM',
          'Development Platform',
          'Framework/Library',
          'No Code/Low Code',
          'Programming Language',
          'Runtime/Environment',
          'Software Platform',
          'Text Editor/IDE',
        ]"
      />
      <v-checkbox
        v-model="spellingGood"
        label="spelling and punctuation verified with official documentation (ex: Node.js, Visual Studio Code)"
      />
      <v-checkbox
        v-model="uniqueValue"
        label="verified that this technology doesn't already exist"
      />
      <v-checkbox
        v-model="reusePotential"
        label="this technology is likely to be used by hackers other than myself"
      />
      <v-btn
        small
        @click="addNewTechnolog"
        :disabled="!ableToSubmit"
        color="accentRed"
        ><v-icon left>mdi-content-save-outline</v-icon>Submit</v-btn
      >
      <!-- Spelling and punctuation has been confirmed to match original
      documentation? -->
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TechList",
  data() {
    return {
      searchValue: "",
      addTech: "",
      newTechToAdd: "",
      category: "",
      spellingGood: false,
      uniqueValue: false,
      reusePotential: false,
    };
  },
  methods: {
    addNewTechnolog() {
      // let url =
      //   "https://v1.nocodeapi.com/bbass/airtable/OWBByjdlNVhiKRiR?tableName=NewTechnologies";
      let params = {
        technology: this.newTechToAdd,
        categories: this.category,
        username: this.currentUser.username,
        userId: this.currentUser.documentId,
        newTechnology: true,
        dateModified: this.todayDate,
      };
      // this.$store.dispatch("addNewTechnolog", { url, params });
      // todo -
      this.$store.dispatch("addTechnologiesToFirestore", params);
    },
    addTechnology() {
      this.addTech = true;
      this.newTechToAdd = this.searchValue;
      let stringLength = this.newTechToAdd.length;
      console.log(stringLength);
      let firstLetter = this.searchValue[0].toUpperCase();
      this.newTechToAdd = firstLetter.concat(
        this.searchValue.substr(1, stringLength)
      );
      console.log(firstLetter, stringLength);
    },
    removeSpecialChars(value) {
      if (value) {
        return value
          .split(" ")
          .join("")
          .split(".")
          .join("")
          .split("-")
          .join("")
          .toLowerCase();
      }
    },
  },
  computed: {
    todayDate() {
      let d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    currentUser() {
      return this.$store.getters.user;
    },
    ableToSubmit() {
      return (
        this.spellingGood &&
        this.uniqueValue &&
        this.reusePotential &&
        !!this.category
      );
    },
    addNew() {
      if (this.searchValue.length > 0 && this.partialMatches.length == 0) {
        return this.searchValue;
      } else {
        return "";
      }
    },
    technologies() {
      // return this.$store.getters.technologies;
      return this.$store.getters.allTechnologies;
    },
    // todo - not matching
    exactMatch() {
      if (this.searchValue == "") {
        return [];
      } else {
        return this.technologies.filter((technology) => {
          if (technology.technology) {
            return (
              technology.technology
                .toLowerCase()
                .split(" ")
                .join("")
                .split(".")
                .join("") ===
              this.searchValue
                .toLowerCase()
                .split(" ")
                .join("")
                .split(".")
                .join("")
            );
          } else {
            return [];
          }
        });
      }
    },
    //* Not currently in use - replaced with keyword added search (for now at least)
    partialMatches() {
      if (this.searchValue == "") {
        return [];
      } else {
        return this.technologies.filter((technology) => {
          if (technology.technology) {
            return technology.technology
              .toLowerCase()
              .split(" ")
              .join("")
              .split(".")
              .join("")
              .includes(
                this.searchValue
                  .toLowerCase()
                  .split(" ")
                  .join("")
                  .split(".")
                  .join("")
              );
          } else {
            return [];
          }
        });
      }
    },
    //* In Use
    keywordAddedSearch() {
      if (this.searchValue == "") {
        return [];
      } else {
        return this.technologies.filter((technology) => {
          if (technology.technology) {
            return technology.technology
              .toLowerCase()
              .split(" ")
              .join("")
              .split(".")
              .join("")
              .concat(
                technology.technology
                  .concat(" ")
                  .concat(technology.keywords)
                  .toString()
              )
              .includes(
                this.searchValue
                  .toLowerCase()
                  .split(" ")
                  .join("")
                  .split(".")
                  .join("")
              );
          } else {
            return [];
          }
        });
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
.search {
  color: white;
  width: 50%;
  margin: auto;
  font-size: 1.8rem;
}
.card {
  margin: 5%;
  padding: 5%;
}
</style>