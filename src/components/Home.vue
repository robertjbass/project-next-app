<template>
  <div class="home">
    <v-card dark class="login-card">
      <Login />
    </v-card>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
export default {
  name: "Home",
  data() {
    return {
      key: "value",
    };
  },
  components: {
    Login,
  },
};
</script>

<style scoped>
.login-card {
  padding: 20px 0;
}
</style>