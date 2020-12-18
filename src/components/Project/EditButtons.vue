<template>
  <div class="editButtons">
    <!-- <h5>This project belongs to you</h5> -->
    <!-- <code>{{ this.thisUser }}</code> <br /><br /> -->
    <!-- {{ this.project.creatorId }} -->
    <div class="buttons">
      <ReportUpdate :user="user" :project="project" />
      <!-- <v-btn @click="sampleUpdate">add update (test)</v-btn> -->
      <!-- <v-btn class="btn" @click="edit('reportUpdate')">Document Update</v-btn> -->
      <v-btn class="btn" @click="edit('edit')"><slot></slot></v-btn>
      <!-- <v-btn class="btn" @click="edit('edit')">Edit</v-btn> -->
    </div>
  </div>
</template>

<script>
import ReportUpdate from "@/components/Project/ReportUpdate.vue";
export default {
  props: ["project", "user", "thisUser"],
  name: "EditButtons",
  // data() {
  //   return {
  //     update: {
  //       date: new Date(),
  //       goal: false,
  //       note: "just a sample",
  //     },
  //   };
  // },
  // computed: {
  //   projectBelongsToLoggedInUser() {
  //     return this.project.creatorId == this.user.id;
  //   },
  // },
  methods: {
    // sampleUpdate() {
    //   this.$store.dispatch("logProjectUpdate", {
    //     update: this.update,
    //     project: this.project,
    //     user: this.user,
    //   });
    // },
    edit(editType) {
      this.$emit(editType);
    },
  },
  components: {
    ReportUpdate,
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