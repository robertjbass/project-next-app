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
                <h3>In short, it is a place to...</h3>
                <br />
                <!-- <ul align="left"> -->
                <div align="left">
                  <h4 class="ulli">⚡ accelerate your growth as a developer</h4>
                  <h4 class="ulli">🧠 find your next brilliant app idea</h4>
                  <h4 class="ulli">👩‍💻 learn new technologies</h4>
                  <h4 class="ulli">
                    🤝 network with future friends, teammates, employers
                  </h4>
                  <h4 class="ulli">
                    💻 nerd out over your favorite tech stack
                  </h4>
                  <h4 class="ulli">
                    🕕 hold yourself accountable to learn (regardless of skill
                    level)
                  </h4>
                </div>
                <!-- </ul> -->
                <br />
                <p class="description">
                  Project NextApp is a hub for software developers to 'find
                  their spark' by building projects with a twist. The best way
                  to learn new tech, or to find your next business idea is to
                  build what you're interested in. We don't dictate the theme,
                  we won't shame you for failing. Every week, you scrap your
                  idea and start a new one... unless you've found your magic
                  idea and want to build on that.
                  <br /><br />You can use Project NextApp to add structure to
                  your existing ideas, explore a new technology, host an active
                  project, or get feedback on your ideas. Opt into weekly
                  meetings to review projects and meat the other developers. We
                  provide a proven framework for developer growth.
                </p>
              </div>
            </v-card>
          </v-col>
          <v-col cols="10" lg="4" offset="1" offset-lg="0">
            <v-card dark class="right-card card">
              <h3>{{ todayIsMonday ? "🎉Presenting Today🎉" : "" }}</h3>
              <br v-if="todayIsMonday" />
              Next Presentation Date:
              <h3>Monday {{ mondayNextWeek | date }}</h3>
            </v-card>
            <v-card dark class="card-bottom card"
              ><h3>How does it work?</h3>
              <br />
              <ol>
                <li class="ulli">
                  <router-link class="link light-blue--text" to="./project/new"
                    >Start a Project</router-link
                  >
                  - Even a vague idea is fine - no pressure, just a starting
                  point 🏁
                </li>
                <li class="ulli">
                  Describe the project, technologies, goals, and project
                  duration using the template 📃
                </li>
                <li class="ulli">
                  Work on the project at your own pace - we'll remind you to
                  check in if you'd like 👩‍💻👨‍💻
                </li>
                <li class="ulli">
                  On the final day of your project cycle, join us for a zoom
                  call to share what you worked on, learned, and what comes next
                  - we meet every Monday 📅
                </li>
                <li class="ulli">
                  Get feedback from the community, ask for help, meet new
                  friends, share your thoughts meet 💭
                </li>
                <li class="ulli">
                  Ditch the project on the end date and start something new 💡
                </li>
                <li class="ulli">
                  If you find your spark (a project that captures your long-term
                  interest) we'll help you nurture it to realize your dream app
                  🦄
                </li>
                <li class="ulli">Rinse and repeat 🔁 Grow 🌱</li>
              </ol>
            </v-card>
          </v-col>
        </v-row>
      </v-layout>
      <v-row>
        <v-col cols="10" lg="10" offset="1" offset-lg="1">
          <v-card dark class="faq card">
            <h3>FAQs</h3>
            <h4 class="q-and-a q"><strong>Q:</strong> Is it free?</h4>
            <h4 class="q-and-a a"><strong>A:</strong> Yes!</h4>

            <h4 class="q-and-a q">
              <strong>Q:</strong> This looks brand new. Is it functional?
            </h4>
            <h4 class="q-and-a a">
              <strong>A:</strong> Before January of 2021 this website is
              pre-beta. You're welcome to join but we still have cool features
              to add. If you're reading this, Project Next App is live and we
              will host project reviews even if there is only 1 project to
              review. Everybody matters!
            </h4>

            <h4 class="q-and-a q">
              <strong>Q:</strong> Do I have to present my app or code live?
            </h4>
            <h4 class="q-and-a a">
              <strong>A:</strong> Only if you feel comfortable. It should never
              feel stressful. You're welcome to watch from the sidelines or ask
              for help privately in Slack.
            </h4>
            <h4 class="q-and-a q">
              <strong>Q:</strong> What happens after the project end date?
            </h4>
            <h4 class="q-and-a a">
              <strong>A:</strong> You can always modify the project duration if
              you decide to keep it going. You won't lose access to anything.
              The duration helps us to schedule reviews and presentations. We
              urge you to make use of that date to add structure to your
              project, ultimately, it's a visual guideline. The idea is to start
              a new project regularly until you find an idea worth sticking with
              long term.
            </h4>
            <h4 class="q-and-a q">
              <strong>Q:</strong> Are there themes or guidelines?
            </h4>
            <h4 class="q-and-a a">
              <strong>A:</strong> No, the only requirement is that it interests
              you. We may have themed hackathons with prizes. Companies have
              expressed interest in sponsoring contest prizes however, this will
              be an opt-in feature.
            </h4>
            <h4 class="q-and-a q">
              <strong>Q:</strong> What if I'm a beginner?
            </h4>
            <h4 class="q-and-a a">
              <strong>A:</strong> Well then welcome! We're glad you're here. If
              fact, we'll be providing resources and workshops to help you
              learn. We hope that this format will accelerate the learning
              process for you.
            </h4>
            <h4 class="q-and-a q">
              <strong>Q:</strong> I have more questions...
            </h4>
            <h4 class="q-and-a a">
              <strong>A:</strong> When you sign up, you'll get an invite to the
              Slack group via email. Feel free to reach out there anytime!
            </h4>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Alert from "@/components/Shared/Alert.vue";

export default {
  name: "InfoBanner",
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
strong {
  font-weight: 600;
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
  margin-top: 10px;
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