<template>
  <div class="technologies">
    <v-container class="top-spacing">
      <v-card dark class="card" align="left">
        <router-link to="../technologies" style="text-decoration: none"
          ><v-btn small color="accentRed"
            ><v-icon>mdi-chevron-left</v-icon>All Technologies</v-btn
          ></router-link
        >
        <div class="body" align="center">
          <h1>{{ techName }}</h1>
          <div class="technology">
            <h4 v-for="(category, i) in techCategories" :key="category[i]">
              {{ category }}
            </h4>
            <br />
          </div>
          <br />
          <div class="placeholder" align="center">
            {{ techDescription }}
            <div class="editing" v-show="editing">
              <br />
              <h3 v-show="questionIndex == 0">{{ techName }} Description</h3>
              <input
                class="text-input"
                ref="q1"
                v-show="questionIndex == 0"
                v-model="newDescription"
                :label="`${techName} Description`"
                persistent-hint
                :hint="`[Question 1 of 3] Press enter when finished`"
                v-on:keyup="saveAndProgress"
              />
              <h3 v-show="questionIndex == 1">{{ techName }} Use Case</h3>
              <input
                class="text-input"
                ref="q2"
                v-show="questionIndex == 1"
                v-model="useCase"
                :label="`${techName} Use Case`"
                persistent-hint
                hint="[Question 2 of 3] Press enter when finished"
                v-on:keyup="saveAndProgress"
              />
              <h3 v-show="questionIndex == 2">
                When would you recommend {{ techName }} to a friend or coworker?
              </h3>
              <input
                class="text-input"
                ref="q3"
                v-show="questionIndex == 2"
                v-model="recommendation"
                :label="`When would you recommend ${techName} to a friend or coworker?`"
                persistent-hint
                hint="[Question 3 of 3] Press enter when finished"
                v-on:keyup="saveAndProgress"
              />
              {{ showingInputs ? "Press Enter to Submit" : "" }}
              <br />
              <div class="response" v-show="questionIndex == 3" align="left">
                <strong>Description: </strong><br />
                {{ descriptionUpdate.review.newDescription }}<br /><br />
                <strong>Use Case: </strong> {{ descriptionUpdate.review.useCase
                }}<br /><br />
                <strong>Recommendation: </strong><br />
                {{ descriptionUpdate.review.recommendation }}
              </div>
            </div>
            <br />

            <div class="addDescriptionButton">
              <v-btn :class="editing ? 'accentRed' : 'primary'" @click="edit"
                ><v-icon left>{{ editing ? "mdi-close" : "mdi-plus" }}</v-icon
                >{{
                  editing
                    ? "Cancel"
                    : `Add Description or
                Experience`
                }}</v-btn
              >
              <v-btn
                @click="submitReview"
                v-show="questionIndex == 3"
                class="secondary accentBlue black--text"
                ><v-icon left>mdi-check</v-icon>Submit</v-btn
              >
            </div>
            <div v-if="reviews.length" class="reviews">
              <h3>Reviews</h3>
              <div v-for="(review, i) in reviews" :key="review[i]">
                <div class="user-review">
                  <span class="user-heading">
                    <h5 align="left">{{ review.user.username }}</h5>
                    <h5 align="right" style="font-weight: 500">
                      {{ review.date | date }}
                    </h5>
                  </span>
                  <div class="user-info">
                    <img
                      :src="review.user.avatar"
                      width="50px"
                      style="border-radius: 50%; margin: 15px 20px 10px 0"
                    />
                    <br />
                  </div>
                  <div class="review">
                    <br />
                    {{ review.newDescription }}<br /><br />
                    <strong>Recommendation: </strong>{{ review.recommendation
                    }}<br /><br />
                    <strong>Use Case: </strong>{{ review.useCase }}<br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-container>

    <br />
  </div>
</template>

<script>
export default {
  name: "Technology",
  props: ["technology"],
  data() {
    return {
      editing: false,
      questionIndex: 0,
      newDescription: "",
      useCase: "",
      recommendation: "",
    };
  },
  methods: {
    submitReview() {
      this.$store.dispatch("addTechnologyReview", {
        ...this.descriptionUpdate,
      });
      window.scrollTo(0, 0);
      this.editing = false;
      this.questionIndex = 0;
      this.newDescripton = "";
      this.useCase = "";
      this.recommendation = "";
    },
    saveAndProgress: function (e) {
      if (e.keyCode === 13 && this.moveOn) {
        if (this.questionIndex < 3) {
          this.questionIndex++;
        } else if (this.questionIndex == 2) {
          this.nextPrompt();
        }
      }
      if (this.questionIndex == 1) {
        setTimeout(() => {
          this.$refs.q2.focus();
        }, 100);
      } else if (this.questionIndex == 2) {
        setTimeout(() => {
          this.$refs.q3.focus();
        }, 100);
      }
    },
    edit() {
      if (this.editing) {
        this.questionIndex = 0;
        this.newDescription = "";
        this.useCase = "";
        this.recommendation = "";
      }
      this.editing = !this.editing;
      if (this.questionIndex == 0) {
        setTimeout(() => {
          this.$refs.q1.focus();
        }, 100);
      }
    },
  },
  computed: {
    showingInputs() {
      return this.questionIndex >= 0 && this.questionIndex < 3 && this.editing;
    },
    reviews() {
      return this.selectedTechnology.reviews;
    },
    selectedTechnology() {
      return this.$store.getters.loadedTechnology(
        this.$route.params.technology
      );
    },
    user() {
      return this.$store.getters.user;
    },
    descriptionUpdate() {
      return {
        newTechnology: false,
        name: this.techName,
        dateUpdated: this.dateUpdated,
        techInfo: this.selectedTechnology,
        categories: this.techCategories,
        user: {
          userId: this.user.documentId,
          username: this.user.username,
          avatar: this.user.avatar_url,
        },
        review: {
          newDescription: this.newDescription,
          useCase: this.useCase,
          recommendation: this.recommendation,
        },
      };
    },
    moveOn() {
      if (!this.editing) {
        return false;
      } else if (this.questionIndex == 0 && this.newDescription.length > 1) {
        return true;
      } else if (this.questionIndex == 1 && this.useCase.length > 1) {
        return true;
      } else if (this.questionIndex == 2 && this.recommendation.length > 1) {
        return true;
      } else {
        return false;
      }
    },
    technologies() {
      return this.$store.getters.allTechnologies.filter((tech) => {
        return tech.technology;
      });
    },
    techId() {
      return this.selectedTechnology.documentId;
    },
    techName() {
      return this.selectedTechnology.technology;
    },
    techCategories() {
      return this.selectedTechnology.categories;
    },
    techDescription() {
      return this.selectedTechnology.description;
    },
    dateUpdated() {
      let d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.text-input {
  width: 100%;
  color: white;
  border: solid white 1px;
  padding: 10px;
}

.reviews {
  padding: 25px;
}
.user-heading {
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.user-review {
  border: 1px white solid;
  padding: 25px;
  margin: 25px;
  border-radius: 1.1rem;
}
.review {
  text-align: left;
}
.user-info {
  display: flex;
}
.addDescriptionButton {
  padding-top: 30px;
  display: flex;
  justify-content: space-around;
}
.top-spacing {
  margin-top: 40px;
  padding: 0 5%;
}
.avatar {
  border-radius: 50%;
}
.card {
  padding: 5% 10%;
}
</style>