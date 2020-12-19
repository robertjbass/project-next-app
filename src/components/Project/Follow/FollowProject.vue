<template>
  <v-row justify="center" class="followProject">
    <!-- {{ userIsFollowing }} -->
    <v-dialog v-model="followProjectDialog" persistent max-width="400px">
      <template v-slot:activator="{ on, attrs }">
        <!-- {{ userIsFollowing }} -->
        <div v-if="userIsFollowing">
          <v-btn
            small
            elevation="0"
            color="accentRed"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>mdi-minus</v-icon>Unfollow
          </v-btn>
        </div>
        <div v-else>
          <v-btn
            small
            elevation="0"
            light
            color="accentBlue"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>mdi-plus</v-icon>Follow
          </v-btn>
        </div>
      </template>
      <v-card dark>
        <v-card-title class="headline"
          >{{ userIsFollowing ? "Unfollow?" : "Follow?" }}
        </v-card-title>
        <v-card-text
          >Do you want to {{ userIsFollowing ? "unfollow" : "follow" }} "{{
            project.title
          }}" by {{ project.username }}? This will
          {{ userIsFollowing ? "remove" : "add" }} this project
          {{ userIsFollowing ? "from" : "to" }} your watchlist</v-card-text
        >You can change this at any time
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accentRed" text @click="followProjectDialog = false">
            No
          </v-btn>
          <v-btn color="accentBlue" text @click="followProject"> Yes </v-btn>
          <!-- <v-btn v-else color="green darken-1" text @click="unfollowProject">
            Yes
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
export default {
  name: "FollowProject",
  props: ["project"],
  data() {
    return {
      followProjectDialog: false,
    };
  },
  // todo - finish this
  // todo - https://www.youtube.com/watch?v=d4nUU8vCT8U&list=PL55RiY5tL51qxUbODJG9cgrsVd7ZHbPrt&index=22
  methods: {
    followProject() {
      if (!this.userIsFollowing) {
        this.$store.dispatch("followProject", this.project.id);
      } else {
        this.$store.dispatch("unfollowProject", {
          loggedInUserId: this.user.documentId,
          unfollowProjectId: this.project.id,
        });
      }
      this.followProjectDialog = false;
    },
    onAgree() {
      console.log("agree");
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userIsFollowing() {
      return this.user.followedProjects.includes(this.project.id);
    },
  },
};
</script>

<style scoped>
</style>