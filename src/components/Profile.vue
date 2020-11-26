<template>
  <div class="profile">
    <div>🔑Logged in as {{ this.user.data.email }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      key: "value",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
</style>