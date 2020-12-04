<template>
  <div class="alert">
    <v-alert
      color="warning white--text"
      dismissible
      @input="onClose"
      :value="true"
      >{{ text }}</v-alert
    >
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>

<style scoped>
.alert {
  font-weight: 600;
}
</style>