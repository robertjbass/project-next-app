<template>
  <v-row justify="center" class="followProject">
    <!-- {{ userIsFollowing }} -->
    <v-dialog v-model="followProject" persistent max-width="400px">
      <template v-slot:activator="{ on, attrs }">
        <div v-if="userIsFollowing">
          <v-btn
            small
            elevation="0"
            color="red darken-4"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>mdi-playlist-minus</v-icon>Unfollow
          </v-btn>
        </div>
        <div v-else>
          <v-btn
            small
            elevation="0"
            color="green darken-4"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>mdi-playlist-plus</v-icon>Follow
          </v-btn>
        </div>
      </template>
      <v-card dark>
        <v-card-title class="headline"
          >{{ userIsFollowing ? "Unfollow" : "Follow?" }}
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
          <v-btn color="red darken-1" text @click="followProject = false">
            No
          </v-btn>
          <v-btn color="green darken-1" text @click="followProject = false">
            Yes
          </v-btn>
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
      followProject: false,
    };
  },
  // todo - finish this
  // todo - https://www.youtube.com/watch?v=d4nUU8vCT8U&list=PL55RiY5tL51qxUbODJG9cgrsVd7ZHbPrt&index=22
  methods: {
    onAgree() {
      console.log("agree");
    },
  },
  computed: {
    userIsFollowing() {
      // projects are followed projects. The project owners are documented on the project object, not the user project
      return (
        this.$store.getters.user.projects.findIndex((projectId) => {
          return projectId === this.project.id;
        }) >= 0
      );
    },
  },
};
</script>

<style scoped>
</style>