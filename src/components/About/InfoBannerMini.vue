<template>
  <div class="infoBanner">
    <v-container>
      <div v-if="todayIsMonday" class="presentationAlert">
        <Alert text="App presentation today!" />
      </div>
      <v-layout>
        <v-row>
          <!-- <h3 align="center">
            {{ todayIsMonday ? "🎉Presenting Today🎉" : "" }}
          </h3> -->
          <v-col cols="10" lg="6" offset="1">
            <v-card dark class="card-left card">
              <h3>What is Project NextApp?</h3>
              <div class="pna-description">
                <h4>Project NextApp is a platform for your 'side projects'</h4>
                <br />
                <!-- mdi-nodejs -->
                <!-- <ul align="left"> -->
                <div align="left">
                  <div class="item">
                    <h2 class="ulli">
                      <v-icon color="accentRed">mdi-certificate</v-icon>
                      <v-icon color="accentBlue">mdi-school-outline</v-icon>
                      Learn
                    </h2>
                    <h3>Developers learn by <u>doing</u></h3>
                    <br />
                    Beginner, Expert, or somewhere in between? It doesn't
                    matter, the principles are the same. Our framework is
                    designed to help you learn new technologies.
                  </div>

                  <div class="item">
                    <h2 class="ulli">
                      <v-icon color="accentRed">mdi-thumbs-up-down</v-icon>
                      <v-icon color="accentBlue"
                        >mdi-head-question-outline</v-icon
                      >
                      Validate
                    </h2>
                    <h3>You have ideas</h3>
                    <br />
                    Challenge yourself to create it, then test the market
                    viability.
                  </div>

                  <div class="item">
                    <h2 class="ulli">
                      <v-icon color="accentRed"
                        >mdi-account-group-outline</v-icon
                      >
                      <v-icon color="accentBlue"
                        >mdi-lightbulb-group-outline</v-icon
                      >
                      Network
                    </h2>
                    <h3>Us developers learn a lot from our peers</h3>
                    <br />
                    Get help, recommendations, and feedback from other
                    developers.
                  </div>

                  <div class="item">
                    <h2 class="ulli">
                      <v-icon color="accentRed"
                        >mdi-battery-heart-variant</v-icon
                      >
                      <v-icon color="accentBlue"
                        >mdi-head-snowflake-outline</v-icon
                      >
                      Motivate
                    </h2>
                    <h3>Visualize your progress</h3>
                    <br />
                    The satisfaction you get when you see the metrics of your
                    progress keep you going. Track your progress without lengthy
                    scheduled reporting. Aggregate your projects for future
                    employers, teammates, or friends.
                  </div>
                </div>
                <!-- </ul> -->
                <br />
                <p class="description">
                  Project NextApp is a friendly hub for software developers to
                  try new things<br /><br />
                </p>
                <router-link to="/about" class="light-blue--text toAbout"
                  >Click Here to learn how it works and read our
                  FAQs</router-link
                >
              </div>
            </v-card>
          </v-col>
          <v-col cols="10" lg="4" offset="1" offset-lg="0">
            <v-card dark class="right-card card">
              <h3>{{ todayIsMonday ? "🎉Presenting Today🎉" : "" }}</h3>
              <br v-if="todayIsMonday" />
              Every week we meet to discuss our projects. Everyone is
              welcome.<br /><br />
              The next scheduled meeting is:
              <h3>📅 Monday {{ mondayNextWeek | date }}</h3>
              <br />
              <router-link class="link light-blue--text" to="./project/new"
                >Start a Project</router-link
              >
            </v-card>
            <!--  -->
            <v-card dark class="right-card card">
              <h3>Technology Library</h3>
              Check out the
              <router-link class="link light-blue--text" to="../technologies"
                >Technology Library</router-link
              >
              to share your knowledge with the community. You can link your
              tutorials and share your insight to help others<br /><br />
              <h4>Recent additions:</h4>
              <div class="recentAdditions" align="left">
                <h4>NodeJS</h4>
                <h4>JavaScript</h4>
                <h4>Firestore</h4>
                <h4>Vue.js</h4>
                <h4>MySQL</h4>
                <h4>TypeScript</h4>
              </div>
            </v-card>
            <!--  -->
            <v-card dark class="right-card card">
              <h3>Learn Software Development</h3>
              <br />
              <h4>Recent additions:</h4>
              <div class="recentAdditions" align="left">
                <ul>
                  <li class="lesson">NodeJS - From Zero to Hero</li>
                  <li class="lesson">
                    Which JavaScript framework is right for me?
                  </li>
                  <li class="lesson">
                    Which programming language should I learn?
                  </li>
                  <li class="lesson">My first web app (Featuring Vue.js)</li>
                  <li class="lesson">A beginners guide to databases</li>
                  <li class="lesson">
                    Setting up your development environment
                  </li>
                </ul>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Alert from "@/components/Shared/Alert.vue";

export default {
  name: "InfoBannerMini",
  methods: {
    name() {
      //
    },
  },
  computed: {
    todayIsMonday() {
      return new Date().getDay() == 1;
    },
    mondayThisWeek() {
      let d = new Date();
      return d.setDate(d.getDate() + ((7 - d.getDay()) % 7) + 1);
    },
    mondayNextWeek() {
      let d = new Date();
      return d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7));
    },
  },
  components: {
    Alert,
  },
};
</script>

<style scoped>
ol {
  font-weight: 600;
}
h3 {
  text-align: center;
}
ul {
  padding: 0;
}
li {
  list-style: none;
  margin-top: 20px;
}
strong {
  font-weight: 600;
}

.right-card {
  margin-bottom: 20px;
}

.toAbout {
  text-decoration: none;
}
.q-and-a {
  text-align: left;
  padding-top: 20px;
  font-weight: 300;
}
.q {
  padding-top: 10px;
}
.a {
  border-bottom: white 1px dashed;
  padding-bottom: 10px;
}

.link {
  text-decoration: none;
  font-weight: 600;
}

.ulli {
  margin-top: 25px;
}

.card {
  padding: 5%;
  background-color: #333;
}
.presentationAlert {
  width: 90%;
  margin: auto;
}
.infoBanner {
  padding: 40px 0;
  margin: auto;
}
.pna-description {
  text-align: center;
  padding: 2.5%;
}

.description {
  padding: 2.5%;
  text-align: left;
}

.card-left {
  text-align: left;
}

.card-bottom {
  margin-top: 20px;
  text-align: left;
}
</style>