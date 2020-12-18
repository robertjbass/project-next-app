<template>
  <div class="reportUpdate">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Report an Update
          </v-btn>
        </template>
        <v-card dark>
          <v-card-title>
            <span class="headline">Update Report: {{ todayDate | date }}</span>
          </v-card-title>
          <v-card-title>
            <span class="headline">{{ project.title }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="*Describe the update"
                    required
                    v-model="update.note"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-checkbox
                    flat
                    color="light-green"
                    :label="update.goal ? 'Goal Completed' : ''"
                    v-model="update.goal"
                    hint="Check this box if you have acheived one of your goals with this update"
                    :persistent-hint="true"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="close"> Close </v-btn>
            <v-btn
              v-show="this.update.note"
              color="green darken-1"
              text
              @click="submit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ReportUpdate",
  props: ["user", "project"],
  data: () => ({
    dialog: false,
    update: {
      date: null,
      goal: false,
      note: null,
    },
  }),
  methods: {
    close() {
      this.dialog = false;
    },
    submit() {
      console.log("submit");
      this.update.date = new Date().toLocaleString(["en-US"], {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      this.reportNewUpdate;
      this.dialog = false;
      console.log("reportNewUpdate");
      this.$store.dispatch("logProjectUpdate", {
        update: this.update,
        project: this.project,
        user: this.user,
      });
    },
    reportNewUpdate() {},
  },
  computed: {
    formattedDate() {
      // const date = new Date(this.todayDate);
      let date = new Date(this.todayDate).toLocaleString(["en-US"], {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      return date;
    },
    todayDate() {
      return new Date();
    },
  },
};
</script>

<style scoped>
</style>