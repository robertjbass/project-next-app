<template>
  <div class="profile">
    <div>🔑Logged in as {{ this.user.data.email }}</div>
    <div class="bio">
      <div class="bio-pic">
        <img class="headshot" :src="this.profile.profile.ProfilePicURL" />
      </div>
      <div class="bio-summary">
        <h4>{{ this.profile.profile.ProfileSummary }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  // props: {
  //   profile: {
  //     type: Object,
  //   },
  // },
  // data() {
  //   return {
  //     key: "value",
  //   };
  // },
  computed: {
    ...mapGetters(["user", "profile"]),
    // signedInUser() {
    //   return this.profile;
    // },
    // userProfile() {
    //   return this.profile;
    // },
  },
};
</script>

<style scoped>
.bio {
  margin: auto;
  display: flex;
  padding: 20px 10%;
}
.bio-summary {
  padding: 0 20px;
  /* margin: auto; */
}
.headshot {
  width: 150px;
}
</style>