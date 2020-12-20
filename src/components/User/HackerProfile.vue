<template>
  <div class="hackerProfile">
    <v-container class="top-spacing">
      <v-card dark class="card">
        <h1>Profile</h1>
        <!-- this user: {{ profileBelongsToLoggedInUser }}<br />
        editing {{ editing }}<br /> -->
        <!-- <pre align="left">{{ profileUpdate }}</pre> -->
        <!-- <pre align="left">{{ allUpdateData }}</pre> -->

        <!-- {{ this.id }} -->
        <!-- <pre align="left">{{ this.userData }}</pre> -->
        <!-- <br /> -->

        <div
          v-if="editing && profileBelongsToLoggedInUser"
          class="edit"
          align="left"
        >
          <img class="avatar" width="15%" :src="userData.photoURL" /><br />
          <v-text-field
            label="Name"
            :placeholder="userData.name"
            v-model="profileUpdate.name"
          />
          <v-text-field
            label="Company"
            :placeholder="userData.company"
            v-model="profileUpdate.company"
          />
          <v-text-field
            label="Username"
            :placeholder="userData.username"
            v-model="profileUpdate.username"
          />
          <v-text-field
            label="Email"
            :placeholder="userData.userEmail"
            v-model="profileUpdate.userEmail"
          />
          <v-text-field
            label="Location"
            :placeholder="userData.location"
            v-model="profileUpdate.location"
          />
          <v-text-field
            label="Bio"
            :placeholder="userData.bio"
            v-model="profileUpdate.bio"
          />

          <!-- // todo - double check to see if bank is loading with existing languages -->
          <!-- :bank="userData.stack.languages" -->
          <!-- <h2>My Programming Languages</h2> -->
          <techSelect
            :arrayItems="technologies"
            :usedFor="'Languages'"
            :placeholder="'Programming Languages'"
            @arrayValue="updateLanguages"
          />
          <!-- <h2>My Frameworks and Libraries</h2> -->
          <techSelect
            :arrayItems="technologies"
            :usedFor="'Frameworks'"
            :placeholder="'My Frameworks & Libraries'"
            @arrayValue="updateFrameworks"
          />
          <!-- <h2>My Databases</h2> -->
          <techSelect
            :arrayItems="technologies"
            :usedFor="'Databases'"
            :placeholder="'My Databases'"
            @arrayValue="updateDatabases"
          />
          <!-- <h2>My Other</h2> -->
          <techSelect
            :arrayItems="technologies"
            :usedFor="'Other'"
            :placeholder="'My Other Technologies'"
            @arrayValue="updateOther"
          />
          <!-- <h2>My Platforms</h2> -->
          <techSelect
            :arrayItems="technologies"
            :usedFor="'Platforms'"
            :placeholder="'My Platforms'"
            @arrayValue="updateHosting"
          />
          <!-- <h2>Technologies to Learn</h2> -->
          <techSelect
            :arrayItems="technologies"
            :usedFor="'Goals'"
            :placeholder="'My Tech to Learn'"
            @arrayValue="updateTechToLearn"
          />
        </div>
        <!--  -->
        <div v-else class="main" align="left">
          <img class="avatar" width="15%" :src="userData.photoURL" /><br />
          <strong>Name: </strong>{{ userData.name }}<br />
          <div :show="userData.company">
            <strong>Company: </strong>{{ userData.company }}
          </div>
          <strong>Username: </strong>{{ userData.username }}<br />
          <strong>Email: </strong>{{ userData.userEmail }}<br />
          <strong>Location: </strong>{{ userData.location }}<br /><br />
          <strong>Bio: </strong>{{ userData.bio }}<br />
          <br />
          <strong>Twitter Handle: </strong>{{ userData.twitter_username }}<br />
          <strong>Public Repos: </strong>{{ userData.public_repos }}<br />
          <strong>GitHub Followers: </strong>{{ userData.followers
          }}<br /><br />
        </div>
        <!--  -->
        <div class="technologies" align="left" v-if="!editing">
          <h3>Databases</h3>
          <div v-for="(item, i) in userData.stack.databases" :key="item[i]">
            <router-link
              :to="'../technology/' + removeSpecialChars(item)"
              class="light-blue--text"
              >{{ item }}</router-link
            >
          </div>
          <br />
          <br />
          <h3>Frameworks/Libraries</h3>
          <div
            v-for="(item, i) in userData.stack.frameworksAndLibraries"
            :key="item[i]"
          >
            <router-link
              :to="'../technology/' + removeSpecialChars(item)"
              class="light-blue--text"
              >{{ item }}</router-link
            >
          </div>
          <br />
          <br />
          <h3>Platforms</h3>
          <div
            v-for="(item, i) in userData.stack.hostingPlatforms"
            :key="item[i]"
          >
            <router-link
              :to="'../technology/' + removeSpecialChars(item)"
              class="light-blue--text"
              >{{ item }}</router-link
            >
          </div>
          <br />
          <br />
          <h3>Languages</h3>
          <div v-for="(item, i) in userData.stack.languages" :key="item[i]">
            <router-link
              :to="'../technology/' + removeSpecialChars(item)"
              class="light-blue--text"
              >{{ item }}</router-link
            >
          </div>
          <br />
          <br />
          <h3>Other</h3>
          <div v-for="(item, i) in userData.stack.other" :key="item[i]">
            <router-link
              :to="'../technology/' + removeSpecialChars(item)"
              class="light-blue--text"
              >{{ item }}</router-link
            >
          </div>
          <br />
          <br />
          <h3>Tech to Learn</h3>
          <div
            v-for="(item, i) in userData.stack.technologiesToLearn"
            :key="item[i]"
          >
            <router-link
              :to="'../technology/' + removeSpecialChars(item)"
              class="light-blue--text"
              >{{ item }}</router-link
            >
          </div>
        </div>
        <!--  -->
        <br />
        <br />
        <div class="links" align="left">
          <!-- // todo - Clean Design Up -->
          <div class="editButton" v-if="profileBelongsToLoggedInUser">
            <v-btn
              small
              style="margin-right: 20px"
              :disabled="!profileBelongsToLoggedInUser"
              @click="editing = !editing"
              :color="btnColor"
              :class="editing ? 'black--text' : 'white--text'"
              ><v-icon left>{{ editing ? "mdi-close" : "mdi-pencil" }}</v-icon
              >{{ editing ? "Cancel" : "Edit" }}</v-btn
            >
            <v-btn
              small
              v-show="editing"
              class="accentRed"
              width="200px"
              @click="editProfile"
              ><v-icon left>mdi-content-save-all-outline</v-icon>Confirm
              Edit</v-btn
            >
            <br />
          </div>
          <br /><br />
          <a
            class="light-blue--text"
            :show="userData.blog"
            :href="blogUrl"
            target="_blank"
            >My Blog</a
          >

          <br /><br />
          Projects:
          <div v-if="projectsByUser.length > 0">
            <div v-for="project in projectsByUser" :key="project.id">
              <router-link
                class="light-blue--text"
                :to="`../project/${project.id}`"
                >{{ project.title }}</router-link
              >
            </div>
          </div>
          <div v-else>No projects yet</div>
          <br />
          Followed Projects:
          <div v-for="project in followedProjects" :key="project">
            <div v-for="allProjects in userProjects" :key="allProjects.id">
              <div v-if="project == allProjects.id">
                <router-link
                  :to="'../project/' + project"
                  class="light-blue--text"
                >
                  {{ allProjects.title }} by
                  {{ allProjects.username }}</router-link
                >
              </div>
            </div>
          </div>

          <br />
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HackerProfile",
  props: ["id"],
  data() {
    return {
      hacker: null,
      editing: false,
      profileUpdate: {
        name: "",
        company: "",
        username: "",
        email: "",
        location: "",
        bio: "",
        stack: {
          languages: [],
          frameworksAndLibraries: [],
          databases: [],
          hostingPlatforms: [],
          other: [],
          technologiesToLearn: [],
        },
      },
    };
  },
  methods: {
    editProfile() {
      // todo - add check for changes
      // alert("update");
      this.$store.dispatch("updateUserProfile", {
        userId: this.userData.documentId,
        ...this.allUpdateData,
      });
      this.editing = false;
    },
    updateLanguages(value) {
      console.log(value);
      this.profileUpdate.stack.languages = value;
    },
    updateFrameworks(value) {
      console.log(value);
      this.profileUpdate.stack.frameworksAndLibraries = value;
    },
    updateDatabases(value) {
      console.log(value);
      this.profileUpdate.stack.databases = value;
    },
    updateTechToLearn(value) {
      console.log(value);
      this.profileUpdate.stack.technologiesToLearn = value;
    },
    updateHosting(value) {
      console.log(value);
      this.profileUpdate.stack.hostingPlatforms = value;
    },
    updateOther(value) {
      console.log(value);
      this.profileUpdate.stack.other = value;
    },
    editClicked() {
      this.editing = !this.editing;
    },
    removeSpecialChars(value) {
      return value
        .split(" ")
        .join("")
        .split(".")
        .join("")
        .split("-")
        .join("")
        .toLowerCase();
    },
  },
  computed: {
    technologies() {
      return this.$store.getters.technologies;
    },
    btnColor() {
      return this.editing ? "accentBlue" : "accentRed";
    },
    updateStack() {
      if (!this.profileUpdate.stack) {
        return this.userProfile.stack;
      } else {
        return this.profileUpdate.stack;
      }
    },
    updateName() {
      if (!this.profileUpdate.name) {
        return this.userProfile.name;
      } else {
        return this.profileUpdate.name;
      }
    },
    updateCompany() {
      if (!this.profileUpdate.company) {
        return this.userProfile.company;
      } else {
        return this.profileUpdate.company;
      }
    },
    updateUsername() {
      if (!this.profileUpdate.username) {
        return this.userProfile.username;
      } else {
        return this.profileUpdate.username;
      }
    },
    updateUserEmail() {
      if (!this.profileUpdate.email) {
        return this.userProfile.email;
      } else {
        return this.profileUpdate.email;
      }
    },
    updateLocation() {
      if (!this.profileUpdate.location) {
        return this.userProfile.location;
      } else {
        return this.profileUpdate.location;
      }
    },
    updateBio() {
      if (!this.profileUpdate.bio) {
        return this.userProfile.bio;
      } else {
        return this.profileUpdate.bio;
      }
    },
    allUpdateData() {
      return {
        name: this.updateName,
        company: this.updateCompany,
        username: this.updateUsername,
        email: this.updateUserEmail,
        location: this.updateLocation,
        bio: this.updateBio,
        stack: this.updateStack,
      };
    },

    profileBelongsToLoggedInUser() {
      return this.$store.getters.user.id == this.id;
    },
    blogUrl() {
      return "https://".concat(
        this.userData.blog
          .split("https://www.")
          .join("")
          .split("http://www.")
          .join("")
          .split("https://")
          .join("")
          .split("http://")
          .join("")
          .split("www.")
          .join("")
      );
    },

    followedProjects() {
      return this.loggedInUser.followedProjects;
    },

    loggedInUser() {
      return this.$store.getters.user;
    },

    user() {
      return this.$store.getters.hackers;
    },

    userData() {
      return this.user.filter((hacker) => hacker.id == this.id)[0];
    },

    userProfile() {
      return this.userData;
    },

    userProjects() {
      return this.$store.getters.loadedProjects;
    },

    projectsByUser() {
      return this.userProjects.filter(
        (userProject) => userProject.creatorId == this.userData.id
      );
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
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
.editButton {
  margin: auto;
  justify-content: space-around;
  text-align: end;
}
</style>