<template>
  <div class="editButtons">
    Project matches logged in user:
    <code>{{ this.thisUser }}</code> <br /><br />
    <!-- {{ this.project.creatorId }} -->
    <div class="buttons">
      <v-btn class="btn" @click="edit('reportUpdate')">Report Update</v-btn>
      <v-btn class="btn" @click="edit('edit')"><slot></slot></v-btn>
      <!-- <v-btn class="btn" @click="edit('edit')">Edit</v-btn> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["project", "user", "thisUser"],
  name: "EditButtons",
  // computed: {
  //   projectBelongsToLoggedInUser() {
  //     return this.project.creatorId == this.user.id;
  //   },
  // },
  methods: {
    edit(editType) {
      this.$emit(editType);
    },
  },
};
</script>

<style scoped>
.buttons {
  width: 100%;
  display: flex;
  margin: auto;
  justify-content: space-evenly;
}
.btn {
  width: 200px;
}
</style>