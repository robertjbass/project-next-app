<template>
  <div class="home">
    <div class="profile" v-if="this.user.loggedIn">
      <Profile />
    </div>
  </div>
</template>

<script>
import Profile from "@/components/Profile.vue";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["user", "profile"]),
  },
  components: {
    Profile,
  },
};
</script>

<style scoped>
/*  */
</style>